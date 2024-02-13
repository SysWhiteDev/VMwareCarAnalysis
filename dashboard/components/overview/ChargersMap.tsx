"use client";
import React from "react";
import {PiMapPin} from "react-icons/pi";
import {ComposableMap, Geographies, Geography, Marker, ZoomableGroup} from "react-simple-maps";

const ChargersMap = (): React.JSX.Element => {
    return <div
        className={"flex-[1.8] text-red-700 dark:text-red-400 flex flex-col font-medium p-6 rounded-xl bg-neutral-100 border-neutral-300  dark:bg-neutral-950 border dark:border-neutral-800"}>
        <div className={"flex items-center text-sm justify-between mb-4"}>
            <p>Chargers Map</p>
            <PiMapPin className={"opacity-70"} size={20}/>
        </div>
        <div
            className={"flex flex-1 items-center justify-center rounded-md dark:bg-neutral-900 bg-neutral-200 overflow-hidden text-sm"}>
            <ComposableMap>
                <ZoomableGroup zoom={1} minZoom={0.7}>
                    <Geographies geography={"https://unpkg.com/world-atlas@1/world/110m.json"}>
                        {({geographies}) =>
                            geographies.map((geo) => (
                                <Geography key={geo?.rsmKey}
                                           className={"dark:fill-white stroke-[0.5px] dark:stroke-neutral-300 stroke-neutral-800 outline-none"}
                                           geography={geo}/>
                            ))
                        }
                    </Geographies>
                    {Array(2).fill("").map(() => (
                        <Marker key={Math.random()} coordinates={[Math.random() *  900, Math.random() *  1800]}>
                            {/*<circle className={"animate-ping duration-1000"} r={2} fill="#00b038"/>*/}
                            <circle r={2} className={"fill-yellow-700 dark:fill-yellow-400"}/>
                        </Marker>
                    ))}
                    {Array(1).fill("").map(() => (
                        <Marker key={Math.random()} coordinates={[Math.random() *  900, Math.random() *  1800]}>
                            {/*<circle className={"animate-ping duration-1000"} r={2} fill="#00b038"/>*/}
                            <circle r={2} className={"fill-cyan-700 dark:fill-cyan-500"}/>
                        </Marker>
                    ))}
                    {Array(5).fill("").map(() => (
                        <Marker key={Math.random()} coordinates={[Math.random() *  900, Math.random() *  1800]}>
                            <circle className={"animate-ping duration-1000"} r={2} fill="#b00000"/>
                            <circle r={2} fill="#b00000"/>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    </div>
}

export default ChargersMap;