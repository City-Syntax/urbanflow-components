# Mode: Interaction exploration

- 2–3 options side by side on the same starting screen, each titled with its idea.
- Each option lists: trigger, duration (ms), easing, what moves, and a reduced-motion fallback.
- Stay inside the DS motion rules: 80–180ms, `cubic-bezier(0.2,0,0,1)`, colour/shadow changes; movement only for overlays, panels and canvas camera. No bounce, no scale on press.
- Long-running states (simulation, render) may use progress motion; it must show real progress when known.
- Best compared in the HTML prototype with a replay button per option; in Figma, use Smart Animate between state frames.
- Note which option you'd pick and why in one line.
