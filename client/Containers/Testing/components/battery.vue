<template>
  <div class="wrapper">
    <timeCharging/>
    <div class="bar" v-if="isClient">
      <p class="charge">{{ currentNumber }}%</p>
      <div class="fill" :style="{ width: currentNumber + '%' }"></div>
    </div>
    <stats/>
    <message :currentNumber="currentNumber"/>
    <switchpage/>
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
  height: clamp(70px, 10dvh, 80px);
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

.charge {
  font-size: 20px;
  position: relative;
  z-index: 11;
}

</style>
  