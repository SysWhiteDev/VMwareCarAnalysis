"use client";
import React from "react";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
const stationSettingsPage = (): React.JSX.Element => {
    const params = useSearchParams();
    const router = useRouter();
    const page = params.get("page");
    return (
        <>
            <div  id={"title"} />
            <div className={"border-b-[1px] dark:border-neutral-800 border-black border-opacity-15 dark:border-opacity-100 py-8"}>
                <p className={"text-3xl font-bold max-w-5xl mx-auto px-4 xl:px-0"}>Station settings</p>
            </div>
            <div className={"max-w-5xl flex mx-auto mt-5 gap-2 px-4 xl:px-0"}>
                <div className={"flex flex-col gap-2 justify-start text-sm  w-[200px] mr-2"}>
                    <div
                        onClick={() => router.push(`?page=general`)}
                        className={`hover:dark:bg-neutral-900 hover:bg-neutral-200  transition-all px-4 py-2 cursor-pointer rounded-md sticky top-[125px] ${(page == "general" || !page) && "dark:bg-neutral-900 bg-neutral-200"}`}>
                        <p>General</p>
                    </div>
                </div>
                <div className={"w-full"}>
                    {(page == "general" || !page) && (
                        <div className={"w-full"}>
                            <div
                                className={`flex flex-col p-4 rounded-md bg-neutral-200 border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white border-[1px]`}>
                                <p className={"font-medium text-lg"}>General info</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default stationSettingsPage;