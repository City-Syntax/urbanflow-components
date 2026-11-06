# Frontend implementation and handoff

Use for frontend implementation, local QA fixes, branch preparation, pushes and PR requests in Flux or urbanflow. This is the code-check workflow inside the existing design plugin, not another plugin.

Start from the actual repository instructions and scripts. Resolve repository locations, ports, dependencies, branch conventions and reviewers from current evidence rather than hardcoded operator paths. The monorepo normally targets `develop`; the components repository targets `main`. Verify the remote target each time. Use its name in the checklist below wherever `develop` appears; do not create a missing develop branch or silently change a PR target.

For exploration-only work, also read `references/local-preview.md`. For implementation-vs-design comparison, read `references/qa.md`. Follow current Figma integration skills when inspecting a Figma design.

## Frontend branch checklist

Complete this checklist before creating a frontend PR. Record failed, blocked, unavailable or intentionally inapplicable checks honestly; a skipped check is not a pass. Use the checks appropriate to the change, rather than adding tests that only mirror CSS or implementation details.

1. **Confirm the scope**
   - Identify the requested UI changes.
   - Explicitly exclude unrelated edits, preview tools, sample data, and design explorations unless requested.
2. **Check the starting point**
   - Read the repository instructions.
   - Check the current branch and uncommitted changes.
   - Verify the latest remote `develop`.
   - Preserve existing work; never discard or overwrite it.
3. **Prepare an isolated branch**
   - Include only the intended feature and its necessary tests/documentation.
   - Preserve newer upstream changes when resolving overlaps.
   - Review the complete diff against `develop`.
4. **Validate the exact branch**
   - Run type checks, relevant tests, lint, formatting, and the frontend build.
   - Include shared-component consumers when the change affects multiple screens.
   - Clearly report any checks that could not run.
5. **Check the actual UI**
   - Compare against the approved design.
   - Test narrow panels, short windows, long text, empty states, and large lists.
   - Verify scrolling, resizing, keyboard navigation, focus, and visible controls.
   - Check for clipping, unwanted overflow, layout shifts, and browser errors.
   - For scrollbars, verify edge spacing, dragging, click-through behavior, and content shrinking.
   - Capture screenshots when they help assess the change.
6. **Review and hand off**
   - Confirm unrelated files and secrets are excluded.
   - Summarize changes, validation results, and remaining limitations.
   - Create a PR only when requested, request the named reviewer, and run branch CI.
   - Leave merging to the user or engineer unless explicitly authorized.

## Make the checks concrete

**Scope and branch.** Inspect status and the base-to-head diff, including committed history. Starting on an earlier QA branch can carry unrelated commits even when newly staged files look clean. Preserve uncommitted work without resetting, deleting or silently stashing it. Use a suitable existing checkout or the environment's supported isolation mechanism when needed.

**Shared UI.** Reuse current Flow components, tokens and registry items. Check component provenance/version and relevant adapters before changing copies. If the fix belongs in the shared registry, identify that source and preserve intentional consumer overrides. Do not silently change Figma, publish packages, or update other product repos merely because one app needs a fix.

**Code validation.** Discover the current type-check, test, lint, format and build commands. Use scoped checks with a stated time budget; expand only when the change or failures justify it. Test observable regressions, such as resize/observer support, native refs/events, focus, data preservation or interactions, when relevant. A shared component change needs coverage of the affected consumers, not just its own unit tests.

**Exact branch.** Run validation after isolating the production diff and incorporating upstream changes. If evidence came from a mixed local checkout, an earlier SHA, a stale preview build or an exploration-only app, say so. Do not claim the final branch was validated from that evidence. Validate an isolated final tree when possible and use CI for checks that cannot run locally.

**Browser evidence.** Run the actual implementation or an appropriate production-built harness, rather than relying only on compilation or screenshots. Verify the requested interaction and relevant states. Test wheel/drag/keyboard and touch when applicable and supported; do not claim an input mode was tested if it was not. For overlays, check both visible thumbs and transparent hit areas. Test content growth and shrinkage after scrolling and preserve native constraints, truncation and virtualization.

**Preview review.** Give the designer a working preview URL or verified screenshots and a short list of changes. Use the current build; explain when the server serves a static build requiring a rebuild. Where the designer asks to see the change first, wait for their response before a PR or promotion of an unselected exploration. An already authorized PR request does not require another generic confirmation.

**PR and CI.** Recheck the remote base and final head. Use the repository PR template, report test commands/results and meaningful limitations, and include the reviewable diff or preview link. Resolve the named reviewer's GitHub account from evidence. Trigger branch CI using the repository's supported mechanism when authorized as part of PR handoff; some repos require an on-demand command. Inspect the result or explicitly mark it pending. Do not equate a reminder, deployment check or no conflicts with passing CI or engineering approval.

## Handoff output

State the branch/PR and preview links where available, the selected production changes, excluded local tooling, validation results and the SHA/tree they cover, remaining checks or decisions, and reviewer status. Never say a PR, reviewer request, CI run, merge or deployment happened without verifying it.
