# OSIRIS Source Ledger

Status: scaffold
Repo: `mdheller/osiris`
Related: `docs/osiris-import-audit.md`

## 1. Purpose

This ledger separates OSIRIS code reuse from external-source reuse. MIT licensing of the repository code does not settle permissions, attribution, commercial use, rate limits, reliability, or evidence grade for the live feeds and datasets referenced by the app.

Every source family must be explicitly classified before promotion into Gaia/Orion.

## 2. Ledger fields

Each source entry should eventually record:

- Source name.
- Source family.
- Route or feature using it.
- Upstream URL/API family.
- License or terms status.
- Attribution requirement.
- Commercial-use posture.
- API key/rate-limit requirement.
- Data freshness behavior.
- Canonicalization/hash plan.
- Gaia evidence grade.
- Orion policy state.
- Risk class.
- Promotion decision.

## 3. Risk classes

| Risk class | Meaning | Default handling |
|---|---|---|
| `low` | Public feed with stable terms and low privacy/action risk | Eligible for early adapter conversion. |
| `medium` | Terms, rate limits, attribution, or reliability need review | Fixture mode first; live mode after ledger completion. |
| `high` | Legal, privacy, action, or engagement-policy risk | Disabled/gated until reviewed. |
| `unknown` | Implementation/source unclear | No promotion. |

## 4. Source entries

| Source | Route/feature | Source family | License/terms status | Key/rate limit | Evidence grade | Risk | Initial decision |
|---|---|---|---|---|---|---|---|
| OpenSky Network | `/api/flights` | Aviation | Unknown; review required | OAuth/client credentials referenced | Public-source, unverified until wrapped | medium | Hold live; fixture candidate only. |
| Static Naval Intel | `/api/maritime` | Maritime/static intelligence | Unknown; source provenance required | Unknown | Static-source, unverified | medium | Hold until concrete source/path inspected. |
| TfL / WSDOT / Caltrans / NYC DOT / VicRoads | `/api/cctv` | CCTV/camera feeds | Mixed/unknown; jurisdiction-specific review required | Unknown | Public-source, visual, unverified | high | Hold live; no promotion without terms review. |
| USGS Earthquake API | `/api/earthquakes` | Seismic | Review required but likely early-safe public API | Likely keyless | Public-source event; good early GaiaSourceRecord candidate | low | First adapter candidate. |
| NASA FIRMS | `/api/fires` | Fire/hotspot | Review required; API key optional/available | FIRMS key referenced | Public-source event; good early candidate | medium | Early candidate after source terms line. |
| RSS/global broadcasters | `/api/news` | News/live streams | Mixed; attribution and stream terms required | Mixed | Public-source, journalistic, unverified | medium/high | Fixture or link-only until reviewed. |
| NASA EONET | `/api/weather` | Weather/natural events | Review required | Likely keyless | Public-source event; good early candidate | low/medium | Early adapter candidate. |
| NOAA SWPC | `/api/satellites` or space/weather | Space weather | Review required | Unknown | Public-source event | medium | Hold until route inspected. |
| N2YO | `/api/satellites` | Satellite tracking | Terms/API key required | N2YO key referenced | Public-source, derived tracking | medium | Hold live until terms/key posture recorded. |
| NVD | `/api/osint/*`, cyber/CVE | Vulnerability data | Review required; public CVE data | Likely keyless/rate-limited | Public-source vulnerability enrichment | low/medium | Early passive enrichment candidate. |
| GDACS | `/api/gdelt` or disasters | Disaster alerts | Review required | Unknown | Public-source event | medium | Hold until implementation inspected. |
| EONET | `/api/weather` | Natural events | Review required | Likely keyless | Public-source event | low/medium | Early candidate with GaiaSourceRecord. |
| blockstream.info | crypto lookup | BTC chain lookup | Review required | Keyless referenced | Public ledger read-only; not identity proof | medium | Hold beyond fixture mode. |
| Blockscout | crypto lookup | ETH chain lookup | Review required | Keyless referenced | Public ledger read-only; not identity proof | medium | Hold beyond fixture mode. |
| OpenSanctions | sanctions lookup | Sanctions dataset | README declares CC-BY 4.0 | Keyless/cached referenced | Public-source sanctions match; attribution required | medium | Allow fixture; live after attribution/version handling. |
| Telegram public previews | `/api/telegram-feed` | Public-channel posts/geoparsing | Terms-sensitive; unauthenticated scraping posture | No token referenced | Public-source, unverified, geoparsed | high | Hold live; fixture-only until reviewed. |
| Static conflict zones | conflict monitoring | Static OSINT/intelligence | Unknown provenance | None | Static curated assertion | medium/high | Hold as demo fixture only until provenance recorded. |
| Scanner backend | `/api/scanner`, recon toolkit | Active recon/scanning | Not a data source; action system | `SCANNER_URL`, `SCANNER_KEY` | Not evidence by itself; action receipt required | high | Disabled/gated by SCOPE-D policy. |

## 5. Evidence-grade vocabulary draft

Use these provisional grades until Ontogenesis stabilizes vocabulary:

- `fixture.synthetic`: synthetic demo data; safe for product demonstration only.
- `public_source.unverified`: data fetched from a public source but not independently corroborated.
- `public_source.versioned`: public source with recorded fetch time, URL/API, canonical hash, and source version where available.
- `public_source.attributed`: public source with recorded attribution obligations satisfied.
- `operator_report.unverified`: human/operator input requiring review.
- `fused.inferred`: derived object combining multiple records; must link to source records.
- `policy_gated.action`: not a source; execution or enrichment action requiring authorization.

## 6. Promotion checklist

A source can move from fixture-only to live-feed mode only when:

- Terms/license status is recorded.
- Attribution requirement is recorded.
- API key/rate-limit behavior is recorded.
- GaiaSourceRecord mapping exists.
- OrionObservationEvent mapping exists where applicable.
- Policy state is defined.
- Confidence/evidence grade is visible in the operator UI.
- A replay or fixture can reproduce at least one representative record.

## 7. Immediate priorities

1. Complete USGS earthquake source entry.
2. Complete NASA/EONET weather/natural-events source entry.
3. Complete NASA FIRMS fire source entry.
4. Complete NVD CVE source entry.
5. Leave scanner, Telegram, CCTV, crypto, sanctions, aviation, and maritime in hold state until implementation and terms are reviewed.
