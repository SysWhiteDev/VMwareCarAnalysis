"use client";
import React, {useEffect, useState} from "react";
import jsCookie from "js-cookie";
import {useRouter} from "next/navigation";
import {Button} from "planimetria";

const ActivityPage = (): React.JSX.Element => {
    const router = useRouter();
    const [activitiesArray, setActivitiesArray] = useState<object[]>([])
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const getActivityLog = async () => {
        setRefreshing(true)
        const response = await fetch("http://localhost:3000/logs/activity", {
            method: "GET",
            headers: {
                "Authorization": `${jsCookie.get("token")}`
            }
        })
        setTimeout(() => {
            setRefreshing(false)
        }, 300)
        if (response.ok) {
            const res = await response.json()
            setActivitiesArray(res.data.reverse())
        } else {
            if (response.status === 401) {
                jsCookie.remove("token");
                router.push("/auth?action=login");
            }
        }
    }

    useEffect(() => {
        getActivityLog().then(r => r)
        setInterval(() => {
            getActivityLog().then(r => r)
        }, 10000)
    }, []);

    const renderActivitySeverity = (activity: number) => {
        switch (activity) {
            case 0:
                return <span
                    className="text-xs dark:bg-green-400 bg-green-300 dark:text-black text-green-800 px-1.5 py-0.5 rounded-md">Low</span>;
            case 1:
                return <span
                    className="text-xs dark:bg-yellow-400 bg-yellow-300 dark:text-black text-yellow-800 px-1.5 py-0.5 rounded-md">Medium</span>;
            case 2:
                return <span
                    className="text-xs dark:bg-red-400 bg-red-300 dark:text-black text-red-800 px-1.5 py-0.5 rounded-md">Catastrophic</span>;
            default:
                return <span className="text-neutral-500 dark:text-neutral-400">Info</span>;
        }
    };

    return <div>
        <div className={"flex justify-between items-end mx-4 my-4"}>
            <div className={""}>
                <p className={"text-3xl font-semibold"}>Activity Log</p>
                <p className={"text-sm font-medium dark:font-light opacity-70"}>Check for events that happened on
                    your
                    account</p>
            </div>
            <Button onClick={() => getActivityLog()} loading={refreshing}>Refresh</Button>
        </div>
        <div className={"rounded-md overflow-hidden border border-neutral-300 dark:border-neutral-800 m-4"}>
            {
                activitiesArray.length === 0 ? (
                    <div className={"p-12 text-center"}>
                        <p className={"text-lg font-semibold"}>No activities found.</p>
                        <p className={"text-sm font-medium dark:font-light opacity-70"}>No activities have been recorded
                            yet, please contact an admin.</p>
                    </div>
                ) : (
                    <table className={"w-full p-4 text-sm"}>
                        <thead className={"bg-white dark:bg-black w-full"}>
                        <tr className={"text-left rounded-t-2xl p-4"}>
                            <th className={"w-[30%] px-4 py-3"}>
                                Date
                            </th>
                            <th className={"w-[60%] px-4 py-3"}>Event</th>
                            <th className={"w-[10%] px-4 py-3 text-right"}>Danger Level</th>
                        </tr>
                        </thead>
                        <tbody className={"bg-neutral-100 dark:bg-neutral-950"}>
                        {activitiesArray.map((activity: any, index: number) =>
                            <tr key={index}
                                className={"transition-colors text-left border-t-[0.5px] border-neutral-300 dark:border-neutral-800 hover:bg-neutral-200 hover:dark:bg-neutral-900"}>
                                <td className={"px-4 py-3"}>
                                    {new Date(activity.timestamp).toLocaleString()}
                                </td>
                                <td className={"px-4 py-3"}>{activity.type}</td>
                                <td className={"px-4 py-3 text-right"}>{renderActivitySeverity(activity.severity)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                )

            }

        </div>
    </div>
}

export default ActivityPage