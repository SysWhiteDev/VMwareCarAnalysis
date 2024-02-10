<template>
    <div>
        <p class="battery" v-if="isClient">Battery: {{ currentNumber }}%</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentNumber: Math.floor(Math.random() * 100) + 1, // Random number between 1 and 100
            intervalId: null,
            isClient: false
        };
    },
    mounted() {
        this.isClient = true; // Set isClient to true when the component is mounted on the client-side
        this.intervalId = setInterval(() => {
            if (this.currentNumber >= 100) {
                clearInterval(this.intervalId);
            } else {
                this.currentNumber++;
            }
        }, 5000); // Increase by 1 every 5 seconds
    },
    beforeDestroy() {
        clearInterval(this.intervalId); // Clear the interval when the component is destroyed
    }
};
</script>

<style scoped>
.battery {
    color: #ffffff;
    font-size: 20px;
    margin-top: 20px;
}
</style>
  