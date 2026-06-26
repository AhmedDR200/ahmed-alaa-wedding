type FlameSvgProps = {
  state: "dim" | "half" | "full";
};

export default function FlameSvg({ state }: FlameSvgProps) {
  return (
    <div className={`flame-wrap ${state}`} id="flame-wrap">
      <div className="flame-glow" />
      <svg
        className="flame-svg"
        viewBox="0 0 100 180"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bigFlameOuter" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#b85a55" />
            <stop offset="35%" stopColor="#e23b4e" />
            <stop offset="75%" stopColor="#f48fb1" />
            <stop offset="100%" stopColor="#ffe9f0" />
          </linearGradient>
          <linearGradient id="bigFlameInner" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#f48fb1" stopOpacity="0" />
            <stop offset="55%" stopColor="#ffd3e1" stopOpacity=".75" />
            <stop offset="100%" stopColor="#fff6f0" />
          </linearGradient>
          <radialGradient id="bigFlameCore" cx="50%" cy="70%" r="55%">
            <stop offset="0%" stopColor="#fff6f0" />
            <stop offset="60%" stopColor="#ffd3e1" stopOpacity=".9" />
            <stop offset="100%" stopColor="#f48fb1" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M50 178
             C 18 178, 5 150, 8 110
             C 12 80, 30 70, 32 80
             C 34 92, 42 88, 40 78
             C 36 60, 30 40, 50 4
             C 60 28, 80 50, 85 100
             C 90 145, 78 178, 50 178 Z"
          fill="url(#bigFlameOuter)"
        />
        <path
          d="M50 165
             C 28 165, 22 138, 26 108
             C 30 90, 42 84, 42 92
             C 42 100, 50 96, 50 90
             C 50 78, 46 64, 52 46
             C 60 65, 76 88, 76 118
             C 76 145, 65 165, 50 165 Z"
          fill="url(#bigFlameInner)"
          opacity=".9"
        />
        <ellipse
          className="flame-core"
          cx="50"
          cy="135"
          rx="18"
          ry="28"
          fill="url(#bigFlameCore)"
        />
      </svg>
      <div className="wick" />
    </div>
  );
}
