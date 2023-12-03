<template>
  <div>
    <NuxtLayout name="navbar" v-if="!isAuthRoute">
      <NuxtPage />
    </NuxtLayout>
    <NuxtPage v-else/>
  </div>
</template>

<script>
import { useTokenState } from "~/stores/authStore.js";
export default {
  data() {
    return {
      authCookie: useCookie("auth"),
      authStore: useTokenState(),
    }
  },
  mounted() {
    if (this.authCookie) {
      this.authStore.token = this.authCookie;
      this.$router.push("/");
    }
  },
  computed: {
    isAuthRoute() {
      return this.$route.path.startsWith('/auth/') || this.$route.path.startsWith('/v/');
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

* {
  margin: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}
</style>