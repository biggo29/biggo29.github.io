/**
 * generate-loader-gif.js
 * ─────────────────────
 * Captures the portfolio Marvel loader animation and saves it as an
 * optimised GIF ready for social media sharing.
 *
 * Prerequisites (run once):
 *   npm install
 *   npm run install:browsers
 *
 * Usage:
 *   node generate-loader-gif.js                          # marvel-studio theme
 *   node generate-loader-gif.js loader-theme-marvel-studio
 *   node generate-loader-gif.js loader-theme-marvel-old
 *   node generate-loader-gif.js loader-theme-avengers
 *   node generate-loader-gif.js loader-theme-avengers-doomsday
 *   node generate-loader-gif.js all                      # all four themes
 *
 * Output: ./marvel-loader-<theme>.gif
 */

'use strict';

const { chromium }  = require('playwright');
const GIFEncoder    = require('gif-encoder-2');
const { PNG }       = require('pngjs');
const fs            = require('fs');
const path          = require('path');

/* ── Config ──────────────────────────────────────────────────────── */
const BASE_URL    = 'http://localhost:8090';
const WIDTH       = 800;
const HEIGHT      = 450;
const FPS         = 12;                        /* frames per second  */
const DURATION_MS = 5400;                      /* total capture time */
const FRAME_MS    = Math.round(1000 / FPS);    /* ~83 ms per frame   */

const ALL_THEMES = [
    'loader-theme-marvel-studio',
    'loader-theme-marvel-old',
    'loader-theme-avengers',
    'loader-theme-avengers-doomsday',
];

const THEME_LABELS = {
    'loader-theme-marvel-studio':       'Marvel Studios (chrome silver on crimson)',
    'loader-theme-marvel-old':          'Marvel Old   (white → red sweep, two-line)',
    'loader-theme-avengers':            'Avengers     (gold on navy, blue flash)',
    'loader-theme-avengers-doomsday':   'Doomsday     (copper on ember, blood flash)',
};

/* ── Helpers ─────────────────────────────────────────────────────── */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function pad(n, len) { return String(n).padStart(len, '0'); }

function formatMs(ms) {
    const s  = Math.floor(ms / 1000);
    const m  = Math.floor(ms % 1000 / 10);
    return `${pad(s,2)}s ${pad(m,2)}ms`;
}

/* ── Core capture ────────────────────────────────────────────────── */
async function captureTheme(theme) {
    const label   = THEME_LABELS[theme] || theme;
    const shortKey = theme.replace('loader-theme-', '');
    const outFile  = path.join(__dirname, `marvel-loader-${shortKey}.gif`);

    console.log(`\n╔══════════════════════════════════════════════════╗`);
    console.log(`║  Capturing: ${label}`);
    console.log(`╚══════════════════════════════════════════════════╝`);
    console.log(`  URL      : ${BASE_URL}?loader-theme=${theme}`);
    console.log(`  Output   : ${outFile}`);
    console.log(`  Size     : ${WIDTH}×${HEIGHT}  |  ${FPS}fps  |  ${DURATION_MS}ms`);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: WIDTH, height: HEIGHT },
    });
    const page = await context.newPage();

    /* Ensure loader always plays — clear session flag before load   */
    await page.addInitScript(() => {
        sessionStorage.removeItem('ml-seen');
    });

    /* Navigate with theme param so JS picks the correct theme       */
    await page.goto(`${BASE_URL}?loader-theme=${theme}`, {
        waitUntil: 'domcontentloaded',
    });

    /* Capture frames ─────────────────────────────────────────────── */
    console.log(`\n  Capturing ${Math.ceil(DURATION_MS / FRAME_MS)} frames...`);
    const frames    = [];
    const startTime = Date.now();
    let   elapsed   = 0;

    while (elapsed < DURATION_MS) {
        const buf = await page.screenshot({ type: 'png' });
        frames.push(buf);
        elapsed = Date.now() - startTime;

        /* Progress bar */
        const pct    = Math.min(100, Math.round(elapsed / DURATION_MS * 100));
        const filled = Math.round(pct / 2);
        const bar    = '█'.repeat(filled) + '░'.repeat(50 - filled);
        process.stdout.write(`\r  [${bar}] ${pct}%  ${formatMs(elapsed)}`);

        await sleep(FRAME_MS);
    }

    await browser.close();
    console.log(`\n  ✓ ${frames.length} frames captured`);

    /* Encode GIF ─────────────────────────────────────────────────── */
    console.log(`  Encoding GIF (octree algorithm)...`);

    const encoder = new GIFEncoder(WIDTH, HEIGHT, 'octree', true, frames.length);
    encoder.setDelay(FRAME_MS);
    encoder.setRepeat(0);          /* 0 = loop forever               */
    encoder.setQuality(15);        /* 1 (best) – 30 (smallest file)  */
    encoder.start();

    for (let i = 0; i < frames.length; i++) {
        const png  = PNG.sync.read(frames[i]);
        const rgba = new Uint8ClampedArray(png.data.buffer);
        encoder.addFrame(rgba);

        const pct    = Math.round((i + 1) / frames.length * 100);
        const filled = Math.round(pct / 2);
        const bar    = '█'.repeat(filled) + '░'.repeat(50 - filled);
        process.stdout.write(`\r  [${bar}] ${pct}%  frame ${i + 1}/${frames.length}`);
    }

    encoder.finish();
    console.log();

    const gifBuffer = encoder.out.getData();
    fs.writeFileSync(outFile, gifBuffer);

    const sizeMb = (gifBuffer.length / 1024 / 1024).toFixed(2);
    console.log(`  ✓ Saved: ${path.basename(outFile)}  (${sizeMb} MB)`);

    return outFile;
}

/* ── Entry point ─────────────────────────────────────────────────── */
(async () => {
    const arg = process.argv[2];

    /* Validate the target theme(s) */
    let targets;
    if (!arg || arg === 'loader-theme-marvel-studio') {
        targets = ['loader-theme-marvel-studio'];
    } else if (arg === 'all') {
        targets = ALL_THEMES;
    } else if (ALL_THEMES.includes(arg)) {
        targets = [arg];
    } else {
        console.error(`\nUnknown theme: "${arg}"`);
        console.error(`Valid values: ${ALL_THEMES.join(', ')}, all`);
        process.exit(1);
    }

    console.log(`\nMarvel Loader GIF Generator`);
    console.log(`Themes to capture: ${targets.length}`);

    const saved = [];
    for (const theme of targets) {
        const file = await captureTheme(theme);
        saved.push(file);
    }

    console.log(`\n╔══════════════════════════════════════════════════╗`);
    console.log(`║  Done! Files saved:`);
    saved.forEach((f) => console.log(`║    ${path.basename(f)}`));
    console.log(`╚══════════════════════════════════════════════════╝`);
    console.log(`\nTip: To share on social media, keep GIF under 15 MB.`);
    console.log(`     For best quality on Twitter/X use MP4 instead.`);
})().catch((err) => {
    console.error('\nFailed:', err.message);
    process.exit(1);
});
