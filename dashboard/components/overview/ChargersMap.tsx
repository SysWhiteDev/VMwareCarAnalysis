"use client";
import React from "react";
import {PiMapPin} from "react-icons/pi";
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps";

const ChargersMap = (): React.JSX.Element => {
    return <div
        className={"flex-[1.8] text-red-700 dark:text-red-400 flex flex-col font-medium p-6 rounded-xl bg-neutral-100 border-neutral-300  dark:bg-neutral-950 border dark:border-neutral-800"}>
        <div className={"flex items-center text-sm justify-between mb-4"}>
            <p>Chargers Map</p>
            <PiMapPin className={"opacity-70"} size={20}/>
        </div>
        <div
            className={"flex flex-1 items-center justify-center rounded-md dark:bg-neutral-900 bg-neutral-200 overflow-hidden text-sm"}>
            <ComposableMap className={"h-full w-full"}>
                <ZoomableGroup>
                    <Geographies geography={"https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json"}>
                        {({geographies}) =>
                            geographies.map((geo) => (
                                <Geography key={geo?.rsmKey} geography={geo} className={"outline-none stroke-[1px] fill-neutral-950 stroke-neutral-800 dark:fill-neutral-100 dark:stroke-neutral-300"}/>
                            ))
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    </div>
}

export default ChargersMap;