<template>
    <div class="stats">
        <p>11kW</p>
        <span class="spacer"></span>
        <p>50/50A</p>
        <span class="spacer"></span>
        <p>220V</p>
    </div>
</template>



<style scoped>
.stats {
  color: rgb(226, 226, 226);
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 15px;
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

</style>