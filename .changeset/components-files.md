---
"@urbanflow/registry": minor
---

Components from the Flow ↪ Files page:

- **File Row** (`file-row`): `name`, `type`, `category`, `size`, `owner`, `date`, `actions` (shown on hover instead of the date), `selected`.
- **File Category** (`file-category`): `value` / `onValueChange` (null = Uncategorized), `options`, `tones` per category (info / caution / magic / success). Also exports `CategoryTag`.
- **File Actions** (`file-actions`): `items` (`{ label, icon, onSelect }`), `label`; caret flips while open.
- **Select Floor Plan** (`select-floor-plan`): `kind` upload / existing, `title`, `meta`.
