"use client";
import React, {useEffect, useState} from "react";
import {PiBell} from "react-icons/pi";

const AlertBox = (): React.JSX.Element => {
    const [alertsArray, setAlertsArray] = useState<object[]>([])

    useEffect(() => {
        setAlertsArray([
            {
                timestamp: new Date(),
                type: "Charger #1 is offline"
            },
            {
                timestamp: new Date(),
                type: "Charger #4 is offline"
            },
            {
                timestamp: new Date(),
                type: "Charger #2 is offline"
            },
            {
                timestamp: new Date(),
                type: "Charger #7 is offline"
            },
        ])
    }, []);

    return (
        <div
            className={"flex-1 flex flex-col text-purple-600 dark:text-purple-400 font-medium p-6 rounded-xl bg-neutral-100 border-neutral-300 dark:bg-neutral-950 border dark:border-neutral-800"}>
            <div className={"flex items-center text-sm justify-between mb-4"}>
                <p>Alerts</p>
                <PiBell className={"opacity-70"} size={20}/>
            </div>
            <div
                className={`${alertsArray.length === 0 && "items-center"} border-[0.5px] border-neutral-300 dark:border-neutral-800 relative flex flex-1 justify-center rounded-md dark:bg-neutral-900 bg-neutral-200 overflow-hidden text-sm`}>
                {
                    alertsArray.length === 0 ? (
                        <div className={"p-12 text-center"}>
                            <p className={"text-lg font-semibold"}>No active alerts.</p>
                            <p className={"text-sm font-medium dark:font-light opacity-70"}>All good, you can rest.</p>
                        </div>
                    ) : (
                        <table className={"w-full text-sm block overflow-y-auto"}>
                            <thead className={"bg-white dark:bg-black"}>
                            <tr className={"text-left rounded-t-2xl p-4"}>
                                <th className={"w-[30%] px-4 py-3"}>
                                    Date
                                </th>
                                <th className={"w-[50%] px-4 py-3"}>Content</th>
                                <th className={"w-[20%] px-4 py-3 text-right"}>Status</th>
                            </tr>
                            </thead>
                            <tbody className={"bg-neutral-200 dark:bg-neutral-900"}>
                            {alertsArray.map((activity: any, index: number) =>
                                    <tr key={index}
                                        className={`${index === alertsArray.length - 1 && "border-b-[0.5px]"} h-[25px] transition-colors text-left border-t-[0.5px] border-neutral-300 dark:border-neutral-800 hover:bg-neutral-300 hover:dark:bg-neutral-950`}>
                                        <td className={"px-4 py-3"}>
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </td>
                                        <td className={"px-4 py-3"}>{activity.type}</td>
                                        <td className={"px-4 py-3 text-right"}>
                                                <span
                                                    className="text-xs dark:bg-yellow-400 bg-yellow-300 dark:text-black text-yellow-800 px-1.5 py-0.5 rounded-md">In Effect</span>
                                        </td>
                                    </tr>
                            )}
                            </tbody>
                        </table>
                    )
                }
            </div>
        </div>
    )
}

export default AlertBox;