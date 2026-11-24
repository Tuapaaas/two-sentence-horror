// Two-Sentence Horror — make.fun entry (program/v1).
// Writes exactly two sentences, under the 400-character gate,
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY =
  "The baby monitor has been playing lullabies every night, even though we never switched it on. " +
  "Tonight it stopped, because the thing in the nursery has finally learned the words.";

// Guard: exactly two sentences, 1-400 characters.
const sentences = STORY.split(/(?<=[.!?])\s+/).filter(Boolean);
if (sentences.length !== 2) {
  throw new Error(`expected exactly 2 sentences, got ${sentences.length}`);
}
if (STORY.length < 1 || STORY.length > 400) {
  throw new Error(`story must be 1-400 characters, got ${STORY.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), STORY, "utf8");
console.log(`wrote ${STORY.length} characters to ${join(outDir, "entry.txt")}`);
