---
"@urbanflow/registry": minor
---

Charts now match Flux in the places the first port missed, so Flux can switch to them.

- **Image export.** `chartImage(spec, { muted })`, exported from `chart`, draws any chart off screen and returns a PNG data URL (800 × 400, pixel ratio 2, 13 px text by default). `muted: true` gives the quieter report palette.
- **Type and stroke everywhere.** Tooltips, wind-rose compass labels and axis borders now use the Flow chart font, text colour and stroke. Before this they fell back to Chart.js's Helvetica 12 px and a grey border.
- **Readable data tables.** Numbers in a chart's View data table show at most three decimals, grouped like the axis labels (25.364, not 25.363709677419354).
- **`cn()`** keeps a chart text style (`text-chart-title`) and a text colour on the same element.

Re-run `npx shadcn add` for `chart` and `utils` to take these. Nothing is renamed.
