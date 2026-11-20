// Builds the static GitHub Pages version of the site into dist/client.
// Usage: npm run build:pages
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const run = spawnSync("npx", ["vite", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, GITHUB_PAGES: "true" },
});
if (run.status !== 0) process.exit(run.status ?? 1);

const out = join("dist", "client");
const shell = join(out, "_shell.html");
if (!existsSync(shell)) {
  console.error("Missing dist/client/_shell.html: the SPA shell was not generated.");
  process.exit(1);
}
copyFileSync(shell, join(out, "index.html"));
// GitHub Pages serves 404.html for unknown paths, so deep links like /editor/work/ascent still load the app.
copyFileSync(shell, join(out, "404.html"));
writeFileSync(join(out, ".nojekyll"), "");
console.log("GitHub Pages build ready in dist/client");
