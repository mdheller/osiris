# OSIRIS Component Map

Status: excavation metadata
Repo: `mdheller/osiris`
Related:

- `docs/extraction-handoff-to-orion-gaia.md`
- `docs/osiris-import-audit.md`
- `docs/osiris-source-ledger.md`
- `docs/orion-gaia-osiris-comparison.md`

## 1. Boundary

This document is metadata only. It does not bless inherited code for product use.

The inherited OSIRIS code remains untrusted third-party material until reviewed. This component map records useful seams and risk surfaces for later migration into Orion/Gaia/SCOPE-D-owned code.

## 2. Top-level application shell

Observed file:

```text
src/app/page.tsx
```

Role:

- Primary client dashboard shell.
- Dynamically imports the map, layer panel, camera viewer, and OSINT panel.
- Owns dashboard state, active layer state, URL state, selected camera/live-feed state, sweep visualization state, and scan-target visualization state.

Important observations:

- `OsirisMap`, `LayerPanel`, `CameraViewer`, and `OsintPanel` are dynamically imported from the page shell.
- The page defines `activeLayers` locally and initializes a large inherited layer set.
- The page performs browser-side fetches against many route families.
- The page includes direct browser reverse-geocoding via Nominatim on mouse movement after debounce.
- The page wires entity clicks for CCTV and live news.

Extraction decision:

- Do not promote this page shell as-is.
- Treat it as a UI wiring reference.
- Orion should implement its own product-owned shell with an equivalent map/layer/panel grammar and a different authority model.

## 3. Active layer state

Observed file:

```text
src/app/page.tsx
```

Layer keys observed in the initial page state:

```text
flights
private
jets
military
maritime
satellites
balloons
cctv
live_news
news_intel
earthquakes
fires
weather
radiation
infrastructure
global_incidents
war_alerts
gps_jamming
day_night
```

Additional layer referenced later:

```text
scm_suppliers
```

Extraction decision:

- Preserve the concept of layer keys and grouped toggles.
- Do not preserve this raw layer set as Orion authority.
- Map these into Orion layer families:
  - natural hazards,
  - facilities/assets,
  - cyber exposure,
  - field reports,
  - fused incidents,
  - optional public OSINT layers after source review.

## 4. Data fetching pattern

Observed file:

```text
src/app/page.tsx
```

Useful pattern:

- Shared `fetchEndpoint` utility merges route results into `dataRef.current`.
- Progressive loading fetches core feeds first.
- Layer-aware loading fetches data only when a layer is toggled on.
- `layerFetchedRef` prevents duplicate fetches for several layer classes.
- Polling intervals are relaxed for stable sources.

Risk surface:

- Fetches route outputs directly into UI state.
- Does not pass through GaiaSourceRecord / OrionObservationEvent as the controlling model.
- Some fetches target live public or external-derived data paths.

Extraction decision:

- Preserve the progressive/layer-aware loading pattern.
- Replace direct feed-to-map data with `FeedAdapter -> GaiaSourceRecord -> OrionObservationEvent`.
- Treat `layerFetchedRef` style dedupe as a usable UI optimization, not a provenance primitive.

## 5. Map component

Observed file:

```text
src/components/OsirisMap.tsx
```

Role:

- Owns MapLibre map creation.
- Imports `maplibre-gl` and MapLibre CSS.
- Defines the map props contract: `data`, `activeLayers`, click handlers, coordinate handlers, right-click handler, projection, style, sweep data, and scan targets.
- Creates icon and dot images in canvas.
- Adds a fixed list of GeoJSON sources to the MapLibre map.
- Adds many MapLibre layers for conflict zones, day/night, earthquakes, fires, CCTV, GDELT, GPS jamming, weather, infrastructure, satellites, maritime, live news, SIGINT news, IP sweep, and scan targets.

Observed MapLibre source IDs:

