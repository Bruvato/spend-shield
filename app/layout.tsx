import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import type { Metadata } from "next";
import MouseMoveEffect from "../components/mouse-move-effect";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpendShield",
  description:
    "SpendShield is a social media finance app that gamifies saving money into a fun, competitive, and engaging experience! By combining peer support, friendly competition, and smart financial insights, SpendShield helps users build better spending habits—together.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        <MouseMoveEffect />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
