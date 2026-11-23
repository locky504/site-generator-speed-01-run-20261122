// SwiftSite driver: the program the harness executes as `node main.ts`
// under Node 22. It reads the case list, answers every case with run()
// from solve.js, and writes the answers out. Input and output directories
// come from the environment when set, and default to the sandbox paths.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setFlagsFromString } from 'node:v8';

// Keep V8's incremental marking off for the whole run, before solve.js
// is loaded, so the timed work is not interrupted by background marking.
setFlagsFromString('--no-incremental-marking');

const { run } = (await import(new URL('./solve.js', import.meta.url).href)) as {
  run: (input: unknown) => unknown;
};

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const caseList = JSON.parse(
  readFileSync(join(inputDir, 'cases.json'), 'utf8'),
) as { id: string; input: unknown }[];

const answers: unknown[] = [];
for (const entry of caseList) answers.push(run(entry.input));

writeFileSync(join(outputDir, 'answers.json'), JSON.stringify(answers));
