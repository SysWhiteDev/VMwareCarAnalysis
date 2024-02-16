import jsCookie from "js-cookie";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

const useAuth = () => {
    const router = useRouter();
    const logout = (reason?: string) => {
        setTimeout(() => {
            jsCookie.remove("token");
            router.push("/auth?action=login");
        }, reason ? 2000 : 0)
        toast(reason, {type: "error"})
    }

    const token = () => jsCookie.get("token");

    const getUserData: any = async () => {
        const response = await fetch("http://localhost:3000/auth/user", {
            method: "GET",
            headers: {
                "Authorization": `${token()}`
            }
        })
        if (response.ok) {
            return await response.json();
        } else {
            if (response.status === 401) {
                logout("Session expired, please login again");
            }
        }
    }

    return {
        logout,
        token,
        getUserData
    }
}

export default useAuth;