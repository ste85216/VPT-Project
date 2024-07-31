<template>
  <v-container />
</template>

<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '所有商品 | VPT',
    login: false,
    admin: false
  }
})

</script>

<route lang="yaml">
  meta:
    layout: productdefault
  </route>
