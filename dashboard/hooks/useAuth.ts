import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";
import {toast} from "react-toastify";

const useAuth = () => {
    const router = useRouter();
    const logout = (reason?: string) => {
        setTimeout(() => {
            jsCookie.remove("token");
            router.push("/auth?action=login");
        }, 2000)
        toast(reason, {type: "error"})
    }

    const token = () => jsCookie.get("token");

    return {
        logout,
        token
    }
}

export default useAuth;