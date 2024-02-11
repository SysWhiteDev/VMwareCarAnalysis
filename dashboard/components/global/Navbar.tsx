"use client";
import React from "react";
import {FaAngleRight} from "react-icons/fa";
import {usePathname} from "next/navigation";

type pagesTypes = {
    [key: string]: string;
}
let pages: pagesTypes = {
    activity: "Activity Log",
}

const Navbar = (): React.JSX.Element => {
    const path = usePathname();
    let pathArray = path.split("/");

    return (
        <div
            className={"flex fixed top-0 z-50 h-[60px] justify-between items-center w-full px-6 pr-3 dark:bg-neutral-950 dark:text-white text-black dark:border-neutral-800 bg-neutral-100 dark:border-opacity-100 border-opacity-15 border-b-[1px] border-black"}>
            <div className={"flex items-center gap-1 text-sm"}>
                <p className={"dark:opacity-70"}>SysWhite</p>
                {pathArray.map((item, index) => {
                    if (index > 0) {
                        return (
                            <React.Fragment key={index}>
                                <p className={"font-extralight opacity-50 dark:opacity-100 text-base"}><FaAngleRight/>
                                </p>
                                {path == "/" ? (
                                    <p className={"dark:opacity-70"}>Overview</p>
                                ) : (
                                    <p className={"dark:opacity-70"}>{pages[item] ? pages[item] : item}</p>
                                )}
                            </React.Fragment>
                        )
                    }
                })}
            </div>
            <p className={"text-sm flex items-center justify-center bg-neutral-200 dark:bg-neutral-600 rounded-full border-[1px] border-opacity-15 dark:border-opacity-65 border-neutral-500 gap-1 cursor-pointer text-black dark:text-white h-[37px] w-[37px]"}>SW</p>
        </div>
    )
}

export default Navbar;