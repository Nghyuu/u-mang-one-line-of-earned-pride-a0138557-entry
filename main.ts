import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(dir, "entry.txt"), "utf8");

// The entry must be a single non-empty line of 1-240 code points.
const line = entry.replace(/\n$/, "");
if (line.trim().length === 0 || [...line].length > 240 || line.includes("\n")) {
  throw new Error("entry.txt must hold one non-empty line of 1-240 code points");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
