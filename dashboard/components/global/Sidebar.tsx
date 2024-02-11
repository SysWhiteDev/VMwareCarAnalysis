"use client";
import React from 'react';
import {usePathname} from "next/navigation";
import {LuClipboardList, LuHome, LuCamera, LuPlug} from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/global/Navbar";

type SidebarProps = {
    children: React.ReactNode
}
const Sidebar = ({children}: SidebarProps): React.JSX.Element => {
    const path = usePathname();

    return (
        <div className={"flex z-20"}>
            <div
                className={"flex fixed flex-shrink-0 overflow-x-hidden items-center justify-between w-[250px] flex-col dark:bg-neutral-950 dark:text-white text-black dark:border-neutral-800 bg-neutral-100 dark:border-opacity-100 border-opacity-15 h-dvh border-r-[1px] border-black"}>
                <div className={"w-full flex flex-col items-center gap-1"}>
                    <div
                        className={"font-medium h-[60px] w-full text-center text-cyan-600 dark:text-cyan-500 text-md border-b-[1px] dark:border-neutral-800 dark:border-opacity-100 border-opacity-15 border-black"}>
                        <Image src={"/assets/banner.png"} alt={"evgagement banner"} className={"invert dark:filter-none"} width={250} height={60}/>
                    </div>
                    <Link
                        className={`${path === "/" && "!text-black dark:!text-white !bg-neutral-200 dark:!bg-neutral-900"} relative transition-all w-full py-1.5 px-4 flex justify-start items-center text-neutral-600 dark:text-neutral-500 hover:dark:bg-neutral-900 hover:bg-neutral-200 hover:shadow`}
                        href={"/"}><LuHome className={"mr-2.5"} size={20}/><p className={"text-md"}>Overview</p>
                    </Link>
                    <Link
                        className={`${path === "/cameras" && "!text-black dark:!text-white !bg-neutral-200 dark:!bg-neutral-900"} transition-all w-full py-1.5 px-4 flex justify-start items-center text-neutral-600 dark:text-neutral-500 hover:dark:bg-neutral-900 hover:bg-neutral-200 hover:shadow`}
                        href={"/cameras"}><LuCamera className={"mr-2.5"} size={20}/><p className={"text-md"}>Camera
                        feeds</p>
                    </Link>
                </div>
                <div className={"w-full flex flex-col items-center gap-1"}>
                    <Link
                        className={`${path === "/stations" && "!text-black dark:!text-white !bg-neutral-200 dark:!bg-neutral-900"}cd transition-all w-full py-1.5 px-4 flex justify-start items-center text-neutral-600 dark:text-neutral-500 hover:dark:bg-neutral-900 hover:bg-neutral-200 hover:shadow`}
                        href={"/stations"}><LuPlug className={"mr-2.5"} size={20}/><p
                        className={"text-md"}>Stations</p>
                    </Link>
                    <Link
                        className={`${path === "/activity" && "!text-black dark:!text-white !bg-neutral-200 dark:!bg-neutral-900"} mb-1 transition-all w-full py-1.5 px-4 flex justify-start items-center text-neutral-600 dark:text-neutral-500 hover:dark:bg-neutral-900 hover:bg-neutral-200 hover:shadow`}
                        href={"/activity"}><LuClipboardList className={"mr-2.5"} size={20}/><p
                        className={"text-md"}>Activity log</p>
                    </Link>
                </div>
            </div>
            <div className={"ml-[250px] flex flex-col w-full"}>
                <Navbar />
                <div className={"p-2 z-0 relative mt-[60px]"}>{children}</div>
            </div>
        </div>
    )
}

export default Sidebar