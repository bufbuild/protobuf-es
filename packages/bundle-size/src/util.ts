// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { compress } from "brotli";
import { buildSync } from "esbuild";
import { sizes } from "./constants";
import { readFileSync, writeFileSync } from "node:fs";

type MarkdownRow = {
  name: string;
  files: number;
  size: number;
  minified: number;
  compressed: number;
};

export function generateMarkdownTable(rows: MarkdownRow[]) {
  let md = `| code generator  | files    | bundle size             | minified               | compressed         |\n`;
  md += `|-----------------|----------|------------------------:|-----------------------:|-------------------:|\n`;
  for (const row of rows) {
    md += `| ${row.name} | ${row.files} | ${formatBytes(row.size)} | ${formatBytes(row.minified)} | ${formatBytes(row.compressed)} |\n`;
  }
  return md;
}

export function injectTable(filePath: string, table: string) {
  const cStart = "<!--- TABLE-START -->\n";
  const cEnd = "<!--- TABLE-END -->";
  const fileContent = readFileSync(filePath, "utf-8");
  const iStart = fileContent.indexOf(cStart);
  const iEnd = fileContent.indexOf(cEnd);
  if (iStart < 0 || iEnd < 0)
    throw new Error(`missing comment annotations in ${filePath}`);
  const head = fileContent.substring(0, iStart + cStart.length);
  const foot = fileContent.substring(iEnd);
  const newContent = head + table + foot;
  if (newContent !== fileContent) {
    writeFileSync(filePath, newContent);
  }
}

type Chartline = {
  name: string;
  color: string;
  points: {
    bytes: number;
    files: number;
  }[];
};

export function generateChart(lines: Chartline[]): string {
  const yMax = 290;
  const xStep = 140;
  const xMax = xStep * sizes.length + 90 + 10;
  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${xMax}px" height="330px" viewBox="0 0 ${xMax} 330" class="chart">
    <style>
      <![CDATA[
      text {
        font: 12px Verdana, Helvetica, Arial, sans-serif;
      }
      ]]>
    </style>
    <g transform="translate(90,310)">
      <line y1="0" x2="${xStep * sizes.length}" stroke="black" />
      ${sizes.map((size, index) => `<text x="${xStep * index}" y="14" text-anchor="start">${size} file${size > 1 ? "s" : ""}</text>`).join("\n")}
    </g>`;

  let maxBytes = lines
    .flatMap((l) => l.points)
    .reduce((prev, curr) => Math.max(prev, curr.bytes), 0);
  // paint y-axis
  if (maxBytes < 1024 * 100) {
    maxBytes = 1024 * 100;
    svg += `<g transform="translate(90, 20)" >
      <line x1="0" x2="0" y1="0" y2="290" stroke="black" />
      <g transform="rotate(-90), translate(-150,-60)">
        <text text-anchor="middle">Bundle size - minified and compressed</text>
      </g>
    `;
    const labels = 10;
    for (let i = 0; i < labels + 1; i++) {
      const y = (yMax / labels) * i;
      const bytes = maxBytes - (maxBytes / labels) * i;
      const label = `${Math.floor(bytes / 1024)} KiB`;
      svg += `<text x="-5" y="${y + 4}" text-anchor="end">${label}</text>\n`;
      if (i < labels) {
        svg += `<line x1="0" x2="${xStep * sizes.length}" y1="${y}" y2="${y}" stroke="#ebebeb" />\n`;
      }
    }
    svg += `</g>\n`;
  } else {
    throw new Error(
      `don't know how to paint the y-axis for for ${maxBytes} bytes`,
    );
  }
  // paint lines
  for (const line of lines) {
    const points = line.points.map((p, index) => {
      const x = index * xStep;
      const y = yMax - yMax * (p.bytes / maxBytes);
      return { ...p, x, y };
    });
    const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
    svg += `<g transform="translate(90, 20)">\n`;
    svg += `  <polyline fill="none" stroke="${line.color}" stroke-width="2" points="${polylinePoints}">\n`;
    svg += `    <title>${line.name}</title>\n`;
    svg += `  </polyline>\n`;
    for (const p of points) {
      svg += `<circle cx="${p.x}" cy="${p.y}" r="3" fill="${line.color}"><title>${line.name} ${formatKibibytes(p.bytes)} for ${p.files} files</title></circle>\n`;
    }
    svg += `</g>\n`;
  }
  // legend
  svg += `<g transform="translate(105, 30)">\n`;
  for (let i = 0; i < lines.length; i++) {
    svg += `<g transform="translate(0, ${i * 18})">
      <rect width="15" height="6" fill="${lines[i].color}"/>
      <text x="20" y="6">${lines[i].name}</text>
    </g>\n`;
  }
  svg += `</g>\n`;
  svg += `</svg>`;
  return svg;
}

export function bundleStats(entryPoint: string): {
  entryPoint: string;
  size: number;
  minified: number;
  compressed: number;
} {
  const bundle = build(false);
  const bundleMinified = build(true);
  const compressed = compress(Buffer.from(bundleMinified));
  return {
    entryPoint,
    size: bundle.byteLength,
    minified: bundleMinified.byteLength,
    compressed: compressed.byteLength,
  };
  function build(minify: boolean) {
    const result = buildSync({
      entryPoints: [entryPoint],
      bundle: true,
      format: "esm",
      treeShaking: true,
      minify: minify,
      write: false,
    });
    if (result.outputFiles.length !== 1) {
      throw new Error();
    }
    return result.outputFiles[0].contents;
  }
}

function formatKibibytes(bytes: number) {
  return (
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
      bytes / 1024,
    ) + " KiB"
  );
}

function formatBytes(bytes: number) {
  return new Intl.NumberFormat().format(bytes) + " b";
}
