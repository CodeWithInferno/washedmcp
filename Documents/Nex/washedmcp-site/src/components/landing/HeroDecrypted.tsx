"use client";

import { useEffect, useState } from "react";
import DecryptedText from "@/components/DecryptedText";

export default function HeroDecrypted() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 80);
    const t2 = setTimeout(() => setStage(2), 260);
    const t3 = setTimeout(() => setStage(3), 460);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div>
      {/* HERO HEADLINE (auto decrypt on view) */}
      <DecryptedText
        text="Stop feeding your agent the whole repo."
        animateOn="view"
        revealDirection="center"
        sequential
        speed={12}
        maxIterations={18}
        parentClassName="hero-title block text-5xl font-bold leading-[0.95] sm:text-6xl"
        className="text-white"
        encryptedClassName="text-white/18"
      />

      {/* SUBHEAD (staged decrypt for premium pacing) */}
      <div className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
        {stage >= 1 ? (
          <DecryptedText
            text="WashedMCP returns only the code that matters — plus the edges around it"
            animateOn="view"
            revealDirection="start"
            sequential
            speed={10}
            maxIterations={16}
            parentClassName="block"
            className="text-white/75"
            encryptedClassName="text-white/20"
          />
        ) : (
          <span className="block opacity-0">.</span>
        )}

        {stage >= 2 ? (
          <DecryptedText
            text="(callers, callees, related functions). Less browsing. Same answers."
            animateOn="view"
            revealDirection="start"
            sequential
            speed={10}
            maxIterations={16}
            parentClassName="mt-1 block"
            className="text-white/75"
            encryptedClassName="text-white/20"
          />
        ) : (
          <span className="block opacity-0">.</span>
        )}

        {stage >= 3 ? (
          <DecryptedText
            text="Example context shrink: 70k → 7k tokens."
            animateOn="both"
            revealDirection="center"
            speed={18}
            maxIterations={14}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789→"
            parentClassName="mt-3 inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-sm"
            className="text-white"
            encryptedClassName="text-white/25"
          />
        ) : null}
      </div>
    </div>
  );
}
