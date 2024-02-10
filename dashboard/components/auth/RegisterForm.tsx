import React, {CSSProperties} from "react";
import {Button} from "planimetria";

type RegisterFormProps = {
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    loading: boolean;
    error: any;
    style?: CSSProperties;
    handleRegister: () => void;
}
const RegisterForm = ({
                          username,
                          setUsername,
                          password,
                          setPassword,
                          loading,
                          handleRegister,
                          error,
                          style
                      }: RegisterFormProps): React.JSX.Element => {
    return <div style={style} className={"transition-transform"}>
        <p className={"text-2xl font-bold"}>Welcome</p>
        <p className={"text-sm text-opacity-75 font-light"}>Create an account on EVgagement</p>
        <div className={"mt-10"}>
            <input type="text" placeholder={"Username"} value={username} onChange={(e) => setUsername(e.target.value)}
                   className={"w-full text-sm p-2 dark:bg-neutral-800 rounded-md border-zinc-300"}/>
            <input type="password" placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)}
                   className={"w-full text-sm p-2 dark:bg-neutral-800 mt-2 rounded-md border-zinc-300"}/>
            <p className={"text-red-400 text-sm"}>{error?.error}</p>
            <Button onClick={handleRegister}
                    className={"w-full text-center flex items-center justify-center mt-3 py-2"}
                    loading={loading}>Register</Button>
        </div>
    </div>
}

export default RegisterForm;