#!/usr/bin/env node
// Regenerate public/og-default.png. Run after changing the hero copy:
//   node scripts/generate-og.mjs
//
// Renders an SVG with sharp (librsvg). Uses system fonts available on macOS
// (Helvetica) and Linux CI (DejaVu via fallback).
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '..', 'public', 'og-default.png');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0000ff"/>
  <g font-family="Helvetica, Arial, sans-serif" fill="#ffffff">
    <text x="80" y="290" font-size="160" font-weight="800" letter-spacing="-6">BaseHub</text>
    <text x="80" y="360" font-size="40" font-weight="400" fill-opacity="0.95">Reference for agents on Base</text>
    <text x="80" y="560" font-size="30" font-weight="500" fill-opacity="0.85">basehub.org</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`wrote ${out}`);
