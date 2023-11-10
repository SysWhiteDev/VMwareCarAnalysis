import { useTokenState } from "../stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useTokenState();

    if ((!token.token || token.token === '') && !to.path.startsWith('/auth/')) {
        return navigateTo('/auth/login');
    }
})
