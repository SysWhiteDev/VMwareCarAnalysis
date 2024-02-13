"use client";
import {Inter} from "next/font/google";
import "../globals.css";

const inter = Inter({subsets: ["latin"]});
import {useThemeStore} from "@/stores/themeStore";
import Sidebar from "@/components/global/Sidebar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const {theme} = useThemeStore();
    return (
        <html lang="en" className={theme}>
        <body className={`${inter.className} dark:text-white text-black dark:bg-neutral-950 bg-neutral-100`}>
            <Sidebar>{children}</Sidebar>
        </body>
        </html>
    );
}
