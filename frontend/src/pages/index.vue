<template>
  <v-sheet class="mt-16">
    <h1>新品上市</h1>
  </v-sheet>
  <v-container />
  <v-sheet class="mt-16">
    <h1>熱銷商品</h1>
  </v-sheet>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
// import { Vue3Spline } from 'vue3-spline'

definePage({
  meta: {
    title: 'VPT' // 這裡的 title 會被設定到 <title> 標籤
  }
})
</script>

<style lang="scss">
h1 {
  text-align: center;
}

</style>
