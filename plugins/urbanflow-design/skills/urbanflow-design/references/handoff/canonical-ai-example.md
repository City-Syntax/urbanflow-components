# Canonical AI handoff example

Use the finalized AI section on the **right** of the Platform AI page as the reference for how future
Urbanflow design handoffs should look. Ignore the older AI exploration on the left.

- File: Platform `CyjMpmGxUHezAqjmA5qXwI`
- Page: AI `4939:130753`
- Verified scope: the right-side flows for conversation/context, sources, Thinking, Chain of reasoning,
  model and effort selection, attachments/context limits, and chat management.
- Conflict policy: this live finalized example supersedes older bundled flow-layout guidance.

## Flow tree grammar

1. Use one dark Flow `Annotation Title` for the main flow.
2. Use Light `Annotation Title` instances for numbered subflows and for each leaf action/state.
3. Align the left edge of parent, child and leaf titles to the same x-position. Do not indent children.
4. Stretch each parent title so its right edge matches the right edge of its rightmost child title.
5. Arrange the screens in a subflow horizontally from left to right. Stack sibling subflows vertically.
6. Use hierarchy numbering such as `1`, `1.1`, `1.2`; number leaf actions/states sequentially in the
   order a reader should follow them.
7. Name frames and titles so state and action are explicit, for example `Running collapsed`,
   `User expands Thinking`, `Retry succeeds`, or `File too large or not supported`.

The verified example uses parent widths that span an exact number of screen columns. For example, a
two-screen parent spans two screen titles and a four-screen parent spans four. Preserve that relational
rule rather than copying a raw width.

## Connectors and transitions

- Add a yellow FigJam connector only for an explicit user action: click, tap, selection, send, retry,
  save, delete confirmation, expand or collapse.
- Do not connect automatic changes such as upload progress, completion, generated results or error
  arrival. Show those as clearly titled states; move to a new vertical row when they form a new branch.
- Start an interaction connector from the exact control that triggers it. Surround the tap target with
  a no-fill yellow rectangle using a 3px stroke and 8px corner radius.
- Use the Flow yellow connector colour, a 3px connector stroke and an arrowhead. Name the connector
  by feature and action so it remains understandable in the Layers panel.
- Connector labels are optional. Add a concise condition such as `On hover` or `If there is an error`
  only when it clarifies the transition.

## Annotation content

- Use genuine Flow Design System `Annotation Title` and `Annotation note` instances.
- Put requirements, logic, overflow behaviour, persistence and exceptional rules below the screen they
  explain. Keep every note independent and movable; do not frame annotation notes together.
- Consolidate requirements about one subject into one note. Do not repeat routine padding, typography,
  colour or sizing that can be inspected directly in Figma.
- Keep titles undated and write in the design owner's voice. Do not use agent attribution.
- Show visual component states as screens or specimens. Use notes for behaviour that is not visually
  deducible.

## Component and specimen placement

- Keep unapproved product components local and label their specimen board clearly, for example
  `Local components · … (not in Flow)`.
- Place each local component board next to the flows that use it, rather than in an unrelated component
  area far from the relevant screens.
- Reuse Flow components and variables inside local AI components wherever available. Promotion to Flow
  requires explicit approval.

## Verified branch patterns

- **Thinking:** running and complete subflows, each with expanded/collapsed actions.
- **Chain of reasoning:** running, complete and error branches, including details, retrying, retry success
  and retry failure.
- **Model and effort:** separate numbered subflows for opening a menu and selecting a value.
- **Attachments:** add/upload/attached/sent sequence plus a separate upload-error branch.
- **Chats:** separate rename and delete subflows, with hover/action-list/modal/result states.
- **Sources:** inline citation followed by an explicit `Open in …` action and destination state.

Use these branches as completeness prompts, not as mandatory states for unrelated features.
