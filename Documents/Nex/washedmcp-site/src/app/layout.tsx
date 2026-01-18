import type { Metadata } from "next";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

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
        {children}
      </body>
    </html>
  );
}
