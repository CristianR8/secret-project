export default function OverfitBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Layer 1: Animated gradient base */}
      <div className="overfit-gradient absolute inset-0" />

      {/* Layer 2: Gold radial spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 40%, rgba(196,149,106,0.12), transparent 70%)",
        }}
      />

      {/* Layer 3: SVG loss curves — the overfitting signature */}
      <svg
        viewBox="0 0 800 400"
        className="absolute left-1/2 top-[45%] h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 md:h-[90%] md:w-[85%]"
        fill="none"
      >
        {/* Subtle axis lines */}
        <line
          x1="60" y1="350" x2="740" y2="350"
          stroke="rgba(196,149,106,0.04)"
          strokeWidth="1"
        />
        <line
          x1="60" y1="50" x2="60" y2="350"
          stroke="rgba(196,149,106,0.04)"
          strokeWidth="1"
        />
        {/* Training loss: smooth descent, flattening */}
        <path
          d="M 60 340 C 120 320, 180 260, 250 200 S 380 100, 500 70 S 620 50, 740 45"
          stroke="rgba(196,149,106,0.18)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="overfit-curve-draw"
        />
        {/* Validation loss: descent then divergence upward */}
        <path
          d="M 60 335 C 120 315, 180 255, 250 200 S 350 130, 420 110 C 480 100, 540 120, 600 170 S 680 260, 740 310"
          stroke="rgba(212,165,116,0.13)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 4"
          className="overfit-curve-draw-delayed"
        />
        {/* Divergence point marker with glow */}
        <circle
          cx="420" cy="110"
          r="5"
          fill="rgba(196,149,106,0.06)"
          stroke="rgba(196,149,106,0.15)"
          strokeWidth="1"
          className="overfit-curve-draw-delayed"
        />
        <circle
          cx="420" cy="110"
          r="12"
          fill="none"
          stroke="rgba(196,149,106,0.05)"
          strokeWidth="1"
          className="overfit-curve-draw-delayed"
        />

        {/* Scattered data points — overfitting to noise */}
        {[
          [90, 330], [140, 290], [195, 250], [260, 185],
          [310, 155], [370, 125], [430, 105], [490, 85],
          [540, 130], [590, 175], [640, 220], [700, 285],
          [170, 270], [320, 140], [470, 75], [560, 145], [650, 240],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="2"
            fill={`rgba(196,149,106,${0.04 + (i % 3) * 0.02})`}
          />
        ))}

        {/* Curve labels */}
        <text
          x="745" y="40"
          fill="rgba(196,149,106,0.12)"
          fontSize="9"
          fontFamily="monospace"
          className="overfit-curve-draw"
        >
          train
        </text>
        <text
          x="745" y="318"
          fill="rgba(212,165,116,0.09)"
          fontSize="9"
          fontFamily="monospace"
          className="overfit-curve-draw-delayed"
        >
          test
        </text>

        {/* Axis labels — very subtle */}
        <text
          x="400" y="372"
          textAnchor="middle"
          fill="rgba(196,149,106,0.045)"
          fontSize="10"
          fontFamily="monospace"
          letterSpacing="0.1em"
        >
          epochs
        </text>
        <text
          x="38" y="200"
          textAnchor="middle"
          fill="rgba(196,149,106,0.045)"
          fontSize="10"
          fontFamily="monospace"
          letterSpacing="0.1em"
          transform="rotate(-90, 38, 200)"
        >
          accuracy
        </text>
      </svg>

      {/* Layer 4: Noise texture */}
      <div className="overfit-noise absolute inset-0 opacity-[0.04]" />
    </div>
  );
}
