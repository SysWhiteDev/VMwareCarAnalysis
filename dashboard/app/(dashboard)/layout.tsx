"use client";
import {Inter} from "next/font/google";
import "../globals.css";

const inter = Inter({subsets: ["latin"]});
import {useThemeStore} from "@/stores/themeStore";
import Sidebar from "@/components/global/Sidebar";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const {theme} = useThemeStore();
    return (
        <html lang="en" className={theme}>
        <body className={`${inter.className} dark:text-white text-black dark:bg-neutral-950 bg-neutral-100`}>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName={"!bg-neutral-100 !border-opacity-15 !border-[1px] !border-black !text-black dark:!border-opacity-100 dark:!bg-neutral-950 dark:!border-neutral-800 dark:!border-[1px] dark:!text-white dark:!fill-white"}
            />
            <Sidebar>{children}</Sidebar>
        </body>
        </html>
    );
}
