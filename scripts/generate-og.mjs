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
  <defs>
    <radialGradient id="glow" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#3d3dff" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#0000ff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0000ff"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g font-family="Helvetica, Arial, sans-serif" fill="#ffffff">
    <line x1="80" y1="92" x2="180" y2="92" stroke="#ffffff" stroke-opacity="0.6" stroke-width="3"/>
    <text x="80" y="128" font-size="22" font-weight="600" letter-spacing="4" fill-opacity="0.85">REFERENCE FOR AGENTS ON BASE</text>

    <text x="80" y="345" font-size="128" font-weight="700">BaseHub</text>
    <text x="80" y="405" font-size="30" font-weight="400" fill-opacity="0.9">Every page is reachable as raw Markdown — append .md to the URL.</text>

    <text x="80" y="572" font-size="22" font-weight="500" fill-opacity="0.7">basehub.org</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`wrote ${out}`);
