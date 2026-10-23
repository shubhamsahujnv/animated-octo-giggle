1.⁠ ⁠Tools Installed
I installed Cursor IDE and Git. For Claude Code and Codex, I used their web versions instead of installing extensions. I also used GitHub to create and manage the repository.

2.⁠ ⁠Steps Completed
First, I installed Cursor and Git on my system. After that, I logged in to Claude Code and Codex, created a public GitHub repository, opened it in Cursor, created the README.md file, and added the required details. Finally, I committed the changes and pushed the repository to GitHub.

3.⁠ ⁠The main issue I faced was installing Git on Mac. During the installation, there were some setup and configuration issues in the terminal, which took some time to fix. After completing the installation and configuration properly, Git started working fine. Other than that, I did not face any major issues.

###################################################################################
## Em dash guardrail

No em dash (U+2014) is allowed in any content in this repository. See
`CLAUDE.md` for the rule and the accepted alternatives.

Enforcement, in three layers:

| Layer | File | What it does |
| --- | --- | --- |
| Claude Code | `.claude/hooks/block_em_dash.py` | A `PreToolUse` hook that denies any Write, Edit, MultiEdit, NotebookEdit or Bash call carrying an em dash. |
| Commit | `.githooks/pre-commit` | Rejects a commit whose staged content contains an em dash. |
| CI | `.github/workflows/no-em-dash.yml` | Fails the build on every push and pull request. |

Enable the commit hook once per clone:

```sh
git config core.hooksPath .githooks
```

Scan manually at any time:

```sh
python3 scripts/check_em_dash.py            # every tracked file
python3 scripts/check_em_dash.py --staged   # staged content only
python3 scripts/check_em_dash.py FILE       # specific files
```

Detection covers the character itself, its lookalikes (U+2015, U+2E3A,
U+2E3B, U+FE58), the named, decimal and hexadecimal HTML entities for it,
and backslash escape sequences naming code point 2014. The full list lives
in `scripts/em_dash_guard.py`. The guardrail's own source files are exempt
from the scan, since they have to name what they ban.
