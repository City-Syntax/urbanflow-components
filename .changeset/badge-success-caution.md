---
"@urbanflow/registry": minor
---

Badge: added `type="success"` (green, for done or passed) and `type="caution"` (yellow, for warnings or needs attention), matching Figma Badge › Type. Text uses `success-primary` and `caution-heavy` so it stays readable on the light backgrounds; the `texticons-success-primary` / `texticons-caution-primary` tokens are too light for small text. Re-add `badge` from the registry; Flux can drop its local success/caution variants.
