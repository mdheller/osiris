# Orion / Gaia / OSIRIS Comparison

Status: planning artifact
Repo: `mdheller/osiris`
Related: `docs/orion-osiris-excavation-plan.md`

## 1. Executive distinction

OSIRIS is a live public-feed geospatial intelligence dashboard.

Gaia plus Orion is a governed world-model and field-intelligence system.

OSIRIS is valuable because it already speaks the correct surface grammar: map-first, layer-based situational awareness, real-time markers, live feeds, selected-object panels, and a recon/tooling drawer. That makes it an excellent body for Orion’s first operational-map surface.

It is not sufficient as the authority substrate. Gaia/Orion must replace the implicit feed/entity model with evidence-bearing source records, normalized observation events, provenance, fusion, policy gates, decision cards, and receipts.

## 2. System grammar

### OSIRIS grammar

```text
public feed -> API route -> map layer -> visible entity -> operator inspection
```

Primary unit: visible layer/entity.

Primary value: fast situational awareness.

Primary risk: public-source output can be mistaken for governed evidence or authorized action.

### Gaia / Orion grammar

```text
source feed -> GaiaSourceRecord -> OrionObservationEvent -> WorldProjection -> FusionLink -> PolicyEnvelope -> DecisionCard -> Receipt
```

Primary unit: governed observation/event with provenance and policy state.

Primary value: explainable field intelligence and action discipline.

Primary risk: over-architecture unless the map-first UX remains legible.

## 3. Capability comparison

| Capability | OSIRIS | Gaia / Orion target | Integration decision |
|---|---|---|---|
| Map canvas | MapLibre WebGL map | Orion operational map surface | Reuse/excavate. |
| Layer rail | Toggleable public OSINT layers | Policy-scoped layer registry | Reuse UX, replace authority model. |
| Entity counters | Real-time counts by layer | Counts by layer, policy state, confidence, incident/fusion state | Extend. |
| Public feeds | Route-specific external feeds | FeedAdapter output into GaiaSourceRecord and OrionObservationEvent | Wrap. |
| Event model | Layer-specific markers | Normalized observation event | Replace. |
| Source provenance | Partial/implicit | Mandatory GaiaSourceRecord | Add. |
| Evidence grade | Not central | Mandatory and visible | Add. |
| Fusion | Mostly visual co-location | Explicit FusionLink across assets/incidents/sources | Add. |
| Policy | Not central | PolicyEnvelope controls view/enrich/export/scan/notify/act | Add. |
| Decision workflow | Selected-object inspection | DecisionCard with action boundary and receipt | Add. |
| Recon toolkit | UI plus scanner/lookup tooling | SCOPE-D governed passive lookup / active scan split | Gate. |
| CVE/cyber | NVD/custom scanner | SCOPE-D evidence object and cyber exposure layer | Wrap/gate. |
| Telegram/geoparsing | Public preview scraping | Source-ledgered unverified public-source events | Hold/gate. |
| CCTV | Public camera aggregation | Source-ledgered visual context; not automatically evidence | Hold/gate. |
| Docker/self-host | Strong self-host expectation | Fixture-first Orion deploy path | Preserve. |
| Identity/positioning | OSINT/Palantir-alternative style dashboard | Governed field-intelligence operating map | Reposition. |

## 4. Where OSIRIS bolts on cleanly

OSIRIS bolts on cleanly as:

1. Orion’s map-first UI shell.
2. A public OSINT layer taxonomy.
3. A feed-adapter excavation source.
4. A self-hosting demonstration baseline.
5. A proof that operators understand the map-as-theater interface.

The most reusable technical surfaces are:

- MapLibre map rendering.
- Layer toggles.
- Progressive/viewport-aware fetching pattern.
- Selected-object panel pattern.
- HUD/alert language.
- Docker/self-host flow.
- API route-per-feed scaffold.

## 5. Where OSIRIS must be subordinated

OSIRIS must not control:

1. Evidence semantics.
2. Source authority.
3. Policy/action gating.
4. Cyber/recon authorization.
5. Long-term world-model state.
6. Ontology vocabulary.
7. Operator decision receipts.

These belong to the estate:

- Gaia: source records, world evidence, manifests, source hashes, geospatial/temporal projection.
- Orion/OFIF: observation events, operational incidents, decision cards, field workflow.
- SCOPE-D: cyber exposure, recon/tool boundaries, engagement policy, receipts.
- Ontogenesis: vocabulary, JSON-LD/SHACL profile, semantic promotion.
- Prophet Platform: runtime, workroom/workspace binding, service/API deployment.
- Sociosphere: cross-repo registration and dependency graph.

## 6. Product positioning

Avoid this as the central claim:

> We forked OSIRIS and made a Palantir alternative.

Prefer:

> Orion is a governed field-intelligence operating map over a Gaia world-model substrate.

Or, expanded:

> Orion turns live feeds, sensor reports, cyber exposure, human observations, and world-model evidence into fused operational state with provenance, policy controls, decision cards, and receipts.

OSIRIS validates the map-first UX. Orion/Gaia supplies the governance, memory, fusion, and evidence discipline.

## 7. Importability classes

### Directly importable

- Map shell concepts.
- Layer UX.
- Entity count grammar.
- Selected-object UI pattern.
- Self-hosting posture.
- Fixture/keyless-first posture.

### Importable after wrapping

- Public feed routes.
- CVE/threat enrichment.
- Sanctions lookup.
- Crypto lookup.
- News/social/geoparsing.
- CCTV feeds.
- Aviation/maritime feeds.

### Not importable as-is

- Active scanner/recon semantics.
- Public feed as truth primitive.
- Layer/entity data model as core authority model.
- Any hidden or implicit source licensing assumption.
- Any operator action without policy and receipt.

## 8. First demo shape

The first Orionized OSIRIS demo should not attempt to show every inherited layer.

Use a narrow facility-risk scenario:

1. Fire/weather/geospatial event.
2. Facility/asset fixture.
3. CVE/cyber exposure fixture.
4. Human/operator field report fixture.
5. Optional news/social public-source signal.

The map should show one fused operational object with:

- location,
- severity,
- confidence,
- source count,
- affected asset,
- policy badge,
- decision-card status,
- receipt status.

The selected event drawer should answer:

- What happened?
- Why do we believe it?
- Which sources support it?
- What assets are affected?
- What actions are allowed?
- What actions are gated?
- What receipt was produced?

## 9. Strategic conclusion

OSIRIS is not a competitor to the Gaia/Orion architecture. It is a useful body for the first visible operational surface.

The correct strategy is excavation:

1. Preserve MIT attribution.
2. Audit routes and sources.
3. Gate risky recon behavior.
4. Keep the map-first shell.
5. Replace the authority model with Gaia/Orion/SCOPE-D primitives.
6. Demonstrate the difference through a fixture-backed, receipt-bearing facility-risk scenario.
