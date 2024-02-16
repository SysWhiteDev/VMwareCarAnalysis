"use client";
import React, {useEffect} from "react";
import {FaAngleRight, FaMoon, FaSignOutAlt, FaSun} from "react-icons/fa";
import {usePathname} from "next/navigation";
import useAuth from "@/hooks/useAuth";
import {useThemeStore} from "@/stores/themeStore";
import jsCookie from "js-cookie";

type pagesTypes = {
    [key: string]: string;
}
let pages: pagesTypes = {
    activity: "Activity Log",
    stations: "Charging Stations",
}

const Navbar = (): React.JSX.Element => {
    const {logout, getUserData} = useAuth();
    const {theme, setTheme} = useThemeStore()
    const path = usePathname();
    let pathArray = path.split("/");
    const [openAccountMenu, setOpenAccountMenu] = React.useState<boolean>(false);
    const [username, setUsername] = React.useState<string>("default");

    const getMainTwoLetters = (name: string) => {
        let trimmedName = name.trim();
        if (trimmedName.length >=  2) {
            return trimmedName.substring(0, 2).toUpperCase();
        } else {
            return trimmedName.toUpperCase();
        }
    }

    useEffect(() => {
        const getUsername = async () => {
            setUsername((await getUserData()).username);
        }
        setTheme(jsCookie.get("theme") ? jsCookie.get("theme") as string : "light");
        getUsername().then(r => r);
    }, []);

    const switchTheme = (theme: string) => {
        setTheme(theme);
        jsCookie.set("theme", theme);
    }

    return (
        <div
            className={"flex fixed top-0 right-0 left-[250px] z-50 h-[60px] justify-between items-center px-6 dark:bg-neutral-950 dark:text-white text-black dark:border-neutral-800 bg-neutral-100 dark:border-opacity-100 border-opacity-15 border-b-[1px] border-black"}>
            <div className={"flex items-center gap-1 text-sm"}>
                <p className={"dark:opacity-70"}>{username}</p>
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
            <div className={"relative"}>
                <p onClick={() => setOpenAccountMenu(true)}
                   className={"text-xs ml-auto z-50 flex items-center justify-center bg-neutral-200 dark:bg-neutral-600 rounded-full border-[1px] border-opacity-15 dark:border-opacity-65 border-neutral-500 gap-1 cursor-pointer text-black dark:text-white h-[37px] w-[37px]"}>{getMainTwoLetters(username)}</p>
                <>
                    <div onClick={() => setOpenAccountMenu(false)}
                         className={`${!openAccountMenu && "pointer-events-none"} fixed top-0 left-0 right-0 bottom-0`}/>
                    <div
                        className={`${openAccountMenu && "opacity-100 pointer-events-auto"} pointer-events-none duration-[100ms] opacity-0 absolute rounded-md top-0 mt-[45px] shadow min-w-[250px] right-0 flex flex-col bg-neutral-200 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 border p-4`}>
                        <p className={"text-xl mx-auto z-50 flex items-center justify-center bg-neutral-100 dark:bg-neutral-600 rounded-full border-[1px] border-opacity-15 dark:border-opacity-65 border-neutral-500 gap-1 text-black dark:text-white h-[80px] w-[80px]"}>{getMainTwoLetters(username)}</p>
                        <p className={"mx-auto text-center mt-1"}>{username}</p>
                        <div
                            className={"bg-neutral-300 select-none dark:text-white text-black dark:bg-neutral-800 p-2 rounded-md mt-8 text-sm gap-3 flex flex-col"}>
                            <div
                                onClick={() => switchTheme(theme === "dark" ? "light" : "dark")}
                                className={"flex justify-between items-center px-1 cursor-pointer hover:opacity-80"}>
                                {
                                    theme === "dark" ? (
                                        <FaSun className={"inline-block w-[18px]"}/>
                                    ) : (
                                        <FaMoon className={"inline-block w-[18px]"}/>
                                    )
                                }
                                <p>Change theme</p>
                            </div>
                            <div onClick={() => {
                                logout();
                                setOpenAccountMenu(false)
                            }}
                                 className={"flex justify-between items-center px-1 text-red-700 dark:text-red-400 cursor-pointer hover:opacity-80"}>
                                <FaSignOutAlt className={"inline-block rotate-180 w-[18px]"}/>
                                <p>Log out</p>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}

export default Navbar;