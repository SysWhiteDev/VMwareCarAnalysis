"use client";
import React, {useEffect, useState} from "react";
import {MdElectricBolt} from "react-icons/md";
import {useSearchParams} from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import {useRouter} from "next/navigation";
import jsCookie from 'js-cookie';

const AuthPage = (): React.JSX.Element => {
    const router = useRouter();

    const [switchtingAnimation, setSwitchtingAnimation] = useState<boolean>(false);
    let actionType = useSearchParams().get("action");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        if (jsCookie.get("token")) {
            router.push("/");
        }
    });

    const handleLogin = async () => {
        // request to login
        setLoading(true);
        await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        }).then(async (res) => {
            if (!res.ok) {
                setLoading(false);
                setError(await res.json());
                return;
            }
            const response = await res.json();
            if (response.token) {
                jsCookie.set("token", response.token);
                router.push("/");
            }
        }).catch(e => {
            if (e) {
                setError({error: "An error occurred, please try again later"});
                setLoading(false);
            }
        })
    }

    const handleRegister = async () => {
        setLoading(true);
        await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        }).then(async (response) => {
            if (!response.ok) {
                setLoading(false);
                setError(await response.json());
                return;
            }
            switchAction();
        }).catch(e => {
            if (e) {
                setError({error: "An error occurred, please try again later"});
                setLoading(false);
            }
        })
    }
    const switchAction = () => {
        setSwitchtingAnimation(true);
        setLoading(false);
        setError("");
        if (actionType == "login") {
            setUsername("");
            setPassword("");
        }
        setTimeout(() => {
            if (actionType == "login") {
                router.push("?action=register")
            } else {
                router.push("?action=login")
            }
            setTimeout(() => {
                setSwitchtingAnimation(false);
            }, 100);
        }, 300);
    }

    const [gradient1Position, setGradient1Position] = useState<any>([0, 0]);
    const [gradient2Position, setGradient2Position] = useState<any>([window.innerWidth - 400, window.innerHeight - 550]);
    useEffect(() => {
        setGradient1Position([gradient1Position[0], gradient1Position[1] + window.innerHeight - 400]);
        setGradient2Position([gradient2Position[0], gradient2Position[1] - window.innerHeight + 550]);
    }, []);
    setInterval(() => {
        if (gradient1Position[1] > window.innerHeight - 500) {
            setGradient1Position([gradient1Position[0], 0])
        } else {
            setGradient1Position([gradient1Position[0], gradient1Position[1] + window.innerHeight - 400]);
        }

        if (gradient2Position[1] < window.innerHeight - 650) {
            setGradient2Position([window.innerWidth - 400, window.innerHeight - 550])
        } else {
            setGradient2Position([window.innerWidth - 400, gradient2Position[1] - window.innerHeight + 550]);
        }
    }, 10000)


    return <div className={"h-dvh w-dvw flex items-center justify-center bg-zinc-300 dark:bg-zinc-950"}>
        {/* background */}
        <div
            className={`z-0 absolute top-0 overflow-hidden left-0 right-0 bottom-0 blur-[100px] dark:blur-[350px]`}>
            <div style={{left: gradient1Position[0], top: gradient1Position[1]}}
                 className={"transition-all duration-[20000ms] w-[500px] h-[450px] absolute top-0 left-0 bg-[#73cce9] dark:bg-blue-900"}/>
            <div style={{left: gradient2Position[0], top: gradient2Position[1]}}
                 className={"transition-all duration-[20000ms] w-[400px] h-[550px] absolute right-0 bottom-0 bg-green-500 dark:bg-green-700"}/>
        </div>
        {/* auth banner */}
        <div className={"p-10 absolute top-0 left-0"}>
            <div className={"dark:text-white text-xl font-semibold flex items-center gap-1.5"}>
                <MdElectricBolt size={32}/>
                <p>EVgagement</p>
            </div>
        </div>
        {/* auth form */}
        <div>
            {/*<>auth form</>*/}
            <div
                className={`w-[450px] overflow-hidden select-none shadow p-5 rounded-xl backdrop-blur bg-purple-50 border-purple-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white border-[2px]`}>
                {actionType === "register" ?
                    <RegisterForm
                        error={error}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        style={{
                            transform: switchtingAnimation ? "translateX(120%)" : "translateX(0)",
                            filter: switchtingAnimation ? "blur(10px)" : "blur(0px)"
                        }} loading={loading} handleRegister={handleRegister}/> :
                    <LoginForm
                        error={error}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        style={{
                            transform: switchtingAnimation ? "translateX(-120%)" : "translateX(0)",
                            filter: switchtingAnimation ? "blur(10px)" : "blur(0px)"
                        }}
                        loading={loading} handleLogin={handleLogin}/>}
            </div>
            <div className={"mt-6 text-sm flex gap-1.5 text-black dark:text-white"}>
                {actionType === "register" ? (
                    <>
                        <p className={"opacity-60"}>Already have an account?</p>
                        <p onClick={() => switchAction()}
                           className={"z-10 font-medium text-purple-700 dark:text-purple-500 transition-colors cursor-pointer hover:text-green-700 hover:dark:text-green-500 hover:underline hover:underline-offset-1"}>Log
                            in</p>
                    </>
                ) : (
                    <>
                        <p className={"opacity-60"}>New here?</p>
                        <p onClick={() => switchAction()}
                           className={"z-10 font-medium text-blue-900 dark:text-purple-500 transition-colors cursor-pointer hover:text-green-700 hover:dark:text-green-500 hover:underline hover:underline-offset-1"}>Register</p>
                    </>
                )}
            </div>
        </div>
    </div>;
}

export default AuthPage;