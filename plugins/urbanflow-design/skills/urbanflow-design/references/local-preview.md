# Local designer preview

Use when the designer asks to test flows repeatedly, retain sample content after reloads, or compare local frontend design variations. Build this inside the requested application's development setup; the plugin supplies instructions, not a global application runtime.

Read `references/frontend-workflow.md` for repository discovery, preservation of local work and branch isolation.

## Preview controls

- Discover the current local app and port. Reuse existing preview infrastructure before adding another toolbar or server.
- Provide a small labelled local-preview panel with navigation to the requested flows and a selected sample/scenario where useful.
- Add a **Design exploration** selector for actual alternatives. Keep **None** or the current approved implementation as the default; give alternatives meaningful names. A normal styling update or QA fix updates the current implementation rather than creating an exploration automatically.
- Keep flow navigation, sample scenarios and design alternatives as separate controls. Changing a flow should not silently select an alternative or reset saved samples.
- Use appropriate development guards, routes or a dedicated local-only module so the panel and exploration imports are absent from production bundles. Verify the project's real build mechanism instead of assuming a particular environment flag works.

## Repeatable samples

- Seed only when no local sample state exists. Preserve designer edits across hot reloads, full reloads and server restarts using the app's local store, browser persistence or suitable fixtures.
- Provide an explicit **Restore samples** action; do not reset on every render, navigation or code update. Keep the selected flow/scenario where possible.
- Namespace and version persisted sample data by app/project to avoid replacing real state or colliding between Flux and urbanflow.
- Label fixtures as samples, use generic project names and keep them separate from live project data. Do not write synthetic proposals, users, results or records to a shared backend without authorization.
- Represent only the states needed for the requested testing, such as draft, in review, ready to merge and empty/error cases. Do not invent business rules or present fixture numbers as real simulation results.

## Review and promotion

Give the designer a usable preview link and explain which flow, sample and exploration are selected. Check that navigation works, sample edits survive a reload and restore works deliberately. Test the development-only boundary in a production build when adding or changing preview infrastructure.

After the designer selects an alternative or explicitly requests production implementation, carry only the selected behavior into the production patch. Reuse shared code where appropriate without importing the preview toolbar, sample persistence, fixture records, unselected variants or exploration routes. Preserve the local preview work separately for further design testing.

An exploration request does not authorize a PR. Use the frontend checklist and the user's existing authorization for the selected production change.
