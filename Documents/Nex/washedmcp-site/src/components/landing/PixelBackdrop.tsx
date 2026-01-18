"use client";

import { useMemo } from "react";
import PixelBlast from "@/components/PixelBlast";

export default function PixelBackdrop() {
  const config = useMemo(
    () => ({
      variant: "square" as const,
      pixelSize: 3,
      color: "#be38f3",
      patternScale: 2,
      patternDensity: 1,
      enableRipples: true,
      rippleSpeed: 0.3,
      rippleThickness: 0.1,
      rippleIntensityScale: 1,
      speed: 0.5,
      transparent: true,
      edgeFade: 0.18,
    }),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 noise-layer">
      {/* subtle base glow */}
      <div className="absolute inset-0 soft-radial" />

      {/* PixelBlast: center + oversize so it covers the full hero immediately */}
      <div className="absolute inset-0 flex items-center justify-center opacity-95">
        <div className="pixelblast-wrap relative h-[2200px] w-[2200px] sm:h-[2600px] sm:w-[2600px] lg:h-[3200px] lg:w-[3200px]">
          <PixelBlast {...config} className="" style={{}} />
        </div>
      </div>

      {/* scanlines (optional) */}
      <div className="scanline-overlay" />

      {/* vignette for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_12%,transparent_28%,rgba(0,0,0,0.55)_84%)]" />
    </div>
  );
}
