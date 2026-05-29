import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const FIXTURE_ROOT = join(ROOT, 'fixtures', 'orion', 'facility-risk');

const requiredFiles = [
  'source-records/fire-weather-alert.source.json',
  'source-records/facility-asset.source.json',
  'source-records/cve-exposure.source.json',
  'source-records/field-report.source.json',
  'observation-events/fire-weather-alert.event.json',
  'observation-events/facility-asset.event.json',
  'observation-events/cve-exposure.event.json',
  'observation-events/field-report.event.json',
  'observation-events/fused-facility-risk.event.json',
  'policy-envelopes/facility-risk-demo.policy.json',
  'fusion-links/facility-risk-demo.fusion.json',
  'decision-cards/facility-risk-demo.card.json',
  'receipts/facility-risk-demo.receipt.json'
];

function fail(message) {
  throw new Error(message);
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    fail(`${relative(ROOT, path)} is not valid JSON: ${error.message}`);
  }
}

function walkJsonFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...walkJsonFiles(full));
    if (stat.isFile() && full.endsWith('.json')) out.push(full);
  }
  return out;
}

function requireString(obj, key, path) {
  if (typeof obj[key] !== 'string' || obj[key].length === 0) {
    fail(`${path} must include non-empty string field ${key}`);
  }
}

function requireArray(obj, key, path, min = 1) {
  if (!Array.isArray(obj[key]) || obj[key].length < min) {
    fail(`${path} must include array field ${key} with at least ${min} item(s)`);
  }
}

for (const file of requiredFiles) {
  const full = join(FIXTURE_ROOT, file);
  statSync(full);
}

const allFixtureFiles = walkJsonFiles(FIXTURE_ROOT);
const sourceRecords = new Map();
const events = new Map();
const policies = new Map();
const cards = new Map();
const fusions = new Map();
const receipts = new Map();

for (const file of allFixtureFiles) {
  const rel = relative(ROOT, file);
  const json = readJson(file);
  requireString(json, 'schemaVersion', rel);

  if (rel.includes('/source-records/')) {
    requireString(json, 'sourceRecordId', rel);
    requireString(json, 'evidenceGrade', rel);
    requireString(json, 'riskClass', rel);
    sourceRecords.set(json.sourceRecordId, { file: rel, json });
  } else if (rel.includes('/observation-events/')) {
    requireString(json, 'eventId', rel);
    requireString(json, 'eventType', rel);
    requireArray(json, 'sourceRecordRefs', rel, 1);
    requireString(json, 'policyState', rel);
    events.set(json.eventId, { file: rel, json });
  } else if (rel.includes('/policy-envelopes/')) {
    requireString(json, 'policyEnvelopeId', rel);
    requireString(json, 'policyState', rel);
    if (!json.permissions || typeof json.permissions !== 'object') {
      fail(`${rel} must include permissions object`);
    }
    policies.set(json.policyEnvelopeId, { file: rel, json });
  } else if (rel.includes('/fusion-links/')) {
    requireString(json, 'fusionLinkId', rel);
    requireString(json, 'fusedEventRef', rel);
    requireArray(json, 'inputEventRefs', rel, 2);
    requireArray(json, 'sourceRecordRefs', rel, 1);
    fusions.set(json.fusionLinkId, { file: rel, json });
  } else if (rel.includes('/decision-cards/')) {
    requireString(json, 'decisionCardId', rel);
    requireString(json, 'eventRef', rel);
    requireString(json, 'policyEnvelopeRef', rel);
    requireArray(json, 'sourceRecordRefs', rel, 1);
    cards.set(json.decisionCardId, { file: rel, json });
  } else if (rel.includes('/receipts/')) {
    requireString(json, 'receiptId', rel);
    requireString(json, 'eventRef', rel);
    requireString(json, 'policyEnvelopeRef', rel);
    requireString(json, 'decisionCardRef', rel);
    requireArray(json, 'sourceRecordRefs', rel, 1);
    receipts.set(json.receiptId, { file: rel, json });
  }
}

function assertSourceRefs(refs, rel) {
  for (const ref of refs) {
    if (!sourceRecords.has(ref)) fail(`${rel} references missing source record ${ref}`);
  }
}

function assertEventRef(ref, rel) {
  if (!events.has(ref)) fail(`${rel} references missing event ${ref}`);
}

function assertPolicyRef(ref, rel) {
  if (!policies.has(ref)) fail(`${rel} references missing policy envelope ${ref}`);
}

function assertCardRef(ref, rel) {
  if (!cards.has(ref)) fail(`${rel} references missing decision card ${ref}`);
}

for (const { file, json } of events.values()) {
  assertSourceRefs(json.sourceRecordRefs, file);
  if (json.relatedEventRefs) {
    for (const ref of json.relatedEventRefs) assertEventRef(ref, file);
  }
  if (json.policyEnvelopeRef) assertPolicyRef(json.policyEnvelopeRef, file);
  if (json.decisionCardRef) assertCardRef(json.decisionCardRef, file);
}

for (const { file, json } of fusions.values()) {
  assertEventRef(json.fusedEventRef, file);
  for (const ref of json.inputEventRefs) assertEventRef(ref, file);
  assertSourceRefs(json.sourceRecordRefs, file);
}

for (const { file, json } of cards.values()) {
  assertEventRef(json.eventRef, file);
  assertPolicyRef(json.policyEnvelopeRef, file);
  assertSourceRefs(json.sourceRecordRefs, file);
}

for (const { file, json } of receipts.values()) {
  assertEventRef(json.eventRef, file);
  assertPolicyRef(json.policyEnvelopeRef, file);
  assertCardRef(json.decisionCardRef, file);
  assertSourceRefs(json.sourceRecordRefs, file);
}

const fused = events.get('orion-evt-facility-risk-fused-incident')?.json;
if (!fused) fail('Missing required fused facility-risk incident event');
if (fused.policyState !== 'action_gated') fail('Fused facility-risk incident must remain action_gated');
if (!fused.receiptRef || !receipts.has(fused.receiptRef)) fail('Fused facility-risk incident must point to an existing receipt');

const policy = policies.get('orion-pol-facility-risk-demo')?.json;
if (!policy) fail('Missing required facility-risk policy envelope');
if (policy.permissions.scan !== false || policy.permissions.act !== false) {
  fail('Facility-risk demo policy must keep scan=false and act=false');
}

console.log(`Validated ${allFixtureFiles.length} Orion facility-risk fixture files.`);
console.log(`sourceRecords=${sourceRecords.size} events=${events.size} policies=${policies.size} fusions=${fusions.size} cards=${cards.size} receipts=${receipts.size}`);
