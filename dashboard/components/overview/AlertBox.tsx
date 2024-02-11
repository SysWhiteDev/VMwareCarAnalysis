import React from "react";
import {PiBell} from "react-icons/pi";

const AlertBox = (): React.JSX.Element => {
    return (
        <div
            className={"flex-1 flex flex-col text-purple-600 dark:text-purple-400 font-medium p-6 rounded-xl bg-neutral-100 border-neutral-300  dark:bg-neutral-950 border dark:border-neutral-800"}>
            <div className={"flex items-center text-sm justify-between mb-4"}>
                <p>Alerts</p>
                <PiBell className={"opacity-70"} size={20}/>
            </div>
            <div className={"flex-1 flex items-center justify-center rounded-md dark:bg-neutral-900 bg-neutral-200 p-2 text-sm "}>
                <p className={"text-center"}>Uh oh! Something went wrong while fetching the alerts</p>
            </div>
        </div>
    )
}

export default AlertBox;