"use client";
import React, {useEffect, useState} from "react";
import {Spinner} from "planimetria";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import {usePathname} from "next/navigation";

const stationIdPage = ({params, children}: { children: any, params: { stationId: string } }): React.JSX.Element => {
    const path = usePathname();
    const {token} = useAuth()
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);

    const getHeaderInfo = async () => {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/stations/getStation/${params.stationId}`, {
            method: "GET",
            headers: {
                "Authorization": `${token()}`
            },
        });
        const data = await res.json();
        setData(data.data);
        setLoading(false);
    }

    useEffect(() => {
        getHeaderInfo().then(r => r);
    }, []);
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
                        {/*content navbar div*/}
                        <div
                            className={"sticky top-[60px] flex items-center justify-between bg-neutral-100 dark:bg-neutral-950 z-50 text-sm dark:text-neutral-500 text-neutral-600 px-6 p-4 dark:border-opacity-100 border-opacity-15 border-b-[1px] border-black dark:border-neutral-800"}>
                            <div className="flex gap-6">
                                <Link href={`/stations/${params.stationId}/`}
                                      className={`cursor-pointer hover:text-black hover:dark:text-white ${path == `/stations/${params.stationId}` ? 'text-black dark:text-white font-semibold dark:font-medium' : ''}`}>
                                    Overview
                                </Link>
                                <Link href={`/stations/${params.stationId}/logs`}
                                      className={`hover:text-black cursor-pointer hover:dark:text-white ${path == `/stations/${params.stationId}/logs` ? 'text-black dark:text-white font-semibold dark:font-medium' : ''}`}>
                                    Logs
                                </Link>
                                <Link href={`/stations/${params.stationId}/settings`} scroll={true}
                                      className={`hover:text-black cursor-pointer hover:dark:text-white ${path == `/stations/${params.stationId}/settings` ? 'text-black dark:text-white font-semibold dark:font-medium' : ''}`}>
                                    Settings
                                </Link>
                            </div>
                            <div className={"z-10"}>
                                <h1 className={"font-semibold text-sm flex items-center text-black dark:text-white"}>{data.name || "name_not_found"}
                                    {data.status === "online" ? (
                                        <span
                                            className="ml-2 text-xs dark:bg-green-400 bg-green-300 dark:text-black text-green-800 px-1.5 py-0.5 rounded-md">Online</span>
                                    ) : (
                                        <span
                                            className="ml-2 text-xs dark:bg-neutral-400 bg-neutral-300 dark:text-black text-green-800 px-1.5 py-0.5 rounded-md">Offline</span>
                                    )}
                                </h1>
                            </div>
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