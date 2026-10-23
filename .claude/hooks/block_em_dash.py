#!/usr/bin/env python3
"""PreToolUse hook: refuse any tool call that would write an em dash.

Reads the hook payload on stdin and prints a permission decision on stdout.
Covers Write, Edit, MultiEdit, NotebookEdit and Bash (heredocs, echo, sed).
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "scripts"))

from em_dash_guard import (  # noqa: E402
    REPLACEMENT_ADVICE,
    find_violations,
    format_violations,
    is_exempt,
)

# Tool input fields that carry content on its way into a file or a command.
WRITING_FIELDS = (
    "content",
    "new_string",
    "new_source",
    "command",
    "prompt",
)


def collect_candidates(tool_input):
    """Yield (origin_label, text) for every field worth scanning."""
    for field in WRITING_FIELDS:
        value = tool_input.get(field)
        if isinstance(value, str) and value:
            yield field, value

    # MultiEdit and similar batch shapes nest their payload in a list.
    for field in ("edits", "replacements"):
        entries = tool_input.get(field)
        if not isinstance(entries, list):
            continue
        for index, entry in enumerate(entries):
            if not isinstance(entry, dict):
                continue
            for inner in ("new_string", "new_str", "content"):
                value = entry.get(inner)
                if isinstance(value, str) and value:
                    yield f"{field}[{index}].{inner}", value


def allow():
    print(json.dumps({}))
    return 0


def main():
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return allow()

    tool_input = payload.get("tool_input") or {}
    if not isinstance(tool_input, dict):
        return allow()

    file_path = tool_input.get("file_path") or tool_input.get("notebook_path") or ""
    if file_path and is_exempt(file_path):
        return allow()

    findings = []
    for origin, text in collect_candidates(tool_input):
        violations = find_violations(text)
        if violations:
            findings.append(format_violations(violations, origin))

    if not findings:
        return allow()

    detail = "\n".join(findings)
    reason = (
        "Blocked by the em dash guardrail: this content contains an em dash "
        f"or an em dash spelling.\n{detail}\n{REPLACEMENT_ADVICE}"
    )
    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": reason,
                },
                "systemMessage": "Em dash guardrail blocked this write.",
            }
        )
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
