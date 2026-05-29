# OSIRIS Import Audit

Status: scaffold
Repo: `mdheller/osiris`
Related: `docs/orion-osiris-excavation-plan.md`

## 1. Purpose

This audit records what the inherited OSIRIS body contains before it is promoted into the Gaia/Orion estate. It separates importable code, external data-source assumptions, runtime/network behavior, and gated recon behavior.

The audit exists to prevent three failure modes:

1. Treating MIT-licensed code as if all referenced data sources share the same permissions.
2. Treating public-feed markers as evidence-grade Gaia/Orion objects without provenance.
3. Allowing scanner/recon behavior to bypass SCOPE-D engagement policy.

## 2. Current repo facts

Repository: `mdheller/osiris`
Default branch: `master`
License file: `LICENSE`
Upstream copyright: `Copyright (c) 2026 simplifaisoul`
Project package: `osiris@0.1.0`
Primary framework: Next.js 16
Primary language: TypeScript 5
Primary map engine: MapLibre GL JS

## 3. Upstream license posture

The repository code is MIT licensed. Substantial copied portions must preserve the copyright and permission notice.

The code license is not a data-source license. Every external source used by OSIRIS must receive a separate source-ledger entry before being treated as commercially safe or evidence-grade.

Required retained artifacts:

- `LICENSE`
- Any upstream copyright notices in copied files
- `NOTICE` if later created for combined attribution
- This audit trail

## 4. Declared route surface from README

The README declares the following route families:

| Route family | Declared purpose | Import posture | Required Orion/Gaia treatment |
|---|---|---|---|
| `/api/flights` | Aviation feed | Review-required | FeedAdapter plus source-ledger entry; API terms/rate limits required. |
| `/api/earthquakes` | Seismic feed | Safe initial candidate | Convert to OrionObservationEvent with GaiaSourceRecord. |
| `/api/cctv` | Camera feeds | Review-required | Source terms, jurisdiction, attribution, and retention posture required. |
| `/api/news` | Live/news feed | Candidate with caution | Source-ledger, attribution, and evidence-grade marking required. |
| `/api/fires` | Fire/hotspot feed | Safe initial candidate | Convert through Gaia source record and event envelope. |
| `/api/maritime` | Ports/chokepoints/AIS-like data | Review-required | Static-vs-live distinction and source terms required. |
| `/api/gdelt` | GDELT/news events | Candidate with caution | Source/version/citation and geoparsing confidence required. |
| `/api/satellites` | Satellite/space data | Review-required | API key/terms and source version required. |
| `/api/weather` | Weather/severe event feed | Safe initial candidate | Convert through Gaia source record and event envelope. |
| `/api/scanner` | Scanner backend | Gated | Must be disabled or policy_required until SCOPE-D gate exists. |
| `/api/sentinel` | Sentinel/intel feed | Unknown | Inspect implementation before any promotion. |
| `/api/telegram-feed` | Public Telegram preview scraping/geoparsing | Review-required/high-caution | Terms, source hash, language/geoparse confidence, unverified-source grade. |
| `/api/osint/*` | WHOIS/DNS/IP/CVE/sanctions/crypto/sweep/threats | Mixed | Passive lookup allowed after wrapping; active scanning gated. |

## 5. Declared external source families

The README declares the following source families. Each must be represented in `docs/osiris-source-ledger.md`:

- OpenSky
- USGS
- NASA
- NOAA
- TfL
- NVD
- GDACS
- EONET
- FIRMS
- N2YO
- RSS feeds
- blockstream.info
- Blockscout
- OpenSanctions
- Telegram public previews
- Static conflict-zone intelligence
- Static maritime/naval intelligence

## 6. Declared environment variables

The README declares:

| Variable | Purpose | Risk posture |
|---|---|---|
| `OSIRIS_PORT` | Host port for container publication | Low |
| `SCANNER_URL` | Scanner backend URL | High; SCOPE-D gate required |
| `SCANNER_KEY` | Shared key for scanner backend | High; secret handling required |
| `FIRMS_API_KEY` | NASA FIRMS key/rate limits | Medium; terms and secret handling required |
| `OPENSKY_CLIENT_ID` | OpenSky OAuth client ID | Medium; source terms required |
| `OPENSKY_CLIENT_SECRET` | OpenSky OAuth secret | Medium/high; secret handling required |
| `N2YO_API_KEY` | Satellite API key | Medium; terms and secret handling required |
| `AIS_API_KEY` | Maritime/AIS key | Medium; terms and secret handling required |

## 7. Runtime action classes

### Class A: passive visualization

Examples: reading public earthquake, fire, weather, and CVE feeds.

Default posture: allowed in fixture mode and public-feed mode after source ledgering.

### Class B: passive lookup/enrichment

Examples: DNS lookup, WHOIS lookup, CVE lookup, sanctions search, crypto wallet read-only lookup.

Default posture: allowed only after source ledgering, rate-limit handling, and policy labeling. Some lookups may still have terms or privacy restrictions.

### Class C: active recon/scanning

Examples: port scanning, service fingerprinting, vulnerability scanning, sweep/threat probing.

Default posture: disabled or `policy_required`. Must pass SCOPE-D EngagementPolicy before execution.

## 8. Promotion rules

No file, route, or feature is promoted into Orion/Gaia core until it satisfies the relevant rule:

1. Source-producing route: has a source-ledger entry.
2. Marker-producing route: emits or can be wrapped into `OrionObservationEvent`.
3. External-source route: emits or can be paired with `GaiaSourceRecord`.
4. Action route: has a `PolicyEnvelope` and explicit SCOPE-D gate.
5. UI surface: distinguishes source confidence, policy state, and receipt status.

## 9. Initial safe-feed candidates

Prioritize these for first adapter conversion:

1. Earthquakes / seismic.
2. Fires / hotspot events.
3. Weather / severe events.
4. CVE lookup as passive enrichment only.
5. Static facility/assets fixture, introduced by us rather than inherited.

Hold for later review:

- Scanner/recon.
- Telegram/public preview scraping.
- CCTV feeds.
- Aviation feeds.
- Maritime/AIS feeds.
- Crypto wallet tracing.
- Sanctions matching beyond fixture mode.

## 10. Open inspection tasks

- Locate concrete API route files and route handlers.
- Locate MapLibre map entrypoint.
- Locate layer registry/state store.
- Locate selected-object/HUD/recon components.
- Locate scanner backend invocation and failure behavior.
- Locate source-specific normalization logic.
- Locate any cache/polling code.
- Locate any telemetry/analytics calls.

## 11. Audit status

This scaffold is complete enough to start excavation, but not complete enough for promotion. The next pass should fill concrete file paths and implementation notes after connector or local code inspection.