```text
flights
military
jets
private-fl
satellites
earthquakes
gdelt
gps-jamming
day-night
cctv
fires
weather
infrastructure
maritime
maritime-choke
maritime-ships
live-news
sigint-news
conflict-zones
war-alerts-targets
war-alerts-lines
balloons
radiation
ip-sweep-devices
ip-sweep-pulse
ip-sweep-connections
scan-targets
```

Risk surface:

- This component is layer/source-specific.
- It includes scan visualization sources (`ip-sweep-*`, `scan-targets`) that should not be promoted into Orion without SCOPE-D ownership.
- Styling encodes the inherited OSIRIS product identity.
- The layer model is MapLibre-source-first rather than Orion-event-first.

Extraction decision:

- Preserve the MapLibre operational-theater pattern.
- Preserve source/layer setup ideas as a reference only.
- Do not import scan/sweep visualization into Orion product code until SCOPE-D owns the policy gate and evidence object.
- Implement an Orion-owned map source such as `orion-observation-events` and render symbols from normalized event fields.

## 6. Layer panel

Observed file:

```text
src/components/LayerPanel.tsx
```

Role:

- Defines grouped layer taxonomy.
- Renders active counts and total entity counts.
- Allows toggling individual layers and whole groups.

Observed groups:

```text
AVIATION
MARITIME & SPACE
SURVEILLANCE
NATURAL HAZARDS
THREATS & INFRA
DISPLAY
```

Risk surface:

- Group taxonomy is OSINT-dashboard-oriented, not Orion-policy-oriented.
- Does not distinguish fixture/public/internal/gated source modes.
- Does not expose evidence grade, attribution requirement, or policy state.

Extraction decision:

- Preserve grouped layer UX and entity count grammar.
- Replace group taxonomy with Orion MVP groups:
  - NATURAL HAZARD,
  - FACILITY / ASSET,
  - CYBER EXPOSURE,
  - FIELD REPORT,
  - FUSED INCIDENT,
  - PUBLIC OSINT REVIEWED,
  - GATED / DISABLED.
- Add policy/evidence badges in Orion-owned implementation.

## 7. OSINT / RECON panel

Observed file:

```text
src/components/OsintPanel.tsx
```

Role:

- Defines a broad tabbed OSINT/recon toolkit.
- Performs user-driven lookups through route families.
- Visualizes sweep and scan geolocation results back into the map.

Observed tabs:

```text
scanner
vuln
dns
whois
certs
threats
headers
ssl
subdomains
tech
shodan
bgp
mac
phone
leaks
github
sweep
```

Observed route targets include:

```text
/api/osint/cve
/api/osint/sweep
/api/osint/dns
/api/osint/certs
/api/osint/whois
/api/osint/threats
/api/osint/bgp
/api/osint/mac
/api/osint/phone
/api/osint/leaks
/api/osint/crypto
/api/osint/github
/api/scanner
/api/osint/shodan
/api/osint/ip
```

Risk surface:

- This is the highest-risk UI component inspected so far.
- It mixes passive lookups, enrichment, geolocation, vulnerability-oriented workflows, sweep behavior, and scanner proxy calls.
- It can push scan/geolocation outputs back onto the map.
- It must not be treated as an ordinary Orion feature.

Extraction decision:

- Do not promote this component as-is.
- Split future Orion/SCOPE-D product concepts into:
  - passive public lookup,
  - passive cyber exposure enrichment,
  - source-ledgered sanctions/crypto/person/org lookup,
  - SCOPE-D-gated scan/recon action,
  - disabled/dead UI state for unsupported or unauthorized actions.
- Active scanner/sweep/vulnerability behavior belongs to SCOPE-D, not Orion core.

## 8. Scanner route

Observed file:

```text
src/app/api/scanner/route.ts
```

Role:

- Proxies scanner requests to `SCANNER_URL` using `SCANNER_KEY`.
- Imports SSRF guard helpers from `src/lib/ssrf-guard.ts`.
- Rate-limits by client IP.
- Validates target host.
- Restricts scan type to an allowlist.
- Returns 503 when scanner key is not configured.

