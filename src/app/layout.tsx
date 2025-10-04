import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIMINAL 2.0 — For People",
  description: "Daily cycle: morning insights & evening reflection",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
