# The content CSVs — which one to open

All three hold the same 30 posts. The difference is how the body text is stored.

## `content-flat.csv` — use this one

One post per physical line, 31 lines total. Newlines inside the body are stored
as the two characters `\n`, so no tool can mis-split the rows. Opens correctly
in Excel, Sheets, Numbers, pandas, any CMS importer.

| Column | |
|---|---|
| `id` `platform` `publish_week` | H1-H10, M1-M10, S1-S10 across the 10-week calendar |
| `title` `subtitle` `target_keyword` | |
| `follow` | `dofollow` for Hashnode, `nofollow` for Medium and Substack |
| `word_count` | |
| `link1_url` `link2_url` `link3_url` | the pixoramagroup.com links in that post |
| `body_oneline` | the full post, newlines escaped |

**To get the real markdown back**, run the helper (single pass, so it handles
H4's body, which contains a literal `\n` inside a Python f-string):

```bash
python3 unescape_body.py H4            # print one post
python3 unescape_body.py --all posts/  # write all 30 as posts/H1.md etc.
```

Or in a spreadsheet: `=SUBSTITUTE(L2,"\n",CHAR(10))` — fine for reading, but it
will also convert the two literal `\n` in H4's code block, so use the script if
you are publishing H4.

Verified: all 30 bodies restore **byte-identical** to the originals.

## `content-paragraphs.csv` — for reading and review

1,379 rows, one per block, with `block_type` as `paragraph`, `heading`, `code`,
`list` or `table`. No unescaping needed — readable straight away, good for
reviewing or commenting paragraph by paragraph.

Wrapped prose is joined into one line. Code, tables and lists keep their real
line breaks, because flattening those would corrupt them — so this file still
has more physical lines than rows. Word retention is verified against the
originals.

Not the one to publish from; use `content-flat.csv` for that.

## `content-calendar.csv` — the full record

All 23 columns, including anchors, tags, canonical, external links, cross-links
and file paths. The body is stored with **real** newlines, which is why the file
is 6,083 physical lines for 30 rows.

It is correctly quoted — any tool that respects RFC 4180 reads exactly 30 rows.
But double-clicking it in Excel often will not. Import it instead:

- **Excel**: Data → From Text/CSV
- **Sheets**: File → Import → Upload
- **pandas**: `pd.read_csv("content-calendar.csv")` works as-is

## Regenerating

```bash
python3 build_csv.py            # content-calendar.csv, from the 30 .md files
python3 build_content_csvs.py   # content-flat.csv + content-paragraphs.csv
python3 build_internal_csv.py   # internal-links.csv
```

Each script verifies its own output and prints OK or FAIL.