Observed scan allowlist:

```text
quick
ssl
headers
rdns
subdomains
tech
whois
geoloc
vuln
```

The file explicitly states that deeper scan types were removed from public access:

```text
deep
ports
banner
traceroute
```

Risk surface:

- Even with guardrails, this is an action surface.
- It depends on scanner credentials and an external scanner backend.
- It can cause network activity against user-supplied targets.
- It is not acceptable as an ungated Orion feature.

Extraction decision:

- Treat as SCOPE-D-only design input.
- Default Orion posture: `policy_required`, `scope_required`, or disabled.
- Do not wire this route to production credentials from this repo.
- Promote only after SCOPE-D EngagementPolicy, TargetScope, AuthorizationRef, ExecutionMode, and ReceiptRequired exist.

## 9. SSRF guard

Observed file:

```text
src/lib/ssrf-guard.ts
```

Role:

- Validates user-controlled host/IP before network requests.
- Blocks many IPv4 reserved ranges.
- Blocks several IPv6 reserved/local patterns.
- Rejects non-canonical IPv4 forms.
- Resolves hostnames and rejects any A/AAAA answer in blocked ranges.
- Provides `safeFetch` that validates redirects hop-by-hop.

Risk surface:

- Useful defensive code, but inherited and not yet independently audited.
- Notes acknowledge TOCTOU limits around DNS rebinding because total defense requires socket-layer IP pinning.
- In-memory rate limiting is per runtime isolate and not an enterprise-grade abuse control.

Extraction decision:

- Treat as useful reference material only.
- Do not promote without test review, negative fixtures, and SCOPE-D ownership.
- Any future SCOPE-D implementation should have explicit SSRF fixtures and runtime boundary tests.

## 10. Extractable design patterns

Safe to copy conceptually after reimplementation in our repos:

1. Dynamic split between dashboard shell, map, layer panel, camera/feed viewer, and recon/tool panel.
2. MapLibre operational canvas.
3. Grouped layer rail with active counts.
4. Progressive loading and layer-aware fetches.
5. Selected entity click model.
6. Fixture/public-feed mode separation.
7. Visual distinction among event classes.

Do not copy directly without audit:

1. Route handlers.
2. Scanner proxy.
3. OSINT panel execution behavior.
4. External source calls.
5. Dependency graph.
6. Analytics/telemetry.
7. Any code path requiring credentials.

## 11. Migration targets

| Extracted concept | Target repo | Notes |
|---|---|---|
| Map shell pattern | Orion / OFIF | Reimplement around OrionObservationEvent, not raw layer data. |
| Layer rail | Orion / OFIF | Add policy/evidence/source-mode badges. |
| Source ledger | Gaia | Convert ledger to Gaia source registry once terms are reviewed. |
| Facility-risk fixture | Orion + Gaia | Split source records to Gaia, observation/decision objects to Orion. |
| Cyber exposure fixture | SCOPE-D + Orion | Passive exposure only; no scanner authority. |
| Scanner/recon concept | SCOPE-D | Requires EngagementPolicy and receipts. |
| Vocabulary | Ontogenesis | Stabilize after schema names settle. |

## 12. Next inspection items

Continue reading without execution:

1. `src/app/api/osint/**`
2. `src/app/api/earthquakes/route.ts`
3. `src/app/api/fires/route.ts`
4. `src/app/api/weather/route.ts`
5. `src/app/api/cctv/route.ts`
6. `src/app/api/telegram-feed/route.ts`
7. `src/app/api/flights/route.ts`
8. `src/app/api/maritime/route.ts`
9. Dependency lockfile and install scripts.
10. Any analytics/telemetry integration.

## 13. Interim decision

The inspected component shape supports the original strategy:

- OSIRIS is useful as a map-first body and route inventory.
- The implementation is not our authority model.
- The OSINT/recon surface is high-risk and belongs behind SCOPE-D gates.
- Orion/Gaia implementation must be product-owned and should not run from this repo.
