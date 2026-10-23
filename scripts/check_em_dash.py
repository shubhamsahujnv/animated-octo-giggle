#!/usr/bin/env python3
"""Scan files for em dashes.

  python3 scripts/check_em_dash.py              # every tracked file
  python3 scripts/check_em_dash.py --staged     # staged content only
  python3 scripts/check_em_dash.py FILE [FILE]  # named files

Exits 1 when anything is found, so it works as a commit hook and in CI.
"""

import argparse
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from em_dash_guard import (  # noqa: E402
    REPLACEMENT_ADVICE,
    find_violations,
    format_violations,
    is_exempt,
)

REPO_ROOT = Path(__file__).resolve().parents[1]


def git(*args):
    """Run git and return stdout as text, replacing undecodable bytes."""
    result = subprocess.run(
        ["git", *args],
        cwd=REPO_ROOT,
        capture_output=True,
        check=True,
    )
    return result.stdout.decode("utf-8", errors="replace")


def git_blob(path):
    """Return a staged blob as text, or None when it is not valid UTF-8."""
    result = subprocess.run(
        ["git", "show", f":{path}"],
        cwd=REPO_ROOT,
        capture_output=True,
    )
    if result.returncode != 0:
        return None
    try:
        return result.stdout.decode("utf-8")
    except UnicodeDecodeError:
        return None


def tracked_files():
    return [line for line in git("ls-files", "-z").split("\0") if line]


def staged_files():
    output = git("diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z")
    return [line for line in output.split("\0") if line]


def read_text(path, staged):
    if staged:
        return git_blob(path)
    full = REPO_ROOT / path
    try:
        return full.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return None


def main():
    parser = argparse.ArgumentParser(description="Fail on em dashes in content.")
    parser.add_argument("paths", nargs="*", help="files to scan (default: tracked files)")
    parser.add_argument(
        "--staged",
        action="store_true",
        help="scan staged content instead of the working tree",
    )
    args = parser.parse_args()

    if args.paths:
        paths = args.paths
    elif args.staged:
        paths = staged_files()
    else:
        paths = tracked_files()

    reports = []
    scanned = 0
    for path in paths:
        if is_exempt(path):
            continue
        text = read_text(path, args.staged)
        if text is None:
            continue
        scanned += 1
        violations = find_violations(text)
        if violations:
            reports.append(format_violations(violations, path))

    if reports:
        print("Em dash guardrail: violations found\n", file=sys.stderr)
        print("\n".join(reports), file=sys.stderr)
        print(f"\n{REPLACEMENT_ADVICE}", file=sys.stderr)
        return 1

    print(f"Em dash guardrail: clean ({scanned} files scanned).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
