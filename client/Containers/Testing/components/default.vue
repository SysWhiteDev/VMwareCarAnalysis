<template>
  <div class="wrapper">
    <div class="blur">
      <div class="bg"></div>
    </div>
    <div class="company-logo">
      <p>ACME corp.</p>
    </div>
    <div class="evgagement">
      <p>Powered by Evgagement</p>
    </div>
  </div>
</template>

<style scoped>
.bg {
  z-index: -1;
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
  overflow: hidden;
}
/* bg blur */
.bg::before {
    content: '';
    display: block;
    position: absolute;
    top:  0;
    left:  0;
    width:  100%;
    height:  100%;
    background-color: rgba(12, 12, 12, 0.5);
    backdrop-filter: blur(100px);
    z-index: -2147483647;
}
.company-logo {
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 18%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-weight: lighter;
  font-size: 30px;
}
.evgagement {
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 98%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-size: 8px;
}
</style>
