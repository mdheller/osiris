# OSIRIS Route Risk Map

Status: excavation metadata
Repo: `mdheller/osiris`
Related:

- `docs/extraction-handoff-to-orion-gaia.md`
- `docs/osiris-component-map.md`
- `docs/osiris-import-audit.md`
- `docs/osiris-source-ledger.md`

## 1. Boundary

This document is metadata only. It records route behavior discovered by read-only connector inspection.

Do not treat any route as production-approved. Do not run inherited code with credentials. Do not promote route handlers directly into Orion/Gaia/SCOPE-D. Reimplement product-owned equivalents in the correct target repo after audit.

## 2. Risk scale

| Class | Meaning | Default decision |
|---|---|---|
| `low` | Passive public-source fetch with low action/privacy risk | Candidate for fixture-backed adapter design. |
| `medium` | Public source with terms/rate-limit/reliability or inference concerns | Hold for source-ledger completion. |
| `high` | Camera/social/telemetry/credential/network action or privacy-sensitive behavior | Quarantine; no product promotion without review. |
| `critical` | Active recon/sweep/scanner behavior or stealth/evasion semantics | SCOPE-D-only design input; disabled by default. |
| `unknown` | Route not yet inspected or path not found | No promotion. |

## 3. Natural-hazard routes

### `src/app/api/earthquakes/route.ts`

Observed behavior:

- Fetches USGS GeoJSON feed for last-24-hour M2.5+ earthquakes.
- Uses a direct public URL: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson`.
- Normalizes feature geometry/properties into `lat`, `lng`, `depth`, `magnitude`, `place`, `time`, `url`, `tsunami`, `type`, `felt`, and `alert`.
- Adds public cache headers.

Risk class: `low`.

Promotion decision:

- Good first candidate for an Orion/Gaia adapter sketch.
- Do not copy handler directly.
- Reimplement as `USGSEarthquakeFeedAdapter` producing `GaiaSourceRecord` plus `OrionObservationEvent`.

Required promotion gates:

- USGS terms/source ledger entry.
- Canonical source hash or retrieval record.
- Evidence grade visible as `public_source.versioned` or `public_source.unverified` until version/hash discipline exists.

### `src/app/api/fires/route.ts`

Observed behavior:

- Fetches NASA FIRMS open active-fire CSVs for SUOMI VIIRS and MODIS global 24h sources.
- Falls back/augments with NASA EONET volcano events.
- Parses CSV internally and samples to a maximum of roughly 2,000 points to avoid browser lag.
- Adds public cache headers.

Risk class: `medium`.

Promotion decision:

- Good early candidate after source terms review.
- Preserve concept: multi-source fire/hazard adapter.
- Reimplement in Gaia/Orion rather than copying parser blindly.

Required promotion gates:

- NASA FIRMS terms and attribution check.
- EONET terms/source ledger entry.
- Explicit sampling semantics if data is reduced.
- Source record must distinguish FIRMS fire events from EONET volcano events.

### `src/app/api/weather/route.ts`

Observed behavior:

- Fetches NASA EONET active events and NOAA/NWS active alerts.
- Uses `stealthFetch` for EONET and regular fetch for NOAA/NWS.
- Normalizes event classes such as severe storms, volcanoes, sea ice, and NWS alerts.
- Skips EONET wildfires and earthquakes to avoid overlap with other routes.

Risk class: `medium`, elevated because it imports `stealthFetch`.

Promotion decision:

- The data concept is useful.
- The `stealthFetch` dependency is not acceptable for product-owned implementation.
- Reimplement with transparent fetch, declared user agent, source ledger, and no stealth/spoofing semantics.

Required promotion gates:

- NASA EONET source ledger.
- NOAA/NWS source ledger.
- Removal/replacement of `stealthFetch`.
- Evidence grade and provider field preserved.

## 4. Camera and surveillance routes

### `src/app/api/cctv/route.ts`

Observed behavior:

- Aggregates many public camera sources and country/provider-specific helper modules.
- Imports `stealthFetch`.
- Includes public transport/government/traffic camera APIs and curated hard-coded camera URLs.
- Supports region and proximity style loading according to file comments.
- References many providers and jurisdictions, including TfL, WSDOT, Caltrans, Canadian 511 services, municipal feeds, and multiple European/Australian/Japanese helpers.

Risk class: `high`.

Promotion decision:

- Do not promote live CCTV into Orion MVP.
- Useful only as a source-inventory reference.
- Any future camera layer must be source-ledgered per jurisdiction/provider and have retention/display policy.

Required promotion gates:

- Per-provider terms review.
- Privacy/retention policy.
- Attribution display.
- No stealth/spoofing helper.
- Workspace policy for who can view camera feeds.

## 5. Aviation routes

### `src/app/api/flights/route.ts`

Observed behavior:

- Fetches aircraft position data from `adsb.lol` across six broad global regions.
- Uses `stealthFetch`.
- Classifies aircraft into commercial, private, private jet, military, helicopter/plane.
- Performs heuristic GPS-jamming detection based on `nac_p` threshold and aggregates zones.
- Uses in-memory cache/coalescing to reduce global fan-out.

Risk class: `medium/high`.

Promotion decision:

- Good design reference for layer taxonomy and aggregation.
- Hold live-feed promotion until data-source terms and operational sensitivity review.
- Do not promote military/private classification as evidence without source confidence and caveats.
- Do not promote GPS-jamming inference without a claim-boundary note.

Required promotion gates:

- adsb.lol terms/source ledger.
- Removal/replacement of `stealthFetch`.
- Claim-boundary note for classification heuristics.
- Clear distinction between observed fields and inferred categories.

## 6. Maritime routes

### `src/app/api/maritime/route.ts`

Observed behavior:

- Mixes static global ports/chokepoints/naval-base records with optional AIS stream behavior.
- Imports `ws` and opens a WebSocket to `wss://stream.aisstream.io/v0/stream` when `AIS_API_KEY` is present.
- Maintains global in-memory ship cache.
- Subscribes to high-value bounding boxes including Tokyo Bay, Hormuz, Suez, Bab el-Mandeb, Panama, Malacca/Singapore, Taiwan Strait, Rotterdam/English Channel, US West Coast, and a global fallback.

