<template>
        <div class="bar"  v-if="isClient">
            <p class="charge">{{ currentNumber }}%</p>
            <div class="fill" :style="{ width: currentNumber + '%' }"></div>  
        </div>

        <div class="stats" style="transform: translate(-50%, -55%);">
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
                console.log(this.currentNumber);
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
    width: 70%;
    height: 10%;
    top: 30%;
    left: 15%;
    position: fixed;
    border-radius: 4px;
    background-color: rgb(28, 28, 28);
    text-align: center;
    align-items: center;
    
}

.fill {
    background-color: rgb(30, 224, 30);
    border-radius: 4px;
    height: 100%;
    display: flex;
    transition: width  0.5s ease;
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
    margin-left: 15px;
    margin-right: 15px;
    background-color: rgb(0, 228, 30);
    z-index: 110;
    border-radius: 0.5px;
}
.charge {
    color: rgb(226, 226, 226);
    font-size: 20px;
    z-index: 100;
    width: 100%;
    text-align: center;
}
</style>
  