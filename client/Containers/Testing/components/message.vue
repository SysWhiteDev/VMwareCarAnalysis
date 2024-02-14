<template>
    <div class="container">
        <p class="message">{{ messages[message] }}</p>
    </div>
</template>

<script>
export default {
  props: ['currentNumber'], // Add the prop declaration

  data() {
    return {
      messages: ["Unplug to finish charging", "Your vehicle has finished charging, you can unplug it now", "Plug your vehicle in to start charging"],
      message: 2
    };
  },
  // note: it updates 5 secs after the page is loaded so there might be a delay
  mounted() {
    const intervalId = setInterval(() => {
      if (this.currentNumber <  100) {
        this.message =  0;
      } else {
        this.message =  1;
        clearInterval(intervalId); 
      }
    },  5000);
  }
}
</script>

<style scoped>
.container {
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.message {
  font-size:12px;
}

</style>