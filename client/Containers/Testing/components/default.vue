<template>
  <div class="sidebar" ref="sidebar">
    <div class="logo">
      <NuxtLink to="/" class="link">
        <img width="25" height="25" src="https://img.icons8.com/1fff4f/ios-filled/50/car.png" alt="car"/>
        <p>e-car corp.</p>
      </NuxtLink>
    </div>
    <div class="container">
      <NuxtLink to="/1" class="link">Nav item 1</NuxtLink>
      <NuxtLink to="/2" class="link">nav item 2</NuxtLink>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'Sidebar',
  mounted() {
    const sidebarWidth = this.$refs.sidebar.offsetWidth;
    document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth}px`);
    console.log(sidebarWidth);
  },
}
</script>

<style scoped>

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #000000;
  color: #1fff4f;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
}
.link {
  text-decoration: none;
  color:#1fff4f 
}
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.logo {
  display: flex;
  flex-direction: row;
  align-items: space-between;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #1fff4f;
}
</style>

