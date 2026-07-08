import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // статический экспорт для GitHub Pages; все ассеты уже в точных размерах,
  // оптимизатор картинок не нужен
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
