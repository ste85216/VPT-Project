<template>
  <v-container class="h-75">
    <h3>品牌故事待開發</h3>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

definePage({
  meta: {
    title: '品牌故事 | VPT'
  }
})
</script>

<style lang="scss" scoped>

</style>
