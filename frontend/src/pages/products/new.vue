<template>
  <h2>新品上市</h2>
</template>
<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '排球 | VPT',
    login: false,
    admin: false
  }
})
</script>
<route lang="yaml">
  meta:
    layout: productdefault
  </route>
