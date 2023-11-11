import { useTokenState } from "../stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useTokenState();

    if ((!token.token || token.token === '') && !to.path.startsWith('/auth/') && !to.path.startsWith('/v/')) {
        return navigateTo('/v/viewer');
    }
})
