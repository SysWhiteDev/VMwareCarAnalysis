"use client";
import React from "react";
import {PiMapPin} from "react-icons/pi";
import {Spinner} from "planimetria";

const ChargersMap = (): React.JSX.Element => {
    return <div
        className={"flex-[1.8] text-red-700 dark:text-red-400 flex flex-col font-medium p-6 rounded-xl bg-neutral-100 border-neutral-300  dark:bg-neutral-950 border dark:border-neutral-800"}>
        <div className={"flex items-center text-sm justify-between mb-4"}>
            <p>Chargers Map</p>
            <PiMapPin className={"opacity-70"} size={20}/>
        </div>
        <div
            className={"flex flex-1 items-center justify-center rounded-md dark:bg-neutral-900 bg-neutral-200 overflow-hidden text-sm"}>
            <Spinner className={"dark:fill-white fill-black"} size={42}/>
        </div>
    </div>
}

export default ChargersMap;