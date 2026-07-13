#!/usr/bin/env node
// Builds a static export of every brand skin for the GitHub Pages preview
// at playground.hellomike.co.uk/MLDX/ (see README.md). Not used by the
// Vercel deployments, which run the full Next.js server.
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

const BRANDS = [
  { id: "range-rover", name: "Range Rover" },
  { id: "defender", name: "Land Rover Defender" },
];

function buildBrand(brand) {
  rmSync(outDir, { recursive: true, force: true });
  execFileSync("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_STATIC_EXPORT: "true",
      NEXT_PUBLIC_BRAND: brand.id,
      NEXT_PUBLIC_BASE_PATH: `/MLDX/${brand.id}`,
    },
  });
  cpSync(outDir, path.join(distDir, brand.id), { recursive: true });
}

function landingPage() {
  const links = BRANDS.map(
    (brand) => `      <li><a href="./${brand.id}/">${brand.name}</a></li>`,
  ).join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <title>MLDX Prototype — skin preview</title>
    <style>
      body {
        font-family: -apple-system, "Helvetica Neue", Arial, sans-serif;
        max-width: 32rem;
        margin: 4rem auto;
        padding: 0 1.5rem;
        color: #141414;
      }
      ul {
        padding-left: 1.2rem;
      }
      a {
        color: inherit;
      }
    </style>
  </head>
  <body>
    <h1>MLDX Prototype</h1>
    <p>Usability-testing prototype — pick a skin to preview:</p>
    <ul>
${links}
    </ul>
  </body>
</html>
`;
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

const hadProxy = existsSync(proxyPath);
if (hadProxy) renameSync(proxyPath, proxyBackupPath);

try {
  for (const brand of BRANDS) {
    console.log(`\nBuilding ${brand.name} (${brand.id})...`);
    buildBrand(brand);
  }
} finally {
  if (hadProxy) renameSync(proxyBackupPath, proxyPath);
  rmSync(outDir, { recursive: true, force: true });
}

// GitHub Pages runs Jekyll by default, which ignores `_next/` (leading
// underscore) and would silently break every JS/CSS asset.
writeFileSync(path.join(distDir, ".nojekyll"), "");
writeFileSync(path.join(distDir, "index.html"), landingPage());

console.log(`\nDone. Static skins written to ${path.relative(root, distDir)}/`);
