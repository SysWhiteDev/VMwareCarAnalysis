"use client";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import {useThemeStore} from "@/stores/themeStore";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {theme} = useThemeStore();
  return (
    <html lang="en" className={theme}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
