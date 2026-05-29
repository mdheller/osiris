# Orion OSIRIS Excavation Plan

Status: planning artifact
Repo: `mdheller/osiris`
Purpose: use this repository as the owned working carcass for excavating OSIRIS into the Orion/Gaia estate.

## 1. Controlling decision

We are not treating OSIRIS as a finished product and we are not treating it as an external inspiration-only reference. We are treating `mdheller/osiris` as an owned upstream-derived body that can be excavated, reduced, governed, and reanimated as the first Orion operational-map surface.

The working thesis is:

> OSIRIS provides the public OSINT map shell and feed grammar. Gaia/Orion provides the governed world-model, event semantics, provenance, fusion, policy envelope, decision card, and receipt chain.

This repo is therefore the stateful excavation workspace. Work should happen here first until the seam is understood. Once stabilized, extracted artifacts can be promoted into Orion, Gaia, SCOPE-D, Ontogenesis, Prophet Platform, or Sociosphere.

## 2. Observed upstream posture

Based on the current README and package metadata in `mdheller/osiris`:

- OSIRIS identifies itself as “Open Source Intelligence & Reconnaissance Integrated System.”
- It is a real-time global intelligence dashboard aggregating aviation, CCTV, earthquake, conflict, news, weather, space, cyber, crypto, sanctions, and Telegram/public-channel OSINT feeds.
- It uses Next.js 16, TypeScript 5, React 19, MapLibre GL, Framer Motion, Lucide React, HLS, satellite.js, rss-parser, and Docker/self-hosting scaffolding.
- It exposes a Next.js API route pattern for feeds such as flights, earthquakes, CCTV, news, fires, maritime, GDELT, satellites, weather, scanner, sentinel, Telegram feed, and `/api/osint/*` lookups.
- It is MIT licensed, with copyright retained by simplifaisoul. Any substantial copied portion must preserve the MIT notice.
- The MIT code license does not automatically settle the external data-source terms. Feed terms, attribution, rate limits, and commercial posture must be recorded separately.

## 3. Product seam

OSIRIS current shape:

```text
public/source feed -> Next.js API route -> map layer -> visible entity/operator inspection
```

Target Gaia/Orion shape:

```text
source feed -> GaiaSourceRecord -> OrionObservationEvent -> WorldProjection -> FusionLink -> PolicyEnvelope -> DecisionCard -> Receipt
```

That seam is the whole project. The map shell is useful only when the visible object can explain:

- what source produced it,
- when it was observed,
- how it was normalized,
- what confidence and evidence grade it carries,
- what policy state governs it,
- what action boundaries apply,
- what related assets/incidents/events it links to,
- what receipt proves the operator view or decision.

## 4. Readily reusable material

These pieces are importable with low conceptual friction:

1. MapLibre operational map canvas.
2. Layer rail / toggle grammar.
3. Entity count and live-status display pattern.
4. Marker and selected-object panel UX.
5. Keyless/fixture-first demo posture.
6. Docker/self-host deployment expectation.
7. Next.js API-route-per-feed scaffold.
8. Public OSINT layer taxonomy: aviation, maritime, CCTV, seismic, fires, weather, satellites, news, conflict, CVE/cyber, sanctions, crypto, Telegram/social.

These should be excavated rather than blindly preserved. The surface interaction model is the asset; the underlying authority model must be replaced.

## 5. Reusable after governance wrapping

These features can be retained only behind estate-native controls:

1. RECON toolkit and scanner workflows.
   - Must be routed through SCOPE-D EngagementPolicy.
   - Default state should be disabled or `policy_required`.
   - No live scan should run without explicit scope, authorization ref, execution mode, and receipt emission.

2. CVE/cyber exposure.
   - Must become evidence-bearing SCOPE-D/Orion events.
   - CVE lookup is allowed as enrichment; exploitation, live target action, or mutation is not a default product behavior.

3. Telegram/public-channel geoparsing.
   - Must be marked public-source, unverified, terms-sensitive, and confidence-scored.
   - Gaia must record fetch time, source URL, normalized text hash, geoparsing method, and evidence grade.

4. Crypto/sanctions lookup.
   - Must preserve dataset attribution, match method, match confidence, source version, and false-positive caveats.

5. CCTV/camera feeds.
   - Must be source-ledgered and not treated as universally reusable or commercially safe without review.

## 6. Material not authoritative for our estate

Do not preserve these as controlling architecture:

- OSIRIS layer/entity-first data model.
- Public-feed availability as a truth primitive.
- Ungoverned recon/scanner action semantics.
- Any implicit claim that public OSINT feeds are evidence-grade without source records.
- “Palantir alternative” positioning as the core identity.

Preferred identity:

> Orion is a governed field-intelligence operating map over a Gaia world-model substrate.

## 7. Excavation phases

### Phase A — Import control

Goal: make the fork auditable.

Tasks:

