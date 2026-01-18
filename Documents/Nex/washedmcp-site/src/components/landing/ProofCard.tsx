"use client";

import DecryptedText from "@/components/DecryptedText";
import { Badge } from "@/components/ui/badge";

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function formatK(n: number) {
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return `${n}`;
}

export default function ProofCard() {
  const tokensBefore = 70000;
  const tokensAfter = 7000;

  const costBefore = 1.4;
  const costAfter = 0.4;

  const tokenFewerPct = Math.round((1 - tokensAfter / tokensBefore) * 100); // 90
  const costFewerPct = Math.round((1 - costAfter / costBefore) * 100); // 71
  const cheaperX = (costBefore / costAfter).toFixed(1); // 3.5

  // bar widths (after relative to before)
  const tokenAfterW = clamp((tokensAfter / tokensBefore) * 100, 6, 100); // min visible
  const costAfterW = clamp((costAfter / costBefore) * 100, 6, 100);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60">
            Proof (at a glance)
          </div>
          <div className="mt-2 text-lg font-semibold text-white">
            Less context. Less cost. Same answers.
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <Badge className="bg-[rgba(190,56,243,0.18)] text-white hover:bg-[rgba(190,56,243,0.18)]">
            {tokenFewerPct}% fewer tokens
          </Badge>
          <Badge className="bg-white/10 text-white/85 hover:bg-white/10">
            {cheaperX}× cheaper
          </Badge>
          <Badge className="bg-white/10 text-white/85 hover:bg-white/10">
            {costFewerPct}% lower cost
          </Badge>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {/* TOKENS ROW */}
        <div className="rounded-xl border border-white/10 bg-black/20 p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs uppercase tracking-widest text-white/55">
              Context size
            </div>
            <div className="text-xs text-white/55">tokens</div>
          </div>

          <div className="mt-2 text-3xl font-semibold text-white">
            <DecryptedText
              text={`${formatK(tokensBefore)} → ${formatK(tokensAfter)} tokens`}
              animateOn="view"
              revealDirection="center"
              sequential
              speed={10}
              maxIterations={18}
              parentClassName="font-mono"
              className="text-white"
              encryptedClassName="text-white/25"
            />
          </div>

          <div className="mt-4">
            <div className="text-xs text-white/55">Before</div>
            <div className="mt-1 h-2 w-full rounded-full bg-white/10">
              <div className="h-2 w-full rounded-full bg-white/55" />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-white/55">After</div>
              <div className="text-xs text-white/55">{tokenFewerPct}% fewer</div>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-[rgba(190,56,243,0.85)]"
                style={{ width: `${tokenAfterW}%` }}
              />
            </div>
          </div>
        </div>

        {/* COST ROW */}
        <div className="rounded-xl border border-white/10 bg-black/20 p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs uppercase tracking-widest text-white/55">
              Cost per run
            </div>
            <div className="text-xs text-white/55">USD</div>
          </div>

          <div className="mt-2 text-3xl font-semibold text-white">
            <DecryptedText
              text={`$${costBefore.toFixed(2)} → $${costAfter.toFixed(2)}`}
              animateOn="view"
              revealDirection="center"
              sequential
              speed={10}
              maxIterations={18}
              parentClassName="font-mono"
              className="text-white"
              encryptedClassName="text-white/25"
            />
          </div>

          <div className="mt-4">
            <div className="text-xs text-white/55">Baseline</div>
            <div className="mt-1 h-2 w-full rounded-full bg-white/10">
              <div className="h-2 w-full rounded-full bg-white/55" />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-white/55">With WashedMCP</div>
              <div className="text-xs text-white/55">{cheaperX}× cheaper</div>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-[rgba(190,56,243,0.85)]"
                style={{ width: `${costAfterW}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}