<template>
  <h3 class="opacity-90 mb-4">
    刊登場次
  </h3>
  <v-divider />
</template>

<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '刊登場次 | VPT',
    login: true,
    admin: false
  }
})
</script>

<route lang="yaml">
  meta:
    layout: member
</route>
