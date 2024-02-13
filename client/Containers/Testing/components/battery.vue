<template>
  <div class="wrapper">
    <div class="bar" v-if="isClient">
      <p class="charge">{{ currentNumber }}%</p>
      <div class="fill" :style="{ width: currentNumber + '%' }"></div>
    </div>
    <div class="stats">
      <p>11kW</p>
      <span class="spacer"></span>
      <p>50/50A</p>
      <span class="spacer"></span>
      <p>220V</p>
    </div>
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
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 100dvw;
}


.bar {
  width: 70dvw;
  height: 10dvh;
  position: relative;
  border-radius: 4px;
  background-color: rgb(28, 28, 28);
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
}

.fill {
  background-color: rgb(30, 224, 30);
  border-radius: 4px;
  height: 100%;
  display: flex;
  transition: width 0.5s ease;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
}

.stats {
  color: rgb(226, 226, 226);
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
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
  position: relative;
  z-index: 11;
}
</style>
  