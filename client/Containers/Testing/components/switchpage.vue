<template>
  <div>
    <NuxtLink :to="linkTo" class="link">
      <div class="container">
        <img :src="imageSrc" alt="Image" class="image"/>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import personSvg from '@/assets/icons/person.svg';
import carSvg from '@/assets/icons/car.svg';

export default {
  computed: {
    linkTo() {
      if (this.$route.name === 'index') {
        return {name: 'activities'};
      } else if (this.$route.name === 'activities') {
        return {name: 'index'};
      }
    },
    imageSrc() {
      if (this.$route.name === 'index') {
        return personSvg;
      } else if (this.$route.name === 'activities') {
        return carSvg;
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100px;
  width: 100px;
  border-width: 5px;
  border-color: white;
  border-style: solid;
  border-radius: 100%;
  background-color: white;
  box-shadow: rgba(23, 23, 23, 0.34) 0px 5px 20px 0px;
  transition: all 0.2s ;
}
.container:hover {
  opacity: 0.9;
}

.link {
  display: inline-block;
  margin: 10px;
}

.image {
  width: 50px;
  height: 50px;
  fill: black;
}
</style>
