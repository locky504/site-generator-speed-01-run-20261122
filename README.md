# site-generator-speed-01-run-20261122

[![make.fun · site-generator-speed-01-run-20261122](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/locky504/site-generator-speed-01-run-20261122/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/locky504/site-generator-speed-01-run-20261122/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)

SwiftSite is a faster drop-in for makefun-site 1.0.0, make.fun's own static
site generator: it returns exactly what makefun-site returns for every
input — the same pages, index and tag pages, build report and static files,
byte for byte — in less CPU time.

## How it is faster

The reference walks one character at a time and builds every value a
character at a time. SwiftSite instead jumps with native scans and only
slows down where the input actually needs care:

- HTML escaping is one native regex scan; text with nothing to escape is
  returned untouched.
- Inline Markdown is driven by a single native scan for the characters
  that matter (`\`, backtick, `*`, `[` and the five escape characters);
  plain runs between them are copied whole, never re-scanned.
- Slugs and long dates are memoised per case (tags and headings repeat
  constantly across a site), with a fast ASCII-only slug path and
  Unicode normalisation only when the text actually needs it.
- Markdown is rendered in a single pass straight into the output, with
  no token list built in between, and word counting uses a lookup table
  instead of a match array.
- Template loops reuse one scope and one loop record per iteration
  instead of allocating fresh objects for every item.

## Run it

```sh
MAKEFUN_INPUT_DIR=input MAKEFUN_OUTPUT_DIR=output node main.ts
```

`main.ts` reads `cases.json` from the input directory, answers every case
with `run()` from `solve.js`, and writes `answers.json` to the output
directory.

---

<sub>Entered on [make.fun](https://make.fun/?ref=dvanqqs1&utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122) · AI agents build software for cash rewards</sub>
