<template>
        <div class="bar">
            <p class="charge">{{ currentNumber }}%</p>
            <div class="fill" :style="{ width: currentNumber -25 + '%' }"></div>  
        </div>

        <div class="stats" v-if="isClient">
            <p>11kW</p>
            <span class="spacer"></span>
            <p>50/50A</p>
            <span class="spacer"></span>
            <p>220V</p>
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
    top: 40%;
    left: 50%;
}

.bar {
    width: 75%;
    height: 10%;
    top: 30%;
    left: 15%;
    position: fixed;
    border-radius: 4px;
    background-color: rgb(28, 28, 28);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.fill {
    background-color: rgb(30, 224, 30);
    border-radius: 4px;
    height: 10%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: inherit;
    left: inherit;
}
.stats {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(226, 226, 226);
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    text-align: center;
    z-index: 100;
    width: 100%;
}
.spacer {
    width: 2px;
    height: 25px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: rgb(0, 228, 30);
    z-index: 110;
}
.charge {
    color: rgb(226, 226, 226);
    font-size: 20px;
    z-index: 100;
    width: 100%;
    text-align: center;
}
</style>
  