"use client";

import { useEffect, useId, useRef } from "react";

type ScrollLineProps = {
  className?: string;
  d?: string;
  viewBox?: string;
  preserveAspectRatio?: string;
  color?: string;
  trackColor?: string;
  bikeSize?: number;
  showBike?: boolean;
  bikeImageSrc?: string;
};

export default function ScrollLine({
  className = "",
  d = "M10 190 L10 100 L 300 100 L 500 20",
  viewBox = "0 0 649 202",
  preserveAspectRatio = "xMidYMid meet",
  color = "#e1251b",
  trackColor = "#1a1a1a",
  bikeSize = 30,
  showBike = true,
  bikeImageSrc,
}: ScrollLineProps) {
  const maskId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const bikeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const maskPath = maskPathRef.current;
    if (!wrap || !maskPath) return;

    const [, , viewW, viewH] = viewBox.split(/\s+/).map(Number);

    const length = maskPath.getTotalLength();
    maskPath.style.strokeDasharray = `${length}`;
    maskPath.style.strokeDashoffset = `${length}`;

    let ticking = false;

    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));

      maskPath.style.strokeDashoffset = `${length * (1 - progress)}`;

      if (bikeRef.current && rect.width && rect.height) {
        const dist = progress * length;
        const point = maskPath.getPointAtLength(dist);
        const ahead = maskPath.getPointAtLength(Math.min(length, dist + 1));
        const angle = Math.max(
          -20,
          Math.min(20, (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI)
        );

        // Counter-scale so the bike keeps its true proportions even when the
        // SVG itself is stretched non-uniformly (preserveAspectRatio="none").
        const sx = rect.width / viewW;
        const sy = rect.height / viewH;

        bikeRef.current.setAttribute(
          "transform",
          `translate(${point.x} ${point.y}) rotate(${angle}) scale(${1 / sx} ${1 / sy})`
        );
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <svg
        viewBox={viewBox}
        preserveAspectRatio={preserveAspectRatio}
        fill="none"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <mask id={maskId}>
            <path ref={maskPathRef} d={d} stroke="#fff" strokeWidth={16} strokeLinecap="round" />
          </mask>
        </defs>

        {/* Faint full route, always visible so you can see the road ahead */}
        <path
          d={d}
          stroke={trackColor}
          strokeOpacity={0.15}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="2 10"
        />

        {/* Bright route, revealed progressively as you scroll */}
        <path
          d={d}
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="2 10"
          mask={`url(#${maskId})`}
        />

        {showBike && (
          <g ref={bikeRef}>
            {bikeImageSrc ? (
              <image
                href={bikeImageSrc}
                x={-bikeSize / 2}
                y={-bikeSize * 0.375}
                width={bikeSize}
                height={bikeSize * 0.75}
                style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))" }}
              />
            ) : (
              <text
                fill="#1a1a1a"
                fontSize={bikeSize}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))" }}
              >
                🚲
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
