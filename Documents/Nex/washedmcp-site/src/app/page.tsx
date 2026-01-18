import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";

// Make sure these imports match your actual file names
import PixelBackdrop from "@/components/landing/PixelBackdrop";
// If you named the slider file "TokenStat.tsx", change this import to match:
import ProofCard from "@/components/landing/ProofCard"; 
import ProductTabs from "@/components/landing/ProductTabs";
import HeroDecrypted from "@/components/landing/HeroDecrypted";
import DecryptedText from "@/components/DecryptedText";

import { GitBranch, ScanSearch, Sparkles } from "lucide-react";

// This line below is what was missing or broken:
export default function Page() {
  return (
    <main className="relative min-h-screen bg-transparent">
      {/* Pixel Background */}
      <PixelBackdrop />
      
      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5" />
            <DecryptedText
              text="WashedMCP"
              animateOn="hover"
              speed={16}
              maxIterations={12}
              parentClassName="text-sm font-semibold"
              className="text-white/95"
              encryptedClassName="text-white/30"
            />
            <Badge className="bg-white/15 text-white/90 hover:bg-white/15">token-optimized</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-white/90 hover:bg-white/10 hover:text-white">
              Docs
            </Button>
            <Button asChild className="bg-white text-black hover:bg-white/90">
              <Link href="https://github.com/clarsbyte/washedmcp/tree/main">Get the MCP</Link>
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <HeroDecrypted />

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild className="bg-white text-black hover:bg-white/90">
                <Link href="https://github.com/clarsbyte/washedmcp/tree/main">Get the MCP</Link>
              </Button>
              <Button variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                See how it works
              </Button>
              <Badge className="bg-[rgba(190,56,243,0.18)] text-white hover:bg-[rgba(190,56,243,0.18)]">
                70k → 7k tokens
              </Badge>
              <Badge className="bg-white/10 text-white/85 hover:bg-white/10">
                $1.40 → $0.40 (3.5× cheaper)
              </Badge>
            </div>

            {/* Feature row */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Card className="border-white/10 bg-white/4 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <ScanSearch className="h-4 w-4 text-white/80" />
                  One-query code intel
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Semantic retrieval + relationship expansion in one pass.
                </div>
              </Card>

              <Card className="border-white/10 bg-white/4 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <GitBranch className="h-4 w-4 text-white/80" />
                  Context graph expansion
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Pull callers, callees, and related helpers automatically.
                </div>
              </Card>

              <Card className="border-white/10 bg-white/4 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-white/80" />
                  Costs drop hard
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Smaller contexts mean cheaper + faster agent loops.
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <ProofCard />
            <ProductTabs />

            <div className="rounded-2xl border border-white/10 bg-white/4 p-5 text-sm text-white/75 backdrop-blur-xl">
              <div className="font-semibold text-white">Backed by research</div>
              <div className="mt-2">
                Prompt compression: <span className="text-white/90">LLMLingua (EMNLP 2023)</span>
              </div>
              <div className="mt-1">
                Graph retrieval: <span className="text-white/90">Graph RAG for QFS (2024)</span>
              </div>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="mt-20">
          <div className="text-sm font-semibold text-white">How it works</div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Card className="border-white/10 bg-white/4 p-5 backdrop-blur-xl">
              <div className="text-xs uppercase tracking-widest text-white/60">1</div>
              <div className="mt-2 text-lg font-semibold">Embed the repo</div>
              <div className="mt-2 text-sm text-white/70">
                Index code in Chroma so retrieval is semantic, not file-based.
              </div>
            </Card>

            <Card className="border-white/10 bg-white/4 p-5 backdrop-blur-xl">
              <div className="text-xs uppercase tracking-widest text-white/60">2</div>
              <div className="mt-2 text-lg font-semibold">Retrieve the core</div>
              <div className="mt-2 text-sm text-white/70">
                Pull only the functions/classes that answer the question.
              </div>
            </Card>

            <Card className="border-white/10 bg-white/4 p-5 backdrop-blur-xl">
              <div className="text-xs uppercase tracking-widest text-white/60">3</div>
              <div className="mt-2 text-lg font-semibold">Expand the edges</div>
              <div className="mt-2 text-sm text-white/70">
                Attach callers/callees/helpers so the agent has *enough* context, not *all* context.
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 border-t border-white/10 py-10 text-sm text-white/50">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>WashedMCP — code-aware context, washed clean.</div>
            <div className="flex items-center gap-4">
              <span>GitHub</span>
              <span>Docs</span>
              <span>Demo</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}