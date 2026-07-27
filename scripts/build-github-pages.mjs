#!/usr/bin/env node
// Builds a static export for the GitHub Pages preview at
// playground.hellomike.co.uk/MLDX/ (see README.md). Not used by the Vercel
// deployment, which runs the full Next.js server.
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");
const distDir = path.join(root, "dist");
const proxyPath = path.join(root, "src", "proxy.ts");
const proxyBackupPath = path.join(root, "src", "proxy.ts.export-backup");

rmSync(distDir, { recursive: true, force: true });
rmSync(outDir, { recursive: true, force: true });

const hadProxy = existsSync(proxyPath);
if (hadProxy) renameSync(proxyPath, proxyBackupPath);

try {
  execFileSync("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_STATIC_EXPORT: "true",
      NEXT_PUBLIC_BASE_PATH: "/MLDX",
    },
  });
  mkdirSync(distDir, { recursive: true });
  cpSync(outDir, distDir, { recursive: true });
} finally {
  if (hadProxy) renameSync(proxyBackupPath, proxyPath);
  rmSync(outDir, { recursive: true, force: true });
}

// GitHub Pages runs Jekyll by default, which ignores `_next/` (leading
// underscore) and would silently break every JS/CSS asset.
writeFileSync(path.join(distDir, ".nojekyll"), "");

console.log(`\nDone. Static export written to ${path.relative(root, distDir)}/`);
