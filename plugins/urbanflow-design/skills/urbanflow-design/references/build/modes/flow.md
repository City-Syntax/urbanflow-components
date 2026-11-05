# Mode: Flow

- Left-to-right: every entry point → screens → every exit (primary action, Cancel, Close/X, Esc, Back, navigating away mid-run) and where the user lands.
- Start arrows at the exact control, tap target or event that triggers the transition, not at the generic frame edge. Label them with the trigger ("Click Run analysis", "Select Green Mark target", "Simulation fails").
- When the journey has mutually exclusive or optional paths, split it into explicit branches and let each branch remain readable on its own. Do not force floating/sidebar or similar choices into one linear chain.
- Running, stale, empty, error and success states as their own frames branching off the step they belong to. Long jobs: what happens if the user leaves and comes back.
- Unchanged steps use the live screens; new/changed frames get a 2px `info-primary` outline and a "NEW" / "CHANGED" Badge beside the frame (not inside it).
- Run the `references/handoff.md` readiness checklist (states, exits, entry points, persistence, data source) so nothing is missing.
- Rules you can't confirm (limits, what saves when, what triggers a re-run) go in an open-questions list, never on the canvas as fact.
