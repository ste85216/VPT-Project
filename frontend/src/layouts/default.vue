<template>
  <Navbar />
  <router-view v-if="!isOnProductsPage" />
  <Footer v-if="!isOnProductsPage" />

  <!-- <div id="robot">
    <Vue3Spline
      :scene="{
        url: 'https://prod.spline.design/W8p-HzHioYCMLszD/scene.splinecode',
      }"
    />
  </div> -->
</template>
<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// import { Vue3Spline } from 'vue3-spline'
const route = useRoute()

const currentPath = route.path

const isOnProductsPage = computed(() => {
  return currentPath.includes('/products')
})

</script>

<style lang="scss" scoped>
@import '/src/styles/settings.scss';

// #robot {
//   width: 20%;
//   height: 30%;
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   background: transparent;
//   display: none;
// }
// @media (min-width: 1590px) {
//   #robot {display:block}
// }

</style>
