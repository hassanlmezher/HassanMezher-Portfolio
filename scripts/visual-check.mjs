import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const target = process.env.PORTFOLIO_URL ?? "http://localhost:3000";
const outputDir = ".verification";

async function assertCanvasHasPixels(page) {
  const result = await page.locator("canvas").first().evaluate((canvas) => {
    const copy = document.createElement("canvas");
    copy.width = canvas.width;
    copy.height = canvas.height;
    const context = copy.getContext("2d");
    if (!context) {
      return { ok: false, reason: "2D context unavailable" };
    }

    context.drawImage(canvas, 0, 0);
    const pixels = context.getImageData(0, 0, copy.width, copy.height).data;
    let coloredPixels = 0;
    let min = 765;
    let max = 0;

    for (let index = 0; index < pixels.length; index += 20) {
      const brightness = pixels[index] + pixels[index + 1] + pixels[index + 2];
      min = Math.min(min, brightness);
      max = Math.max(max, brightness);
      if (pixels[index + 3] > 0 && brightness > 30) {
        coloredPixels += 1;
      }
    }

    return {
      ok: copy.width > 300 && copy.height > 250 && coloredPixels > 800 && max - min > 60,
      width: copy.width,
      height: copy.height,
      coloredPixels,
      contrast: max - min,
    };
  });

  if (!result.ok) {
    throw new Error(`Canvas check failed: ${JSON.stringify(result)}`);
  }
}

async function checkViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(target, { waitUntil: "networkidle" });
  await page.getByText("Hassan Mezher builds clean web apps").waitFor({ state: "visible", timeout: 15000 });
  await page.waitForSelector("canvas", { state: "visible", timeout: 15000 });
  await page.waitForTimeout(1000);
  await assertCanvasHasPixels(page);

  const requiredText = [
    "Hassan Mezher builds clean web apps",
    "Shopora",
    "Hurdle Solutions",
    "POST /contact",
  ];

  const pageText = await page.locator("body").innerText({ timeout: 10000 });
  for (const text of requiredText) {
    if (!pageText.includes(text)) {
      throw new Error(`Expected page text to include "${text}".`);
    }
  }

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= pageHeight; y += Math.floor(viewport.height * 0.75)) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(180);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);

  await page.screenshot({ path: `${outputDir}/${name}.png`, fullPage: true });
  await page.close();
}

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch();
try {
  await checkViewport(browser, "desktop", { width: 1440, height: 1100 });
  await checkViewport(browser, "mobile", { width: 390, height: 844 });
  console.log(`Visual checks passed for ${target}. Screenshots saved in ${outputDir}.`);
} finally {
  await browser.close();
}
