<template>
    <div class="clock">
        {{ time }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
    },
    mounted() {
        setInterval(() => {
            this.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }, 1000);
    },
};
</script>

<style>
.clock {
    position: relative;
    margin: 20px 20px 20px 20px;
    padding: 20px;
    border-radius: 20px;
    font-size: 4rem;
    background: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.075);
    font-weight: bold;
}
</style>
