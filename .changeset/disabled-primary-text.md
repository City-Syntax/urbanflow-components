---
"@urbanflow/registry": patch
---

Button: a disabled primary button's label now uses `texticons-disabled` instead of white, so it's readable on the grey disabled background (it was about 1.15:1 contrast). Re-add `button` from the registry to pick it up; if you patched this locally (Flux adds `disabled:text-texticons-disabled`), you can drop the patch.
