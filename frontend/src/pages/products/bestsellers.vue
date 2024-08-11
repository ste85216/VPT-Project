<template>
  <h2>熱銷商品</h2>
</template>
<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '熱銷商品' | 'VPT',
    login: false,
    admin: false
  }
})
</script>
<route lang="yaml">
  meta:
    layout: productdefault
  </route>
