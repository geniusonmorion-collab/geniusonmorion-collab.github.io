import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const interDisplay = localFont({
  src: [
    { path: "./fonts/InterDisplay-Medium.woff2", weight: "500" },
    { path: "./fonts/InterDisplay-SemiBold.woff2", weight: "600" },
    { path: "./fonts/InterDisplay-Bold.woff2", weight: "700" },
    { path: "./fonts/InterDisplay-ExtraBold.woff2", weight: "800" },
  ],
  variable: "--font-inter-display",
});

export const metadata: Metadata = {
  title: "Архитектура роста бизнеса для селлеров — конференция RWB",
  description:
    "Конференция о решениях, после которых бизнес начинает работать по-другому. 14.02, Центр событий РБК.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${interDisplay.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
