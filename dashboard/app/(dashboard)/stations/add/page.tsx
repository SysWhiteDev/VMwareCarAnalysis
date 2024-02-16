"use client";
import React, { useState, useRef } from "react";
import { Button } from "planimetria";
import { FaAngleLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const StationOverviewPage = (): React.ReactElement => {
    const router = useRouter();
    const {token} = useAuth();
    const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = event.target.value;

        if (/^\d$/.test(value) || value === "") {
            const updatedDigits = [...digits];
            updatedDigits[index] = value;
            setDigits(updatedDigits);

            if (value && index <  5) {
                inputRefs.current[index +  1]?.focus();
            } else if (!value && index >  0) {
                inputRefs.current[index -  1]?.focus();
            }
        }
    };

    const handleAddingRequest = async (code: string) => {
        setLoading(true)
        const request = await fetch("http://localhost:3000/client/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${token()}`
            },
            body: JSON.stringify({
                code: code
            })
        })
        if (!request.ok){
            setLoading(false)
            if (request.status === 404){
                setError("I couldn't find the charger not found on the network...")
                return;
            }
            setError("An error occurred, please try again later")
            return;
        }
        if (request.ok) {
            setLoading(false)
            setError("");
            router.push("/stations")
        }
    }


    return (
        <div className="flex flex-col justify-center items-center h-[calc(100dvh-60px)]">
            <div
                className="w-[500px] p-8 border border-black border-opacity-15 dark:border-neutral-800 rounded-xl overflow-hidden">
                <p className="text-4xl font-semibold">Add a new charger</p>
                <p className="text-md font-normal dark:font-light opacity-60">Insert the 6 digit code visible on the
                    screen</p>
                <div className="w-full flex mt-12 justify-between gap-2">
                    {digits.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => inputRefs.current[index] = el}
                            type="text"
                            value={digit}
                            maxLength={1}
                            onChange={(event) => handleInputChange(event, index)}
                            className="flex font-mono bg-black bg-opacity-15 placeholder:text-neutral-500 dark:bg-neutral-800 dark:text-white justify-center items-center text-center text-5xl w-[15%] h-[80px] rounded-xl"
                            placeholder="0"
                        />
                    ))}
                </div>
                <p className={"text-red-400 text-sm"}>{error}</p>
                <div className="flex gap-2 mt-4 justify-between">
                    <Button onClick={() => router.back()} type={"outline"} className={"!px-2"}><FaAngleLeft/></Button>
                    <Button loading={loading} onClick={() => handleAddingRequest(digits.join(""))}>Confirm</Button>
                </div>
            </div>
        </div>
    );
};

export default StationOverviewPage;
