---
"@urbanflow/registry": minor
---

`AIPromptInputSelect` handles long option lists. The dropdown now scrolls inside the space on screen, up to 24rem tall. From eight options it opens on a search field that is focused straight away and matches each option's label, description and value, so typing a provider such as `anthropic` finds its models. Arrow keys and Enter pick, the current option keeps its check mark, and an empty search says "No matches". Lists under eight options look and work as before. Set `searchAt` to change the threshold, or `searchAt={Infinity}` to turn search off. Reinstall `ai-prompt-input` (item version 1.2.0) to get it; no other change is needed.
