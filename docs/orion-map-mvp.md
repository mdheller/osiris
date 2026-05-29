# Orion Map MVP

Status: planning artifact
Repo: `mdheller/osiris`
Related:

- `docs/orion-osiris-excavation-plan.md`
- `docs/osiris-import-audit.md`
- `docs/osiris-source-ledger.md`
- `docs/orion-gaia-osiris-comparison.md`

## 1. Purpose

This MVP defines the first Orionized map surface excavated from OSIRIS.

The goal is not to expose every OSIRIS feed. The goal is to prove the differentiator in one screen:

> A map marker is not just a marker. It is a governed operational object with source provenance, confidence, policy state, decision context, and receipt trace.

## 2. MVP claim

The first demo should show that Orion can turn heterogeneous world signals into one governed field-intelligence object.

Minimum narrative:

```text
A fire/weather event, facility asset, cyber exposure, and field report fuse into one operational incident on the map. The operator can inspect sources, confidence, policy gates, allowed actions, gated actions, and receipt status.
```

## 3. Non-goals

- No live scanner/recon execution.
- No claim that inherited OSIRIS feeds are evidence-grade.
- No full enterprise auth/RBAC.
- No persistent production world model.
- No live CCTV/Telegram/crypto/sanctions dependence in the first demo.
- No migration into Orion/Gaia core repos before the seam is documented.

## 4. Required screen regions

### 4.1 Map canvas

Base requirement:

- MapLibre map remains the operational theater.
- Markers are rendered from normalized Orion objects, not raw feed-specific markers.
- Markers can be synthetic fixture-backed for first demo.

Marker minimum display:

- Type icon or class.
- Severity visual state.
- Policy badge state.
- Selected/unselected state.

### 4.2 Layer rail

Required layers for MVP:

1. Natural hazard / fire-weather.
2. Facility/assets.
3. Cyber exposure.
4. Field reports.
5. Fused incidents.

Optional later layers:

- Aviation.
- Maritime.
- CCTV.
- News/social.
- Sanctions/crypto.
- Telegram/public-channel geoparsing.

Layer rail must show:

- Layer enabled/disabled state.
- Entity count.
- Source mode: fixture, public feed, internal, gated.
- Policy state where relevant.

### 4.3 Selected-event drawer

When the operator selects a marker, the drawer must show:

- Event title.
- Event type.
- Observed time.
- Location.
- Severity.
- Confidence.
- Source count.
- Evidence grade.
- Policy state.
- Related assets.
- Related events.
- Receipt status.

### 4.4 Provenance/source drawer

The provenance drawer must show source records supporting the event:

- Source name.
- Source family.
- Fetch or observation time.
- Source URL/API family, if safe to show.
- Hash/canonicalization status.
- Attribution/terms status.
- Evidence grade.
- Confidence contribution.

### 4.5 Decision card panel

The decision card must answer:

- What happened?
- Why do we believe it?
- What assets are affected?
- What is the operational risk?
- What actions are allowed?
- What actions are gated?
- What action requires SCOPE-D policy or human authorization?
- What receipt exists or will be emitted?

### 4.6 Replay/timeline controls

MVP should support fixture replay:

- Start replay.
- Pause replay.
- Step event.
- Reset scenario.
- Show current scenario time.

## 5. First scenario: facility-risk fusion

### 5.1 Scenario summary

A facility sits near a worsening fire/weather event. A software/vendor CVE exposure affects facility systems. A field report confirms local disruption. Orion fuses these inputs into one operational incident.

### 5.2 Fixture inputs

Required fixture families:

```text
fixtures/orion/facility-risk/source-records/*.json
fixtures/orion/facility-risk/observation-events/*.json
fixtures/orion/facility-risk/fusion-links/*.json
fixtures/orion/facility-risk/decision-cards/*.json
fixtures/orion/facility-risk/receipts/*.json
```

Input events:

1. `natural_hazard.fire_weather_alert`
2. `asset.facility`
3. `cyber.cve_exposure`
4. `field_report.operator_observation`
5. `incident.fused_facility_risk`

### 5.3 Expected fused output

The fused incident should include:

- `incident_id`
- `title`
- `summary`
- `location`
- `time_window`
- `severity`
- `confidence`
- `source_refs`
- `asset_refs`
- `event_refs`
- `policy_envelope_ref`
- `decision_card_ref`
- `receipt_ref`

## 6. Policy states

Use these provisional policy states for MVP:

| State | Meaning |
|---|---|
| `public_view_allowed` | Object may be displayed in public/demo mode. |
| `internal_view_allowed` | Object requires workspace/internal context. |
| `unverified_source` | Object is visible but not evidence-grade. |
| `attribution_required` | Source requires attribution before export/public use. |
| `action_gated` | Operator action exists but requires policy gate. |
| `scope_required` | Target scope must be declared before enrichment/action. |
| `authorization_required` | Human/legal/engagement authorization required. |
| `expired` | Source/event is stale or outside valid time window. |

## 7. Receipt states

Use these provisional receipt states:

| State | Meaning |
|---|---|
| `none` | No receipt emitted. |
| `render_receipt_ready` | UI has enough data to emit a render receipt. |
| `decision_receipt_ready` | Decision card has enough data to emit a decision receipt. |
| `emitted.synthetic` | Synthetic/demo receipt emitted. |
| `emitted.live` | Live receipt emitted. Not required for MVP. |

## 8. MVP schemas

The MVP depends on first-pass schemas:

- `schemas/gaia-source-record.schema.json`
- `schemas/orion-observation-event.schema.json`
- `schemas/orion-policy-envelope.schema.json`
- `schemas/orion-decision-card.schema.json`

Optional later:

- `schemas/orion-map-receipt.schema.json`
- `schemas/orion-fusion-link.schema.json`
- `schemas/orion-feed-adapter.schema.json`

## 9. Acceptance criteria

The MVP design is complete when:

- The map can render fixture-backed Orion events.
- Each event links to at least one Gaia source record.
- Each event has visible confidence and evidence grade.
- Each event has visible policy state.
- Selecting an event opens a decision card.
- The decision card links back to source records.
- Scanner/recon actions are disabled or marked `policy_required`.
- The scenario runs without live credentials.
- The docs explain what OSIRIS supplies and what Orion/Gaia adds.

## 10. Implementation sequence

1. Add schemas.
2. Add fixture records.
3. Identify OSIRIS map/layer entrypoints.
4. Build adapter from fixture events to map markers.
5. Add policy badge rendering.
6. Add selected-event drawer fields.
7. Add provenance drawer fields.
8. Add decision-card panel.
9. Gate scanner/recon actions.
10. Add README/demo note.