Risk class: `medium/high`.

Promotion decision:

- Static ports/chokepoints may become fixture/source-ledger candidates.
- Live AIS behavior should not be promoted until API terms, key handling, and operational sensitivity are reviewed.
- Naval-base static intelligence needs provenance before any evidence claim.

Required promotion gates:

- AIS source terms and key handling.
- Static-data provenance.
- Clear separation between static reference data and live vessel observations.
- No global live subscription in MVP.

## 7. Scanner and OSINT/recon routes

### `src/app/api/scanner/route.ts`

Observed behavior:

- Proxies scanner requests to `SCANNER_URL` with `SCANNER_KEY`.
- Validates host with `src/lib/ssrf-guard.ts`.
- Rate-limits by client IP.
- Allows scan types: `quick`, `ssl`, `headers`, `rdns`, `subdomains`, `tech`, `whois`, `geoloc`, `vuln`.
- Explicitly removes deeper scan types from public access: `deep`, `ports`, `banner`, `traceroute`.

Risk class: `critical`.

Promotion decision:

- SCOPE-D only.
- Never an ungated Orion feature.
- Use as design input for policy gate requirements, not code to run.

Required promotion gates:

- EngagementPolicy.
- TargetScope.
- AuthorizationRef.
- ExecutionMode.
- ReceiptRequired.
- Non-destructive boundary.
- Negative fixtures for missing scope/authorization.

### `src/app/api/osint/sweep/route.ts`

Observed behavior:

- Accepts an IP and CIDR.
- Validates IPv4 and blocks private/reserved ranges.
- Rate-limits requester IP.
- Uses `ip-api.com` for geolocation.
- Builds every IP in a CIDR range from /24 to /32.
- Queries Shodan InternetDB for every generated host with concurrency 20.
- Classifies discovered devices by ports/CPE/tags.
- Assesses risk from vulnerabilities and exposed services.

Risk class: `critical`.

Promotion decision:

- SCOPE-D only.
- Do not run from Orion.
- Do not promote to product without explicit engagement authorization and legal/policy boundary.
- Useful as evidence of why the inherited recon surface must be quarantined.

Required promotion gates:

- Same as scanner route.
- Additional external-source terms for Shodan InternetDB and ip-api.
- Abuse/rate-limit model.
- No unauthenticated public sweep.

## 8. Stealth/evasion helper

### `src/lib/stealthFetch.ts`

Observed behavior:

- File header says it generates randomized HTTP headers to distribute API requests across spoofed residential IP addresses and browser fingerprints.
- Defines residential-looking IP pools and user-agent lists.
- Generates random user agents.
- `generateResidentialIP()` exists but the current `stealthHeaders()` return value only includes `User-Agent`, `Accept-Language`, and passed extra headers; it computes an IP but does not visibly include it in headers.
- Still, the semantics and comments are unacceptable for product-owned transparent collection.

Risk class: `critical`.

Promotion decision:

- Do not promote.
- Do not copy.
- Any future fetch utility must be transparent, terms-compliant, rate-limit-aware, and source-ledgered.

Required promotion gates:

- Replace with `transparentSourceFetch` or equivalent in Gaia.
- Declared user agent.
- Per-source rate limit controls.
- No spoofing/evasion language or behavior.

## 9. Not-found / still-uninspected

### `src/app/api/telegram-feed/route.ts`

Attempted path inspection returned not found. The README advertises a Telegram feed, so the route may live under another path or may be absent/stale.

Risk class: `unknown/high`.

Promotion decision:

- No promotion.
- Continue code search/file inventory later.

Still to inspect:

- Remaining `src/app/api/osint/**` routes.
- `src/app/api/news/**` and live-news routes.
- `src/app/api/gdelt/route.ts`.
- `src/app/api/infrastructure/route.ts`.
- `src/app/api/markets/route.ts`.
- Telemetry/analytics integration.
- Lockfile and lifecycle scripts.

## 10. Immediate extraction decisions

Promote conceptually, by reimplementation:

- Earthquake feed adapter.
- Fire/weather hazard adapter.
- Layer-aware fetch pattern.
- MapLibre operational canvas.
- Grouped layer rail.

Hold:

- CCTV.
- Aviation.
- Maritime/AIS.
- News/live streams.
- Sanctions/crypto/person/org lookup.

Quarantine/SCOPE-D only:

- Scanner route.
- Sweep route.
- Vulnerability scanning workflow.
- `stealthFetch`.
- Any code path requiring credentials or causing network activity against user-supplied targets.

## 11. Correct next migration move

The next product work should happen outside this repo.

Recommended target split:

1. Gaia: create transparent source-record and feed-adapter scaffolds for USGS/EONET/FIRMS-style sources.
2. Orion/OFIF: create map shell using OrionObservationEvent fixtures, not raw OSIRIS route data.
3. SCOPE-D: create issue for scanner/sweep quarantine and future EngagementPolicy gating.
4. Ontogenesis: defer vocabulary promotion until schema/event names settle.

This repo should receive only additional metadata if further inherited-code inspection is needed.
