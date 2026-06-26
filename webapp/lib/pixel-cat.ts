export const CAT_WITH_HEART = [
  "..XX........XX..",
  "..XXX......XXX..",
  "..XXXXXXXXXXXX..",
  ".XXXXXXXXXXXXXX.",
  ".XXWWXXXXXXWWXX.",
  ".XXWWXXXXXXWWXX.",
  ".XXXXXXXXXXXXXX.",
  "XXXX.RR..RR.XXXX",
  "XXX.RRRRRRRR.XXX",
  "XXX.RRRRRRRR.XXX",
  "XXXX.RRRRRR.XXXX",
  ".XXXX.RRRR.XXXX.",
  "..XXXX.RR.XXXX..",
  "...XXXXXXXXXX...",
];

export const CAT_COLORS: Record<string, string> = {
  X: "#211b20",
  W: "#fdfdfd",
  R: "#e23b4e",
};

export function drawPixelSprite(
  canvas: HTMLCanvasElement,
  grid: string[],
  colors: Record<string, string>,
  cell = 9,
) {
  const cols = grid[0].length;
  const rows = grid.length;
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  canvas.width = cols * cell * dpr;
  canvas.height = rows * cell * dpr;
  canvas.style.width = `${cols * cell}px`;
  canvas.style.height = `${rows * cell}px`;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const ch = grid[y][x];
      const color = colors[ch];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(x * cell, y * cell, cell, cell);
    }
  }
}

export function drawPixelCat(canvas: HTMLCanvasElement, cell = 9) {
  drawPixelSprite(canvas, CAT_WITH_HEART, CAT_COLORS, cell);
}

// Near-black cat silhouette: every filled pixel (body, eyes, heart) is rendered
// in a single colour so the sprite reads as a cute solid silhouette. Used for
// the subtle site-wide background decoration.
export function drawPixelCatSilhouette(
  canvas: HTMLCanvasElement,
  color = "#1a1320",
  cell = 9,
) {
  const colors: Record<string, string> = { X: color, W: color, R: color };
  drawPixelSprite(canvas, CAT_WITH_HEART, colors, cell);
}

// CSS-mask data URI of the solid cat silhouette. Returned as a ready-to-use
// `url("data:image/svg+xml,...")` value so it can be applied as a mask-image:
// the element's own `background-color` then becomes the cat colour, which lets
// us re-tint the cats per page purely from CSS (no canvas re-paint needed).
export function catSilhouetteMaskUri(): string {
  const cols = CAT_WITH_HEART[0].length;
  const rows = CAT_WITH_HEART.length;
  let rects = "";
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (CAT_WITH_HEART[y][x] === ".") continue;
      rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
  }
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cols} ${rows}" ` +
    `fill="#000" shape-rendering="crispEdges">${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// Native pixel aspect ratio (cols / rows) of the cat sprite.
export const CAT_ASPECT = CAT_WITH_HEART[0].length / CAT_WITH_HEART.length;
