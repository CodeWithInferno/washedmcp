import type { Metadata } from "next";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";

export const metadata: Metadata = {
  title: "WashedMCP",
  description: "Token-optimized code context for AI agents.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Clash Display for hero headings (Fontshare embed) */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="177c3580-b3f2-4493-9776-8a8d9c72a70c"
        />
        {children}
      </body>
    </html>
  );
}
