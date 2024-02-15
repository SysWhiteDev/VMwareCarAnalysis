<template>
  <div class="wrapper">
    <div class="container">
      <div class="numbers">
        <p class="number" id="1"></p>
        <p class="number" id="2"></p>
        <p class="number" id="3"></p>
        <p class="number" id="4"></p>
        <p class="number" id="5"></p>
        <p class="number" id="6"></p>
      </div>
    </div>
    <p class="rgb">please pair the device</p>
  </div>
</template>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 100dvw;
  background-color: rgb(28, 28, 28);
}
.container {
  width: 60dvw;
  height: 10dvh;
  position: relative;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
}
.numbers {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
}
.number {
  width: 10%;
  height: 10%;
  border-radius: 50%;
  background-color: rgb(28, 28, 28);
  color: rgb(255, 255, 255);
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
.rgb {
  display: inline-block;
  animation: glow 3s infinite;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  padding: 5px;
  white-space: nowrap;
}
@keyframes glow {
  0%, 100% { color: rgb(0, 255, 157); }
  50% { color: rgb(0, 255, 85); }
}
</style>