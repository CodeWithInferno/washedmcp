"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import DecryptedText from "@/components/DecryptedText";

function formatCompact(n: number) {
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return `${n}`;
}

// Mini graph SVG glyph component
function GraphGlyph({ ratio }: { ratio: number }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10"
    >
      {/* Background circle */}
      <circle cx="20" cy="20" r="18" fill="rgba(190, 56, 243, 0.12)" />
      
      {/* Bars representing compression */}
      <rect
        x="10"
        y="12"
        width="6"
        height="18"
        rx="1.5"
        fill="rgba(255, 255, 255, 0.25)"
      />
      <rect
        x="10"
        y={12 + 18 * (1 - 1)}
        width="6"
        height={18}
        rx="1.5"
        fill="rgba(255, 255, 255, 0.6)"
      />
      
      {/* Arrow */}
      <path
        d="M20 20 L24 20"
        stroke="rgba(190, 56, 243, 0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M22 18 L24 20 L22 22"
        stroke="rgba(190, 56, 243, 0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Compressed bar */}
      <rect
        x="26"
        y="12"
        width="6"
        height="18"
        rx="1.5"
        fill="rgba(255, 255, 255, 0.15)"
      />
      <rect
        x="26"
        y={12 + 18 * (1 - ratio)}
        width="6"
        height={18 * ratio}
        rx="1.5"
        fill="rgba(190, 56, 243, 0.8)"
      />
    </svg>
  );
}

// Context budget presets
const PRESETS = [
  { before: 70000, after: 7000, label: "7k" },
  { before: 70000, after: 20000, label: "20k" },
  { before: 70000, after: 70000, label: "70k" },
] as const;

export default function TokenStat() {
  const [presetIndex, setPresetIndex] = useState(0);
  const { before, after } = PRESETS[presetIndex];

  const pct = useMemo(() => 1 - after / before, [after, before]);
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 250);
    return () => clearTimeout(t);
  }, []);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    setPresetIndex(newIndex);
    setKey(k => k + 1); // Reset animation
  }, []);

  const line = `${formatCompact(before)} → ${formatCompact(after)} tokens`;
  const savings = after < before ? `${Math.round(pct * 100)}% fewer tokens` : "Full context";
  const multiplier = after < before ? `${Math.round(before / after)}× smaller` : "No compression";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 px-5 py-4 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="text-xs uppercase tracking-widest text-white/60">
            Context budget
          </div>

          <div className="mt-2 text-lg font-semibold">
            {show ? (
              <DecryptedText
                key={key}
                text={line}
                animateOn="view"
                revealDirection="center"
                speed={22}
                maxIterations={14}
                className="text-white"
                encryptedClassName="text-white/25"
                parentClassName="font-mono"
              />
            ) : (
              <span className="font-mono">{line}</span>
            )}
          </div>

          <div className="mt-1 text-sm text-white/60">
            {savings} • {multiplier}
          </div>
        </div>

        <GraphGlyph ratio={after / before} />
      </div>

      {/* Interactive slider */}
      <div className="mt-4 space-y-2">
        <input
          type="range"
          min={0}
          max={PRESETS.length - 1}
          step={1}
          value={presetIndex}
          onChange={handleSliderChange}
          className="context-slider"
        />
        <div className="flex justify-between text-xs text-white/50">
          {PRESETS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => {
                setPresetIndex(i);
                setKey(k => k + 1);
              }}
              className={`transition-colors ${
                i === presetIndex ? "text-white font-medium" : "hover:text-white/70"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-linear-to-r from-[rgba(190,56,243,0.8)] to-white/80 transition-all duration-300"
          style={{ width: `${Math.round(pct * 100)}%` }}
        />
      </div>
    </div>
  );
}
