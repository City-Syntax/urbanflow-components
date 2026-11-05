"""Validate the portable urbanflow plugin and its preserved source snapshot."""

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PLUGIN = ROOT / "plugins/urbanflow-design"


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def contained_path(root, relative):
    assert relative.startswith("./"), f"Expected relative path: {relative}"
    path = (root / relative).resolve()
    assert path.is_relative_to(root.resolve()), f"Path escapes root: {relative}"
    assert path.exists(), f"Missing path: {relative}"
    return path


def main():
    portable = read_json(PLUGIN / "plugin.json")
    compatibility = read_json(PLUGIN / ".codex-plugin/plugin.json")
    assert portable["$schema"] == "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json"
    for field in ("name", "version", "description", "author"):
        assert portable[field] == compatibility[field], f"Manifest mismatch: {field}"
    interface = portable["extensions"]["com.openai"]["interface"]
    assert interface == compatibility["interface"], "Presentation metadata differs"
    for field in ("composerIcon", "logo"):
        assert contained_path(PLUGIN, interface[field]).is_file()
    assert contained_path(PLUGIN, compatibility["skills"]) == PLUGIN / "skills"

    marketplace = read_json(ROOT / ".agents/plugins/marketplace.json")
    entries = [p for p in marketplace["plugins"] if p["name"] == portable["name"]]
    assert len(entries) == 1, "Expected one plugin entry"
    assert entries[0]["source"]["source"] == "local"
    assert contained_path(ROOT, entries[0]["source"]["path"]) == PLUGIN
    assert entries[0]["policy"]["installation"] == "AVAILABLE"

    discovery = read_json(ROOT / "skills.sh.json")
    containers = [contained_path(ROOT, path) for path in discovery["paths"]]
    assert PLUGIN / "skills" in containers, "skills.sh cannot discover the plugin skills"

    skill = PLUGIN / "skills/urbanflow-design"
    text = (skill / "SKILL.md").read_text(encoding="utf-8")
    assert text.startswith("---\n")
    frontmatter = text.split("---", 2)[1]
    assert "name: urbanflow-design" in frontmatter
    assert "description:" in frontmatter
    snapshot = read_json(PLUGIN / "source-snapshot.json")["files"]
    actual = {}
    for path in sorted(skill.rglob("*")):
        assert not path.is_symlink(), f"Unexpected symlink: {path}"
        if path.is_file():
            actual[path.relative_to(skill).as_posix()] = hashlib.sha256(path.read_bytes()).hexdigest()
    assert actual == snapshot, "Bundled skill differs from approved source snapshot"
    for required in ("references/how-pei-ning-works.md", "references/principles.md",
                     "references/build.md", "references/audit.md", "references/handoff.md",
                     "references/qa.md", "agents/openai.yaml"):
        assert (skill / required).is_file(), f"Missing reference: {required}"
    print(f"Plugin manifests and marketplace valid; {len(actual)} source files verified.")


if __name__ == "__main__":
    main()
