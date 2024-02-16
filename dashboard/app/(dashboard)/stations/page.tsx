"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button, Spinner} from "planimetria";
import {FaPlus} from "react-icons/fa";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";


const stationsPage = (): React.JSX.Element => {
    const {logout, token} = useAuth();
    const router = useRouter();
    const [stationsArray, setStationsArray] = useState<object[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchStations = async () => {
            const response = await fetch("http://localhost:3000/stations/getList", {
                method: "GET",
                headers: {
                    "Authorization": `${token()}`
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    return logout("Session expired, please login again");
                }
            }
            const data = await response.json();
            setStationsArray(data.data);
            setLoading(false);
        }
        fetchStations().then(r => r);
    }, [])

    return <div className={"p-2"}>
        <div className={"flex justify-between items-end mx-4 my-4"}>
            <div className={""}>
                <p className={"text-3xl font-semibold"}>Charging stations</p>
                <p className={"text-sm font-medium dark:font-light opacity-70"}>A list of your charging stations.</p>
            </div>
            <Link href={"/stations/add"}>
                <Button className={"pl-2"}><FaPlus className={"mx-2"}/>Add charger</Button>
            </Link>
        </div>
        <div className={"rounded-md overflow-hidden border border-neutral-300 dark:border-neutral-800 m-4"}>
            {loading ? <div
                className={"p-12 text-center flex justify-center items-center dark:text-neutral-300 text-neutral-700"}>
                <Spinner size={24}/>
                <p className={"ml-3"}>I'm yapping with them charging stations...</p>
            </div> : (

                stationsArray.length === 0 ? (
                    <div className={"p-12 text-center"}>
                        <p className={"text-lg font-semibold"}>No charging stations found</p>
                        <p className={"text-sm font-medium dark:font-light opacity-70"}>Maybe add one?</p>
                    </div>
                ) : (
                    <table className={"w-full p-4 text-sm"}>
                        <thead className={"bg-white dark:bg-black w-full"}>
                        <tr className={"text-left rounded-t-2xl p-4"}>
                            <th className={"w-[20%] px-4 py-3"}>
                                Name
                            </th>
                            <th className={"w-[20%] px-4 py-3"}>
                                Type
                            </th>
                            <th className={"w-[30%] px-4 py-3"}>Location</th>
                            <th className={"w-[20%] px-4 py-3"}>Last Charge</th>
                            <th className={"w-[5%] px-4 py-3"}>Status</th>
                        </tr>
                        </thead>
                        <tbody className={"bg-neutral-100 dark:bg-neutral-950"}>
                        {stationsArray.map((station: any, index: number) =>
                            <tr key={index} onClick={() => router.push("/stations/" + station.id)}
                                className={"transition-colors cursor-pointer text-left border-t-[0.5px] border-neutral-300 dark:border-neutral-800 hover:bg-neutral-200 hover:dark:bg-neutral-900"}>
                                <td className={"px-4 py-3"}>{station.name || "???"}</td>
                                <td className={"px-4 py-3"}>{station.type || "???"}</td>
                                <td className={"px-4 py-3"}>{station.location || "???"}</td>
                                <td className={"px-4 py-3"}>
                                    {new Date(station.last_charge).toLocaleString()}
                                </td>
                                <td className={"px-4 py-3"}>{station.status == "online" ? <span
                                        className="text-xs dark:bg-green-400 bg-green-300 dark:text-black text-green-800 px-1.5 py-0.5 rounded-md">Online</span> :
                                    <span
                                        className="text-xs dark:bg-neutral-400 bg-neutral-300 dark:text-black text-green-800 px-1.5 py-0.5 rounded-md">Offline</span>}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                )
            )}
        </div>
    </div>
}

export default stationsPage;