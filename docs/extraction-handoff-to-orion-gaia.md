# Extraction Handoff to Orion / Gaia

Status: controlling boundary note
Repo: `mdheller/osiris`

## 1. Controlling decision

This repository is a quarantine and excavation workspace only.

Do not continue product implementation here.

The inherited OSIRIS codebase is treated as untrusted third-party material until audited. The purpose of this repo is to preserve metadata, import notes, extraction analysis, source ledgers, fixture sketches, and migration candidates. Product code should be implemented in the appropriate estate repositories after review.

## 2. Direction of travel

Correct direction:

```text
mdheller/osiris -> audit/extract/specify -> Orion/Gaia/SCOPE-D/Ontogenesis/Prophet Platform
```

Incorrect direction:

```text
mdheller/osiris -> become the product
```

The OSIRIS body may provide ideas, UI patterns, adapter candidates, route inventory, and map-shell references. It does not provide authority, trust, evidence grade, policy, or product identity.

## 3. Security posture

Treat inherited code and dependencies as potentially hostile or compromised until proven otherwise.

Do not run inherited code in a trusted environment.

Do not provide production credentials, API keys, cloud tokens, GitHub tokens, private network access, customer data, or real target data to this repository.

Do not enable scanner/recon behavior from this repo.

Do not promote any dependency, route handler, API call, or UI component without review.

Do not assume public API integrations are legally, commercially, or operationally safe just because the repository code is MIT licensed.

## 4. What may be written here

Allowed:

- Audit metadata.
- Source ledgers.
- Import notes.
- Route/component maps.
- Security review notes.
- Extraction decisions.
- Fixture sketches.
- Migration candidates.
- Non-execution validation metadata.
- Handoff documents.

Avoid:

- Product implementation intended to live here permanently.
- Runtime feature expansion.
- Live-feed enablement.
- Credential wiring.
- Active scanner/recon integration.
- Production deployment hardening.
- Long-term schema ownership.

## 5. Promotion targets

Promote only after audit:

| Material | Target home |
|---|---|
| Map shell / operator UI | Orion / OFIF |
| Observation event model | Orion / OFIF |
| Source record / world evidence | Gaia |
| Cyber exposure and recon policy | SCOPE-D |
| Vocabulary and semantic shapes | Ontogenesis |
| Runtime/workroom/API binding | Prophet Platform |
| Cross-repo dependency registration | Sociosphere |

## 6. Required promotion gates

Before anything moves out of this repo, it must satisfy the relevant gate:

1. License gate: MIT notices preserved for copied code.
2. Source gate: external data-source terms recorded.
3. Security gate: dependency and code-path review complete.
4. Network gate: outbound calls known and classified.
5. Credential gate: no secret requirement hidden in copied code.
6. Policy gate: active scanner/recon behavior disabled unless SCOPE-D authorizes it.
7. Evidence gate: source records and observation events are provenance-bearing.
8. Ownership gate: target repo owns the primitive being promoted.

## 7. Current useful artifacts in this repo

The following are excavation artifacts, not final product ownership declarations:

- `docs/orion-osiris-excavation-plan.md`
- `docs/osiris-import-audit.md`
- `docs/osiris-source-ledger.md`
- `docs/orion-gaia-osiris-comparison.md`
- `docs/orion-map-mvp.md`
- `schemas/*.schema.json`
- `fixtures/orion/facility-risk/**`
- `scripts/validate-orion-fixtures.mjs`

The schemas and fixtures are migration candidates. They should not be treated as permanently owned by this repo.

## 8. Next correct step

The next work should not expand OSIRIS as an application.

The next work should:

1. Inspect inherited code paths without executing trusted credentials.
2. Create `docs/osiris-component-map.md` with map/layer/scanner/component inventory.
3. Decide which metadata and fixture sketches migrate to Orion/Gaia.
4. Implement product-owned versions in the target repositories.

## 9. Final rule

This repo is the carcass, not the organism.

The organism is Orion over Gaia, with SCOPE-D policy boundaries and Ontogenesis semantic control.
