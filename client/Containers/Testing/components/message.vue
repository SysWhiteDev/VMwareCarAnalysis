<template>
    <div class="container">
        <p class="message">{{ messages[message] }}</p>
    </div>
</template>

<script>
// for some reason mounted does not update message in data()
export default {
  data() {
    return {
      messages: ["Unplug to finish charging", "Your vehicle has finished charging, you can unplug it now", "Plug your vehicle in to start charging"],
      message: 2
    };
  },
  mounted() {
    while (this.currentNumber < 100) {
      this.data.message = 0;
    }
    if (this.CurrentNumber >= 100) {
      this.data.message = 1;
    }
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