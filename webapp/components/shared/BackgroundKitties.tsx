import { CAT_ASPECT, catSilhouetteMaskUri } from "@/lib/pixel-cat";

type BgKitty = {
  left: string;
  top: string;
  size: number; // width in px; height derived from the cat aspect ratio
  delay: string;
  flip?: boolean;
};

// Scattered across the viewport at varied positions and sizes. Colour and
// opacity are controlled from CSS (per-page tint), so this only positions them.
// Top edge kept clear of the fixed topnav.
const KITTIES: BgKitty[] = [
  { left: "3%", top: "15%", size: 132, delay: "0s" },
  { left: "85%", top: "13%", size: 92, delay: "1.3s", flip: true },
  { left: "11%", top: "57%", size: 112, delay: "0.6s" },
  { left: "79%", top: "63%", size: 144, delay: "2.1s", flip: true },
  { left: "45%", top: "80%", size: 82, delay: "1.6s" },
  { left: "63%", top: "35%", size: 70, delay: "0.9s", flip: true },
  { left: "27%", top: "29%", size: 60, delay: "2.4s" },
  { left: "91%", top: "43%", size: 56, delay: "3.1s", flip: true },
  { left: "2%", top: "83%", size: 78, delay: "0.3s" },
  { left: "69%", top: "87%", size: 98, delay: "1.9s", flip: true },
  { left: "35%", top: "52%", size: 50, delay: "2.7s" },
  { left: "53%", top: "13%", size: 62, delay: "1.1s", flip: true },
  { left: "19%", top: "90%", size: 66, delay: "3.4s" },
  { left: "89%", top: "78%", size: 74, delay: "0.5s", flip: true },
  { left: "49%", top: "40%", size: 46, delay: "2.0s" },
];

const MASK = catSilhouetteMaskUri();

export default function BackgroundKitties() {
  return (
    <div className="bg-kitties" aria-hidden="true">
      {KITTIES.map((kitty, i) => (
        <div
          key={i}
          className="bg-kitty"
          style={{
            left: kitty.left,
            top: kitty.top,
            width: `${kitty.size}px`,
            height: `${Math.round(kitty.size / CAT_ASPECT)}px`,
            animationDelay: kitty.delay,
            transform: kitty.flip ? "scaleX(-1)" : undefined,
            maskImage: MASK,
            WebkitMaskImage: MASK,
          }}
        />
      ))}
    </div>
  );
}
