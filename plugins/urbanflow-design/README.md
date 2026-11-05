# urbanflow Design plugin

Shared design instructions for Flux and urbanflow, packaged from the existing
urbanflow-design workspace skill. Includes all 106 original skill files: Flow
references, Figma workflows, handoff guidance, tokens, icons and logos.

This is a skills-only plugin. It does not add a runtime dependency to either
application, publish an npm package, or automatically connect anyone's accounts.

## Install the skill with skills.sh

After this change is merged to `main`, install the skill for local Codex:

```sh
npx skills add City-Syntax/urbanflow-components --skill urbanflow-design -a codex -g
```

The `-g` option makes the skill available across projects, including Flux and the
urbanflow monorepo. For Claude Code, replace `-a codex` with `-a claude-code`.
Omit `-g` to install only in the current project. Use Node.js 22.20 or newer.

The repository's `skills.sh.json` points the installer at this plugin's `skills/`
directory. It installs the main skill together with its reference files and
assets; do not upload the supporting Markdown files as separate skills.

Check discovery from a checkout before publishing:

```sh
npx skills add . --list
```

This installs a standalone skill into the selected coding agent. It does not
install the plugin into ChatGPT web or connect Figma. Choose either this route or
the plugin route below for a given local environment to avoid duplicate copies.

This repository is public. Installing or viewing the package does not grant
access to the linked Figma files or any private source repositories.

## Local desktop and Codex setup

With a current Codex CLI, add the repository checkout as a marketplace:

```sh
codex plugin marketplace add https://github.com/City-Syntax/urbanflow-components
codex plugin add urbanflow-design@urbanflow-plugins
codex plugin list --json
```

Use this after the plugin is merged to `main`. To test a local checkout, replace
the GitHub URL with its absolute path, quoted if it contains spaces. Installation
is user-level, so you can use it while working in either Flux or the monorepo.
Open a new conversation after installing and request urbanflow Design explicitly.

Alternatively, open the repository as a project in the desktop app. In Plugins,
select the **urbanflow plugins** marketplace and install **urbanflow Design**.
If the local source is not displayed, refresh or reopen the Plugins page.

Workspace installation and installation on local machines are separate.

## ChatGPT workspace rollout

A workspace admin completes this after the plugin is merged:

1. Open **Admin > Plugins > Add > Import marketplace**.
2. Enter `https://github.com/City-Syntax/urbanflow-components`. Leave Path empty.
3. Select the release branch, normally `main`, and authorize repository access.
4. Review import results. Make the plugin available to all intended members, or
   choose **Installed for workspace** to install it by default.
5. Verify that members can use plugins and the required Figma app. Test from a
   normal member account, not only the owner's account.

Workspace marketplace imports support private GitHub repositories. A shared
GitHub repository is the maintained source; local and workspace clients still
have their own installation and update controls.

## Required tools and source access

Install/connect the official Figma plugin separately on each supported surface.
The skill relies on the Figma plugin's current workflow skills and tools. If a
local environment lacks a required capability, the agent must explain that
limitation and use a supported environment; this package does not recreate Figma
tools. Connect GitHub separately when reading or changing source code.

Each person needs their own authorized access to relevant Figma files and source
repositories. No credentials or shared-account authorization are included.

Plugins are supported in ChatGPT and local Codex desktop/CLI, subject to workspace
policy and client version. The Codex IDE extension currently needs the underlying
standalone skill installed separately. Do not enable duplicate standalone and
plugin copies of the same skill in one environment.

## Try it

- “Use urbanflow Design to review this Figma screen against Flow. Report findings
  without changing the file: [Figma link].”
- “Use urbanflow Design to create this Flux flow using Flow components in this
  destination: [Figma link].”
- “Use urbanflow Design to compare this implementation with its Figma design.”

Confirm that the agent loads `urbanflow-design`, can read its reference files,
and can inspect the intended Figma file. Test live write workflows only in a
disposable Figma frame or other explicitly requested destination.

## Maintenance and validation

The uploaded skill content is unchanged. `source-snapshot.json` records its file
hashes. Its dated design snapshots are not a claim about today's live design
system. Follow current repository instructions and verify live Figma definitions;
in particular, the components repo's AGENTS.md restricts legacy Platform usage to
the documented AI Refresh exception. For implementation work, read the current
[DESIGN.md](../../DESIGN.md) and https://components.urbanflow.co/llms.txt. These
remain the maintained design-language and generated component/token sources;
bundled references are dated guidance rather than a second live registry.

Edit the maintained skill under `skills/urbanflow-design/` when changes are
approved, bump both plugin manifest versions, and update the snapshot record when
deliberately replacing the source snapshot. The original workspace skill remains
a separate copy; edits do not automatically flow in either direction.

From the repository root:

```sh
python3 scripts/validate-design-plugin.py
npm run check
```

Package validation checks manifest agreement, marketplace resolution, bundled
paths, skill metadata and source completeness. It is not an end-to-end Figma or
workspace installation test.

## References

- [Plugin packaging](https://developers.openai.com/plugins/build/plugins)
- [Workspace import and sync](https://learn.chatgpt.com/docs/enterprise/plugin-management)
- [Codex plugin commands](https://learn.chatgpt.com/docs/cli/reference)
- [Supported plugin surfaces](https://learn.chatgpt.com/docs/plugins)
- [skills.sh installation](https://github.com/vercel-labs/skills/blob/main/docs/commands.md)
