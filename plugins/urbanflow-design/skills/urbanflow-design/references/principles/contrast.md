# Contrast table (pre-computed, WCAG 2.x)

Token names are Flow variables (`TextIcons/Secondary` etc.). Normal text 4.5:1 · large text (≥24px, or ≥18.66px at 700) 3:1 · UI boundaries and meaningful graphics 3:1. Ink percentages are #202020 blended over the background. For anything not listed, compute it — don't eyeball.

| Pair | Ratio | Verdict |
|---|---|---|
| emphasis #202020 on white | 16.3 | ✅ |
| text ink 80% on white / card #FDFDFA / light #F7F7F7 / medium #EFEFEF | 8.45 / 8.43 / 8.14 / 7.83 | ✅ |
| text-secondary ink 70% on white / light / medium | 6.01 / 5.87 / 5.64 | ✅ |
| **text-tertiary ink 50%** on white / light | **3.19 / 3.14** | ❌ normal text · ✅ large only — DS gap: units, section headings and meta are small → flag |
| placeholder ink 40% | 2.43 | ❌ — placeholders and the default icon colour only, never real text; meaningful icons fall below 3:1, so pair icon-only controls with a label/tooltip |
| disabled ink 30% | 1.90 | exempt, but disabled must differ by more than colour |
| white on primary `Background/Inverse` #1A1A1A | 17.4 | ✅ |
| white on primary-disabled #CCCCCC | 1.61 | exempt (disabled) |
| ink 80% on secondary cream #FDFDFA | 8.43 | ✅ |
| link / focus info-primary #005BD3 on white | 6.11 | ✅ (focus ring ✅ 3:1) |
| info-primary on background-info #E2E7FF | 4.98 | ✅ |
| success-light #29845A on white | 4.62 | ✅ (just) |
| success-light on background-success #CDFEE1 | 4.15 | ❌ normal text — use success-primary #136F45 |
| caution-light #FFBD14 on white | 1.67 | ❌ — fill/graphic only, with a dark icon |
| caution-primary #E6AA12 on white / on caution bg | 2.07 / 1.87 | ❌ text and ❌ 3:1 graphics — use caution-heavy #332E00 for text |
| critical-heavy #8E1F0B on white / on critical bg | 8.93 / 7.67 | ✅ |
| critical-primary #E51C00 on white; white on it | 4.67 | ✅ (just) |
| magic-primary #7126FF on white; white on it | 6.13 | ✅ |
| stroke default #E3E3DC on card / strong #D1D1CA on white | 1.27 / 1.53 | ❌ non-text 3:1 — DS gap on inputs, checkboxes, toggles; flag |

Small-size gaps: HelpText, UnderlineTab and Subheader render at 10px — below comfortable reading size; flag where they carry essential info.

Canvas and charts: misc colours and semantic primaries side by side aren't distinguishable for colour-blind users — pair with labels, direct annotation, patterns or icons. Delta indicators' green-down / red-up needs the arrow and sign as well.
