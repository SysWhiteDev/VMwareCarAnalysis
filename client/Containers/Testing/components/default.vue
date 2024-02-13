<template>
  <div class="blur">
    <div class="bg"></div>
  </div>
  <div class="company-logo">
      <img width="75" height="75" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fnew_gallery%2F229-2297531_1-porsche-porsche-logo-white.png&f=1&nofb=1&ipt=5564deed6b058c84b22dc61c4290e7503bab4e0d51ead0e0ed67edb54bc7b7ce&ipo=images" alt="car"/>
    </div>
    <div class="evgagement">
      <p>Powered by Evgagement</p>
    </div>
</template>

<style scoped>
.bg {
  z-index: -2147483646;
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
    background-color: rgba(12, 12, 12, 0.555);
    backdrop-filter: blur(100px);
    z-index: -2147483647;
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
  color: rgb(226, 226, 226);
  white-space: nowrap;
}
</style>
