# Review mode (reviewing existing annotations)

Every finding must be **locatable**, **short** and **come with a fix**.

## Format

```
**[File] — handoff review**
Sections: #1 Projects · #2 Model panel · #3 Analysis  ·  P1: 4 · P2: 7 · P3: 2

### #3 Analysis
[Energy results / Stale](https://www.figma.com/design/FILEKEY/?node-id=12-345)
- **3.1 · P1 · Missing** — No stale state after inputs change
  Fix: add STATES "Stale: Banner tone=caution 'Inputs changed since last run' + Run again"
- **3.2 · P2 · DS** — Card uses tinted fill + amber left border
  Note: "Highlight active card in yellow"
  Fix: "Card status='active' (amber ring only)"

### Fix first
3.1, 2.4, 1.2
```

## Rules
- Group by section, then frame. Frame name as a link: `https://www.figma.com/design/{fileKey}/?node-id={id with ":" → "-"}`.
- Number `[section].[n]` so Pei Ning can reply "fixed 3.1, 3.4".
- **P1** — eng/agent will build the wrong thing or get blocked (contradiction, missing state/flow/rule/data source) · **P2** — they'll have to ask (vague size, off-token value, missing icon name, unclear copy source) · **P3** — polish.
- Type tag: `Conflict` · `Missing` · `Vague` · `Copy` · `Data` · `DS` · `Asset` · `Scope` · `Agent` (would stall or mislead the coding agent) · `Slack decision not in Figma`.
- One line (under ~15 words) for the problem, then `Note:` (exact existing text, for Cmd+F) when it's about a note, and `Fix:` ready-to-paste wording.
- Unchanged sections since the last review in this conversation: `Unchanged — still open: 2.1, 2.3`.
- Skip what's fine; a clean section is one line: `#1 — no issues`.
- End with **Fix first** (3–5 P1 IDs) and a one-line offer to draft the missing cards.
- Table on request: `ID | Pri | Type | Frame (link) | Issue | Fix`.
