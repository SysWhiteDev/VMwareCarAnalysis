import React, {CSSProperties} from "react";
import {Button} from "planimetria";

type LoginFormProps = {
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    loading: boolean;
    error: any;
    style?: CSSProperties;
    handleLogin: () => void;
}
const LoginForm = ({username, setUsername, password, setPassword, loading, handleLogin, error, style}: LoginFormProps): React.JSX.Element => {
    return <div style={style} className={"transition-transform"}>
        <p className={"text-2xl font-bold"}>Please login</p>
        <p className={"text-sm text-opacity-75 font-light"}>Authentication is required</p>
        <div className={"mt-10"}>
            <input type="text" placeholder={"Username"} value={username} onChange={(e) => setUsername(e.target.value)}
                   className={"w-full text-sm p-2 dark:bg-neutral-800 rounded-md border-zinc-300"}/>
            <input type="password" placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)}
                   className={"w-full text-sm p-2 dark:bg-neutral-800 mt-2 rounded-md border-zinc-300"}/>
            <p className={"text-red-400 text-sm"}>{error?.error}</p>
            <Button onClick={handleLogin}
                    className={"w-full text-center flex items-center justify-center mt-3 py-2"}
                    loading={loading}>Login</Button>
        </div>
    </div>
}

export default LoginForm;