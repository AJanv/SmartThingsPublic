import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { chromium } from "@playwright/test";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(repoRoot, "soloworks");
const expectedBaseUrl = process.env.SOLOWORKS_BASE_URL || "https://soloworks-hq.netlify.app";

const requiredPages = [
  "index.html",
  "rates/index.html",
  "templates/index.html",
  "tools/index.html",
  "blog/index.html",
  "blog/how-much-should-i-charge-freelance.html",
  "blog/how-to-write-a-freelance-invoice.html",
  "blog/client-wont-pay-email-scripts.html",
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function siteUrl(relativePath) {
  return pathToFileURL(path.join(siteRoot, relativePath)).href;
}

function findHtmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return findHtmlFiles(fullPath);
    }
    return entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

function verifyLaunchText() {
  const textFiles = [
    ...findHtmlFiles(siteRoot),
    path.join(siteRoot, "sitemap.xml"),
    path.join(siteRoot, "robots.txt"),
  ];
  const combined = textFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
  assert(!combined.includes("yourdomain.com"), "Replace yourdomain.com before launch");
  assert(!combined.includes("hello@example.com"), "Replace hello@example.com before launch");
  assert(!combined.includes("Site owner:"), "Remove internal owner instructions from public copy");
  assert(!combined.includes("checkout isn't connected"), "Use polished checkout placeholder copy");
  assert(combined.includes(expectedBaseUrl), `Expected metadata to use ${expectedBaseUrl}`);
}

function verifyLocalLinks() {
  const missing = [];
  for (const file of findHtmlFiles(siteRoot)) {
    const html = fs.readFileSync(file, "utf8");
    for (const match of html.matchAll(/href=["']([^"']+)["']/g)) {
      const href = match[1];
      if (/^(https?:|mailto:|#|javascript:)/.test(href)) {
        continue;
      }
      const withoutHash = href.split("#")[0];
      if (!withoutHash) {
        continue;
      }
      let target = path.resolve(path.dirname(file), withoutHash);
      if (href.endsWith("/") || !path.extname(target)) {
        target = path.join(target, "index.html");
      }
      if (!fs.existsSync(target)) {
        missing.push(`${path.relative(repoRoot, file)} -> ${href}`);
      }
    }
  }
  assert(missing.length === 0, `Missing local links:\n${missing.join("\n")}`);
}

async function verifyPagesLoad() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const failures = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      failures.push(message.text());
    }
  });

  for (const relativePath of requiredPages) {
    await page.goto(siteUrl(relativePath));
    await page.waitForLoadState("domcontentloaded");
    assert((await page.locator("body").innerText()).trim().length > 0, `${relativePath} rendered empty body`);
  }

  assert(failures.length === 0, `Browser errors:\n${failures.join("\n")}`);
  await browser.close();
}

async function verifyRateCalculatorAndInvoice() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(siteUrl("rates/index.html"));

  await page.fill("#income", "60000");
  await page.fill("#expenses", "0");
  await page.fill("#taxrate", "0");
  await page.fill("#weeks", "50");
  await page.fill("#hours", "40");
  await page.fill("#billable", "100");
  await page.fill("#buffer", "0");
  await page.waitForFunction(() => document.querySelector("#r-hour")?.textContent?.includes("$"));
  const hourly = await page.locator("#r-hour").innerText();
  assert(hourly === "$30", `Expected hourly rate $30, got ${hourly}`);

  await page.locator(".i-desc").first().fill("Strategy sprint");
  await page.locator(".i-qty").first().fill("2");
  await page.locator(".i-rate").first().fill("500");
  await page.fill("#f-tax", "10");
  await page.waitForFunction(() => document.querySelector("#p-total")?.textContent === "$1,100.00");
  const grandTotal = await page.locator("#p-total").innerText();
  assert(grandTotal === "$1,100.00", `Expected invoice grand total $1,100.00, got ${grandTotal}`);
  await browser.close();
}

verifyLaunchText();
verifyLocalLinks();
await verifyPagesLoad();
await verifyRateCalculatorAndInvoice();
console.log("SoloWorks verification passed");
