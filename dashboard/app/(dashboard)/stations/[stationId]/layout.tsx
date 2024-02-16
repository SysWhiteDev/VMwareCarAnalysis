"use client";
import React, {useState} from "react";
import Image from "next/image";
import {Button, Spinner} from "planimetria";
import Link from "next/link";

const stationIdPage = ({params, children}: { children: any, params: { stationId: string } }): React.JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true)

    return (
        <>
            {
                loading ? (
                    <div
                        className={"p-12 text-center flex justify-center items-center dark:text-neutral-300 text-neutral-700"}>
                        <Spinner size={24}/>
                        <p className={"ml-3"}>Getting the station's secrets...</p>
                    </div>
                ) : (
                    <>
                        {/*header div*/}
                        <div
                            className={"py-4 overflow-hidden bg-opacity-40 dark:bg-opacity-100 dark:bg-blue-800 bg-blue-100 relative dark:border-opacity-100 border-opacity-15 border-b-[1px] border-black dark:border-neutral-800"}>
                            <div className={"flex justify-between items-end px-4 mx-auto max-w-5xl"}>
                                <Image draggable={false}
                                       className={"absolute select-none pointer-events-none right-0 left-0 bottom-0 top-0 z-0 opacity-10 fill-white"}
                                       src={"/assets/grid.svg"} width={4000} height={4000} alt={"grid"}/>
                                <div className={"py-4 mb-4 z-10"}>
                                    <h1 className={"font-bold text-3xl flex items-center"}>Station 1 <span
                                        className="ml-2 text-xs dark:bg-green-400 bg-green-300 dark:text-black text-green-800 px-1.5 py-0.5 rounded-md">Online</span>
                                    </h1>
                                    <h2 className={"opacity-70"}>ID: {params.stationId}</h2>
                                    <div className={"mt-4 flex gap-2"}>
                                        <Button className={"text-left"}>Request Data</Button>
                                        <Button type={"secondary"}>Reboot</Button>
                                        <Button type={"destructive"}>Delete</Button>
                                    </div>
                                </div>
                                <Image className={"z-10"} src={"/assets/chargingStations/station.png"} width={375}
                                       height={375}
                                       alt={"Charging station image"}/>
                            </div>
                        </div>
                        {/*content navbar div*/}
                        <div
                            className={"sticky top-[60px] dark:bg-neutral-950 z-50 text-sm dark:text-neutral-500 text-neutral-600 flex gap-8 py-3 p-6 dark:border-opacity-100 border-opacity-15 border-b-[1px] border-black dark:border-neutral-800"}>
                            <Link href={`/stations/${params.stationId}/`}
                                  className={"cursor-pointer hover:text-black hover:dark:text-white"}>Overview</Link>
                            <Link href={`/stations/${params.stationId}/logs`}
                                  className={"hover:text-black cursor-pointer hover:dark:text-white"}>Logs</Link>
                            <Link href={`/stations/${params.stationId}/settings`} scroll={true}
                                  className={"hover:text-black cursor-pointer hover:dark:text-white"}>Settings</Link>
                        </div>
                        <div className={"z-0"}>
                            {children}
                        </div>
                    </>
                )
            }
        </>
    )
}
export default stationIdPage;