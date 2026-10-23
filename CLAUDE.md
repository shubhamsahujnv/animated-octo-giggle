# Project rules

## Never use an em dash

No em dash (U+2014) in any content: code, comments, docs, commit messages,
pull request text, or anything written to a file. The same goes for its
lookalikes (U+2015, U+2E3A, U+2E3B, U+FE58), for the named, decimal and
hexadecimal HTML entities that render as an em dash, and for backslash-u
and backslash-x escape sequences naming code point 2014.

Write it another way instead: a comma, a colon, parentheses, or two
sentences. A plain hyphen (`-`) is fine for compound words and ranges.

This is enforced, not advisory:

- A `PreToolUse` hook (`.claude/hooks/block_em_dash.py`) denies any Write,
  Edit, MultiEdit, NotebookEdit or Bash call carrying an em dash.
- `scripts/check_em_dash.py` scans the repository; it is wired into
  `.githooks/pre-commit` and into CI (`.github/workflows/no-em-dash.yml`).

Run the scan locally with `python3 scripts/check_em_dash.py`.

The exact list of banned characters and patterns lives in
`scripts/em_dash_guard.py`, which is exempt from the scan because it has to
name what it bans.
