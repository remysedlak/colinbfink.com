import { mkdir } from "node:fs/promises";
import { access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";

const SITE_URL = process.env.LH_URL || "http://127.0.0.1:4173";
const ROUTES = process.argv.slice(2);
const TARGET_ROUTES = ROUTES.length > 0 ? ROUTES : ["/", "/films", "/films/collaborative-work"];
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, "-");
const REPORT_DIR = path.join(process.cwd(), "lighthouse-reports", TIMESTAMP);

const LIGHTHOUSE_PRESETS = [
  {
    name: "mobile",
    args: ["--preset=perf", "--form-factor=mobile", "--throttling-method=simulate"],
  },
  {
    name: "desktop",
    args: ["--preset=desktop"],
  },
];

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
  "/snap/bin/chromium",
].filter(Boolean);

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: options.stdio ?? "inherit",
      shell: false,
      ...options,
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });
  });
}

async function waitForServer(url, timeoutMs = 60000) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server not ready yet.
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

function sanitizeRoute(route) {
  if (route === "/") return "home";
  return route.replace(/^\//, "").replace(/\//g, "-");
}

async function detectChromePath() {
  for (const candidate of CHROME_CANDIDATES) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try next candidate.
    }
  }

  return null;
}

async function run() {
  await mkdir(REPORT_DIR, { recursive: true });

  console.log("Building production bundle...");
  await runCommand("npm", ["run", "build"]);

  console.log("Starting preview server...");
  const previewServer = spawn(
    "npm",
    ["run", "preview", "--", "--port", "4173", "--strictPort"],
    { stdio: "inherit" }
  );

  try {
    await waitForServer(SITE_URL);
    const chromePath = await detectChromePath();

    if (!chromePath) {
      throw new Error(
        "Could not find Chrome/Chromium. Install Chrome, or set CHROME_PATH to your browser executable."
      );
    }

    for (const route of TARGET_ROUTES) {
      const routeLabel = sanitizeRoute(route);
      const url = `${SITE_URL}${route}`;

      for (const preset of LIGHTHOUSE_PRESETS) {
        const outputBase = path.join(REPORT_DIR, `${routeLabel}-${preset.name}`);
        const args = [
          "lighthouse",
          url,
          "--only-categories=performance,accessibility,best-practices,seo",
          "--output=html",
          "--output=json",
          `--output-path=${outputBase}`,
          "--quiet",
          "--no-enable-error-reporting",
          `--chrome-path=${chromePath}`,
          "--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage",
          ...preset.args,
        ];

        console.log(`Running Lighthouse (${preset.name}) for ${url}...`);
        await runCommand("npx", args);
      }
    }

    console.log(`Lighthouse reports saved to: ${REPORT_DIR}`);
  } finally {
    previewServer.kill("SIGTERM");
  }
}

run().catch((error) => {
  console.error(error.message);
  console.error("Tip: set CHROME_PATH, for example: CHROME_PATH=/usr/bin/google-chrome npm run lh:home");
  process.exit(1);
});
