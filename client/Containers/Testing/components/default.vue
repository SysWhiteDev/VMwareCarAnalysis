<template>
    <div class="fullscreen">
      <div class="company-logo">
        <img width="100" height="100" src="https://img.icons8.com/isometric/100/car.png" alt="car"/>
      </div>
      <div class="evgagement">
        <p>Powered by Evgagement</p>
      </div>
    </div>
</template>

<style>
.fullscreen {
  z-index: -2147483647;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* black magic for mesh gradient */
  background-color:hsla(167,41%,58%,1);
  background-image: 
  radial-gradient(at 15% 70%, hsla(189,70%,39%,1) 0px, transparent 50%),
  radial-gradient(at 98% 95%, hsla(120,59%,48%,1) 0px, transparent 50%),
  radial-gradient(at 66% 35%, hsla(170,82%,64%,1) 0px, transparent 50%),
  radial-gradient(at 22% 6%, hsla(153,100%,50%,1) 0px, transparent 50%),
  radial-gradient(at 40% 17%, hsla(218,62%,70%,1) 0px, transparent 50%);
}
.company-logo {
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.evgagement {
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 98%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Rubik;
}
</style>
