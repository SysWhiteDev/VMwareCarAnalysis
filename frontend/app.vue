<template>
  <div>
    <NuxtLayout name="navbar" v-if="!isAuthRoute">
      <NuxtPage />
    </NuxtLayout>
    <NuxtPage v-else/>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthRoute() {
      return this.$route.path.startsWith('/auth/')
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