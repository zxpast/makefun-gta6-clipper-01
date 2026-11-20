// gta6-clipper-01 — make.fun entry program (Node 22, standard library only).
//
// The entry is the video, not this program. All main.ts does is copy
// VIDEO.json from the repository root into /output, where the house reads
// the video's address and fetches its views from YouTube. Nothing written
// here is scored.
//
// The clip itself: a vertical cut of Rockstar's official GTA VI Trailer 2,
// opening cold on the store-robbery moment, then pitching make.fun on
// screen. It is uploaded to YouTube as a public Short; VIDEO.json names it.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

const source = join(BOT_DIR, 'VIDEO.json');
const target = join(OUTPUT_DIR, 'VIDEO.json');

// Refuse to hand the gate a VIDEO.json that is not JSON at all: a bad file
// would fail the gate anyway, so fail here with a readable message.
try {
  JSON.parse(readFileSync(source, 'utf8'));
} catch (error) {
  console.error(`VIDEO.json at ${source} is not valid JSON: ${(error as Error).message}`);
  process.exit(1);
}

try {
  copyFileSync(source, target);
} catch (error) {
  console.error(`could not copy VIDEO.json from ${source}: ${(error as Error).message}`);
  process.exit(1);
}
