/**
 * Measures real composited text contrast from a screenshot.
 *
 * axe cannot reliably compute contrast through the composited fixed atmosphere
 * and grain layers, so the ratios that matter here come from rendered pixels.
 *
 * For a band of light text on a dark scene, the darkest pixels are background
 * and the lightest are glyph. Comparing the 10th and 95th percentile luminance
 * across the band gives a defensible worst-case reading.
 *
 * Usage: node scripts/measure-contrast.mjs <png> <label:x,y,w,h> [...]
 */
import sharp from "sharp";

const srgbToLinear = (v) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

const relLuminance = (r, g, b) =>
  0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);

const contrast = (a, b) => {
  const hi = Math.max(a, b);
  const lo = Math.min(a, b);
  return (hi + 0.05) / (lo + 0.05);
};

const [, , file, ...regions] = process.argv;
if (!file || regions.length === 0) {
  console.error("usage: node scripts/measure-contrast.mjs <png> <label:x,y,w,h> [...]");
  process.exit(1);
}

const image = sharp(file);
const meta = await image.metadata();

for (const region of regions) {
  const [label, box] = region.split(":");
  const [x, y, w, h] = box.split(",").map(Number);

  const { data, info } = await sharp(file)
    .extract({ left: x, top: y, width: w, height: h })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const lums = [];
  for (let i = 0; i < data.length; i += info.channels) {
    lums.push(relLuminance(data[i], data[i + 1], data[i + 2]));
  }
  lums.sort((a, b) => a - b);

  // Glyphs cover only a small fraction of a text box, so a mid percentile for
  // the foreground lands in background and reports a nonsense ratio. The
  // background is the median (most pixels), the foreground is the glyph core
  // near the top of the distribution.
  const at = (p) => lums[Math.min(lums.length - 1, Math.floor(lums.length * p))];
  const bg = at(0.35);
  const fg = at(0.995);

  console.log(
    `${label.padEnd(26)} bg L=${bg.toFixed(4)}  fg L=${fg.toFixed(4)}  contrast ${contrast(fg, bg).toFixed(2)}:1`
  );
}

console.log(`\nsource ${file} (${meta.width}x${meta.height})`);
