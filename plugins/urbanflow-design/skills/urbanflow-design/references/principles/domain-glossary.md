# Domain glossary (proposed by Claude 1 Oct 2026 — pending Pei Ning's sign-off)

Use these terms, casing and units. Domain nouns are capitalised as proper terms in the product (Archetype, Space Use, Site EUI, GFA, CFA, Plot Ratio, Energy Flow Parameters, Cost Flow Parameters, Project Metrics). If a live screen uses a different label, the live screen wins — note the difference.

## Preferred terms (use → not)

| Use | Not | Why |
|---|---|---|
| Proposal | scheme, option, variant, branch | Matches the product's PR model and ProposalBadge |
| Baseline | base case, original, as-is | One word for the reference a proposal is compared to (existing building in retrofit) |
| main | master, trunk | The merged state proposals branch from ("Behind main") |
| Run | simulation job, calculation | The action and its result card ("Run analysis", "Ran 14 Apr 25") |
| Measured | actual, real | Data from bills, meters or BMS |
| Simulated | predicted, modelled, calculated | Output of a run |
| Calibrated | validated, matched, tuned | Only when fit thresholds are met |
| Measure | ECM, intervention, upgrade | Single retrofit action; "energy conservation measure" spelled out once in help text |
| Package | bundle, scenario | A set of measures applied together |
| Space Use | programme, usage, function | Product term |
| Floor group | floor set, typical floors | Product term |
| Edge | boundary line, side | Parcel/site boundary segment |
| Credits | tokens, points | What a run costs in the top bar |
| Delete | remove (for permanent), trash | "Remove" only when the object still exists elsewhere |

## Terms

| Term | Meaning | Unit / format |
|---|---|---|
| Project → Building → Floor → Zone | Model hierarchy shown in the tree | — |
| Floor group | Set of floors edited together ("Untitled floor group") | — |
| Archetype | Building-type template supplying default parameters | — |
| Space Use | Use assigned to a floor/zone (office, retail…) | — |
| Assembly | Construction build-up: facade, roof, slab, partition, ground wall, ground slab, external floor | — |
| Massing | Simplified 3D building volumes | — |
| GFA / CFA | Gross / constructed floor area | m², large values "55.7k m²" |
| Plot Ratio | GFA ÷ site area | "0.6 GFA/Site Area", 1–2 dp |
| Site EUI | Energy use intensity | kWh/m²/yr, 0 dp |
| Energy / Cost Flow Parameters | Simulation input groups | — |
| Embodied carbon · Operational carbon | Carbon in materials/construction · from energy use | kgCO₂e/m² (tCO₂e for totals) |
| Wall to window ratio | Glazing ratio | %, 0 dp |
| Solar exposure (Solarflow) · Wind comfort | Environmental analyses | kWh/m² · comfort class |
| EPW / Weather file | Climate data a run uses | file name + location |
| HVAC | Heating, ventilation and air-conditioning system (Flux mode) | COP, kW, kWh |
| Utility bills · BMS data | Measured energy sources (monthly · interval) | kWh, period |
| NMBE · CV(RMSE) | Calibration fit statistics (ASHRAE Guideline 14) | %, 1 dp |
| Saving | Reduction vs baseline | kWh/yr and %, S$/yr |
| Capex | Up-front cost of a measure | S$, ranges as "S$120k–180k" |
| Payback | Capex ÷ annual cost saving | yrs, 1 dp |
| Parcel / Edge | Site boundary and its segments: front / side / rear / corner / adjacency / special / unclassified | — |
| Setback | Required distance from an edge | m, 1 dp |
| Green Mark | BCA Singapore sustainability rating (confirm current tiers before using names) | tier |
| URA · HDB · BCA · RLB · OSM | Planning authority · public housing board · building authority (Green Mark) · cost benchmarks (S$/m²) · OpenStreetMap context | — |
| Retrofit · Calibration · Recommendation | Existing-building flow: match model to measured data, then suggest measures | — |
| Proposal statuses | Draft · Behind main · In review · Changes suggested · Ready for merge · Merged · Closed | ProposalBadge |

## Number format
Value in semibold ink + unit in tertiary grey; thousands abbreviated with lowercase k (millions with M); S$ for currency; one decimal rule per metric (above); percentages with a space ("12.6 %") to match the live app; dates "14 Apr 25", times 24h "03:52"; never more precision than the input data supports.
