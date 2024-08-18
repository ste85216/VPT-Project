<template>
  <v-container class="h-100">
    <h3>品牌故事待開發</h3>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-img
          src="/src/assets/VPT_LOGO_1.png"
          width="400"
          height="400"
          class="animate__animated animate__bounceInLeft logo-animate"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'animate.css'

gsap.registerPlugin(ScrollTrigger)

definePage({
  meta: {
    title: '品牌故事 | VPT'
  }
})
</script>

<style lang="scss" scoped>
  .logo-animate {
    animation: bounceInLeft; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 2s;
  }
</style>
