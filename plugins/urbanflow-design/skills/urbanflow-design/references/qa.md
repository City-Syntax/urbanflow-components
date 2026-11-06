# urbanflow and Flux design QA

Compare the actual interface with the approved design. Support both reporting findings and making requested local frontend fixes through the same design plugin.

## Choose the requested outcome

- **Review / compare / list issues:** inspect and report; do not edit code or Figma.
- **Fix / update this UI / close this gap:** implement the requested frontend fix locally using `references/frontend-workflow.md`, then show the designer the result and run appropriate checks.
- **Explore alternatives:** use `references/local-preview.md`; do not reclassify a routine QA correction as a design exploration.
- **Prepare a branch / PR:** use the six-step frontend checklist. A branch request alone is not authorization for a PR.
- **Hand findings to engineering:** use `references/qa/agent-issue-template.md` when an issue or coding-agent handoff is requested. This is an optional route, not a prerequisite for local fixes.

Use known product, repository, target branch, environment and design links from the conversation. Ask only for missing information that materially affects the task. Load `references/principles.md` for visual decisions and verify relevant current Flow definitions.

## Collect evidence before judging

Inspect the real screen at its actual viewport plus relevant narrow/short sizes. Use supported browser or computer-use tools, follow their current instructions, and record the route/build examined. Use existing authorized sample data when possible. Do not trigger paid, destructive or shared-backend operations merely to create a QA state.

Inspect the requested live Figma nodes through available metadata, screenshots, component and variable definitions. Follow the entrypoint's Figma skill prerequisites. Supplied screenshots or SVG exports can supplement this evidence; outlined SVG text cannot establish font properties, but it is still useful for layout. Do not block all QA on an export format when live Figma or other verified evidence is available.

Read the owning component, styles, shared registry/adapters and relevant tests where accessible. Distinguish an observed regression, a pre-existing problem, a design-system difference, a hypothesis and an unavailable state. Do not claim backend or product behavior from static screenshots.

## Compare and fix within scope

Check relevant layout, alignment, token spacing, sizes, typography, colors, strokes, icons, copy, units, states and interactions. Use current verified Flow values rather than enforcing every historical number in the bundled snapshot.

Classify each finding as:
- **In-scope frontend fix:** implement when fixes were requested, preserving approved behavior.
- **Engineering or product decision:** report the specific dependency or ambiguity; continue independent fixes. Do not silently invent API fields, change permissions or implement new backend behavior.
- **Needs design decision:** describe the mismatch and give a concrete recommendation.
- **Outside scope:** report separately; do not fold unrelated fixes into the branch without authorization.

Group related fixes into a reviewable patch rather than requiring a commit for every visual finding. Preserve local samples/explorations and exclude them from production handoff unless requested.

## Verify and report

For each requested fix, verify the actual result, including applicable short-window, long-text, list, focus and scrolling states. Apply the frontend checklist on the final isolated branch before a PR. Show the preview and change list; honor a request to review first.

Report findings in chat by section with expected behavior, observed evidence, impact, concrete fix and file/node reference where available. Mark each requested finding fixed and verified, awaiting review, blocked, outside scope or needing a decision. Give a verdict only for the inspected scope.

Create repo QA files or GitHub issues only when requested. Use a suitable feature branch instead of writing directly to main, and honor existing authorization without redundant confirmation. Send reviewer requests or messages only when authorized. Leave merging to the designer or engineer unless explicitly authorized.
