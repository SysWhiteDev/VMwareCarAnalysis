<template>
    <div class="stats">
        <p>Done charging in <span class="rgb">{{ time }}</span></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: '2 hours'
            // will replace when backend endpoint for data is ready
        }
    }

}
</script>

<style scoped>
.stats {
    height: 10vh;
    display: flex;
    flex-direction: row;
}
.rgb {
    display: inline-block;
    animation: glow 3s infinite;
}
@keyframes glow {
    0%, 100% { color: rgb(100, 255, 80); }
    50% { color: rgb(64, 252, 195); }
}
</style>