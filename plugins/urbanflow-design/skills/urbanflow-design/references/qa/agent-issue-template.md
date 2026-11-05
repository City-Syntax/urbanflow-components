# GitHub issue template — design QA for the coding agent

```markdown
# Design QA: <Module> — <date>

**Repo:** <owner/repo> · **Base branch:** main · **Environment checked:** <URL or build>
**QA files:** `design-qa/<module>/` (one current screenshot + one expected SVG per section)
**Design tokens:** `<path to theme css>` (e.g. `libs/urbanflow-components/src/tailwind.css` or `packages/theme/theme.css`)
**Components:** `<path to components>`

## How to work this issue
1. Work the sections below **in order**.
2. Make **one commit per finding**, message `design-qa(<module>): <N.x> <short description>`.
3. **Skip** anything under "ENG EFFORT REQUIRED" — a human will handle those.
4. Only change what's listed. If you notice other problems, **flag them in your final comment; don't fix them.**
5. If something is ambiguous or you can't match the expected value with existing tokens/components, write **"Needs decision: <what and why>"** in your final comment and move on. Do not stop.
6. When done, open one PR and comment on this issue with a checklist: each finding marked ✅ fixed · ⏭ skipped (ENG EFFORT) · ❓ needs decision · 🚩 flagged (outside scope).

## 1. <Section name>
Expected: `design-qa/<module>/1. <Section> - expected UI QA notes.svg` · Current: `…/1. <Section> - live app current image.png`
- [ ] **1.1** <element> — expected: <value, token> · current: <value> · file: `<path>` (if known)
- [ ] **1.2** Copy — expected "<exact text>" · current "<text>"

## 2. <Section name>
…

## ENG EFFORT REQUIRED (skip — for Ryan)
- <finding> — why it needs logic/data work

## Needs decision (known before starting)
- <question> — owner
```

Writing tips
- Expected values as token + value: `TextIcons/Secondary (ink 70%)`, `font-size 14 / label/small`, `gap 8 (spacing/8)`. If the code uses different token names, give the code token too.
- Copy in quotes, exactly, including casing and units.
- One finding = one checkbox = one commit.
- Never include client names or data from the environment in screenshots or text; crop or blur if needed.