- Preserve upstream MIT license and copyright notices.
- Add/import audit files.
- Record upstream source identity and pinned baseline.
- Inventory API routes, external feeds, env vars, network behavior, and scanner paths.
- Classify every feed by safety and terms status.

Exit criteria:

- `docs/orion-osiris-excavation-plan.md` exists.
- `docs/osiris-import-audit.md` exists.
- `docs/osiris-source-ledger.md` exists.
- Scanner/recon behavior is explicitly classified as gated.

### Phase B — Map shell excavation

Goal: isolate reusable UI/body from authority model.

Tasks:

- Identify MapLibre map entrypoint.
- Identify layer registry / toggle state.
- Identify selected-object panel and alert/HUD components.
- Identify API route response shapes consumed by the client.
- Define which components become `orion-map-shell` candidates.

Exit criteria:

- A documented component map exists.
- Map shell can be described independently of external feeds.
- Layer registration points are known.

### Phase C — Orion event seam

Goal: replace arbitrary feed markers with governed events.

Tasks:

- Draft `OrionObservationEvent` schema.
- Draft `GaiaSourceRecord` schema.
- Draft `FeedAdapter` contract.
- Define adapter output rules for location, time, severity, confidence, source refs, and policy state.
- Add positive and negative fixtures.

Exit criteria:

- At least one safe feed class can be represented as an Orion event.
- Fixtures show accepted and rejected event envelopes.

### Phase D — Policy/provenance surface

Goal: make the UI show why a marker exists and what may be done.

Tasks:

- Add policy badge model.
- Add provenance/source drawer model.
- Add selected event decision-card model.
- Add receipt fixture for rendered decision card.
- Ensure scanner/recon routes cannot appear as free actions.

Exit criteria:

- Every displayed Orion marker has visible source/provenance and policy state.
- Decision card has receipt-ready fields.

### Phase E — Demo scenario

Goal: demonstrate why Orion/Gaia is more than OSIRIS.

Scenario: facility-risk fusion.

Inputs:

- Fire/weather/geospatial alert.
- Facility or asset fixture.
- CVE/cyber exposure fixture.
- Field report fixture.
- News/social signal fixture.

Output:

- One fused operational object on the map.
- Decision card explains what happened, why we believe it, affected assets, allowed actions, gated actions, evidence, and receipt.

Exit criteria:

- Demo can run without live credentials.
- The differentiator is visible in one screen.

## 8. Proposed repository artifacts

Create these in this repo first:

```text
docs/orion-osiris-excavation-plan.md          # this file
docs/osiris-import-audit.md                   # route/feed/env/network inventory
docs/osiris-source-ledger.md                  # data-source license/terms/evidence-grade ledger
docs/orion-gaia-osiris-comparison.md          # system comparison and product seam
docs/orion-map-mvp.md                         # first screen and demo definition
schemas/gaia-source-record.schema.json        # source/provenance wrapper
schemas/orion-observation-event.schema.json   # normalized field-intelligence event
schemas/orion-policy-envelope.schema.json     # view/enrich/export/scan/notify/act controls
schemas/orion-decision-card.schema.json       # operator-facing decision object
fixtures/orion/facility-risk/*.json           # demo scenario fixtures
```

## 9. Initial backlog

P0:

1. Add import audit.
2. Add source ledger.
3. Classify scanner/recon as gated.
4. Draft GaiaSourceRecord schema.
5. Draft OrionObservationEvent schema.
6. Inventory MapLibre/layer/component seams.

P1:

1. Extract map shell candidate list.
2. Add policy badge model.
3. Add provenance drawer model.
4. Add selected-event decision card model.
5. Add fixture-mode scenario.

P2:

1. Convert safe feeds into Orion events.
2. Route CVE/cyber through SCOPE-D evidence boundary.
3. Add receipt fixture.
4. Add docs for promotion into Orion/Gaia/SCOPE-D.

P3:

1. Review CCTV/Telegram/crypto/sanctions source terms.
2. Re-enable reviewed live feeds.
3. Add auth/workspace scoping.
4. Add persistent source cache.
5. Add export/audit bundle.

## 10. Non-goals for this excavation pass

- No claim that live source feeds are evidence-grade.
- No enabling live scanner/recon execution by default.
- No migration into Orion/Gaia core repos before the seam is documented.
- No product claim that we are merely an OSIRIS fork.
- No replacing Gaia, Orion, SCOPE-D, or Ontogenesis with OSIRIS primitives.

## 11. Acceptance criteria for the one-to-two-day chat sprint

The chat sprint is complete when this repo contains:

- A durable excavation plan.
- An import audit scaffold.
- A source ledger scaffold.
- A Gaia/Orion/OSIRIS comparison document.
- A map MVP document.
- First-pass schemas for source records and observation events.
- A prioritized issue backlog or issue-ready bodies.

The implementation sprint can begin once those artifacts exist and scanner/recon remains gated by default.
