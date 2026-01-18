"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function ProductTabs() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <Tabs defaultValue="wash" className="w-full">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">Two products</div>
          <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/10">
            MCP • LeanMCP deploy
          </Badge>
        </div>

        <TabsList className="mt-4 grid w-full grid-cols-2 bg-white/5">
          <TabsTrigger value="wash">Token Wash</TabsTrigger>
          <TabsTrigger value="cursor">Cursor for MCPs</TabsTrigger>
        </TabsList>

        <TabsContent value="wash" className="mt-4 space-y-3">
          <div className="text-lg font-semibold">Chroma-backed code memory</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>• Store your repo as embeddings (semantic index)</li>
            <li>• Retrieve only relevant functions instead of entire files</li>
            <li>• Expand context via callers, callees, and related code edges</li>
            <li>• One query returns code + relationships, not 10+ redundant searches</li>
          </ul>
        </TabsContent>

        <TabsContent value="cursor" className="mt-4 space-y-3">
          <div className="text-lg font-semibold">Ask for outcomes, get the right MCP</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>• “I need X done” → routes to the best MCP toolchain</li>
            <li>• Reduces tool spam and “which MCP do I use?” friction</li>
            <li>• Ships as one MCP that can discover/compose others</li>
            <li>• Built for fast demos and production multi-client access</li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}
