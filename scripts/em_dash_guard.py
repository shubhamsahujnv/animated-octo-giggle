"""Shared detection logic for the em dash guardrail.

Every banned character is written as an escape sequence so that this file,
and anything importing it, stays clean under its own scan.
"""

import re

# Characters that read as an em dash in rendered content.
BANNED_CHARS = {
    "\u2014": "EM DASH (U+2014)",
    "\u2015": "HORIZONTAL BAR (U+2015)",
    "\u2E3A": "TWO-EM DASH (U+2E3A)",
    "\u2E3B": "THREE-EM DASH (U+2E3B)",
    "\uFE58": "SMALL EM DASH (U+FE58)",
}

# Markup and escape spellings that render as an em dash.
BANNED_PATTERNS = [
    (re.compile(r"&mdash;", re.IGNORECASE), "HTML entity &mdash;"),
    (re.compile(r"&#8212;"), "HTML entity &#8212;"),
    (re.compile(r"&#x2014;", re.IGNORECASE), "HTML entity &#x2014;"),
    (re.compile(r"\\u2014", re.IGNORECASE), "escape sequence \\u2014"),
    (re.compile(r"\\x\{?2014\}?", re.IGNORECASE), "escape sequence \\x2014"),
    (re.compile(r"\\N\{EM DASH\}", re.IGNORECASE), "escape sequence \\N{EM DASH}"),
]

REPLACEMENT_ADVICE = (
    "Use a comma, a colon, parentheses, or two sentences instead. "
    "A hyphen (-) is fine for compounds and ranges."
)

# Paths excluded from the scan: the guardrail's own sources have to name the
# characters they ban.
EXEMPT_SUFFIXES = (
    "scripts/em_dash_guard.py",
    "scripts/check_em_dash.py",
    ".claude/hooks/block_em_dash.py",
    ".githooks/pre-commit",
)


def is_exempt(path):
    normalized = str(path).replace("\\", "/")
    return any(normalized.endswith(suffix) for suffix in EXEMPT_SUFFIXES)


def find_violations(text):
    """Return a list of (line_number, column, label, line_text) for text."""
    violations = []
    for lineno, line in enumerate(text.splitlines(), start=1):
        for char, label in BANNED_CHARS.items():
            start = 0
            while True:
                idx = line.find(char, start)
                if idx == -1:
                    break
                violations.append((lineno, idx + 1, label, line.strip()))
                start = idx + 1
        for pattern, label in BANNED_PATTERNS:
            for match in pattern.finditer(line):
                violations.append((lineno, match.start() + 1, label, line.strip()))
    violations.sort(key=lambda item: (item[0], item[1]))
    return violations


def format_violations(violations, origin, limit=20):
    lines = []
    for lineno, col, label, line_text in violations[:limit]:
        snippet = line_text if len(line_text) <= 120 else line_text[:117] + "..."
        lines.append(f"{origin}:{lineno}:{col}: {label} in: {snippet}")
    remaining = len(violations) - limit
    if remaining > 0:
        lines.append(f"... and {remaining} more")
    return "\n".join(lines)
