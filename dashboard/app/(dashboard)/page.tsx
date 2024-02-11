import {PiChargingStation, PiMoney, PiHeartbeat} from "react-icons/pi";
import AlertBox from "@/components/overview/AlertBox";
import ChargersMap from "@/components/overview/ChargersMap";

export default function Home() {
    return (
        <div>
            <div>
                <p className={"text-3xl font-semibold mt-4 ml-4"}>Overview</p>
                <p className={"text-sm font-medium dark:font-light ml-4 opacity-70"}>General info about your EV charging
                    stations</p>
                <div className={"flex justify-between mx-4 mt-8 gap-4"}>
                    <div
                        className={"flex-1 flex justify-between flex-col text-cyan-700 dark:text-cyan-500 font-medium p-6 rounded-xl bg-neutral-100 border-neutral-300  dark:bg-neutral-950 border dark:border-neutral-800"}>
                        <div className={"flex items-center text-cyan-500 text-sm justify-between mb-4"}>
                            <p>Active stations</p>
                            <PiHeartbeat className={"opacity-70"} size={22}/>
                        </div>
                        <div>
                            <p className={"font-extrabold text-3xl"}>932</p>
                            <p className={"opacity-70 text-sm"}>0 offline</p>
                        </div>
                    </div>
                    <div
                        className={"flex-1 flex justify-between flex-col  text-yellow-700 dark:text-yellow-400 font-medium p-6 rounded-xl bg-neutral-100 border-neutral-300  dark:bg-neutral-950 border dark:border-neutral-800"}>
                        <div className={"flex items-center text-sm justify-between mb-4"}>
                            <p>Currently delivering charge</p>
                            <PiChargingStation className={"opacity-70"} size={22}/>
                        </div>
                        <div>
                            <p className={"font-extrabold text-3xl"}>280</p>
                            <p className={"opacity-70 text-sm"}>652 sleeping</p>
                        </div>
                    </div>
                    <div
                        className={"flex-1 flex justify-between flex-col  text-green-800 dark:text-green-400  font-medium p-6 rounded-xl bg-neutral-100 border-neutral-300  dark:bg-neutral-950 border dark:border-neutral-800"}>
                        <div className={"flex items-center text-sm justify-between mb-4"}>
                            <p>Monthly revenue</p>
                            <PiMoney className={"opacity-70"} size={22}/>
                        </div>
                        <div>
                            <p className={"font-extrabold text-3xl"}>7.892,32 USD</p>
                            <p className={"opacity-70 text-sm"}>+99,9% than last month</p>
                        </div>
                    </div>
                </div>
                <div className={"flex justify-between mx-4 mt-4 gap-4 h-[450px]"}>
                    <ChargersMap/>
                    <AlertBox/>
                </div>
            </div>
        </div>
    );
}
