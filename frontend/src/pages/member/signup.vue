<template>
  <h3 class="opacity-90 mb-4">
    報名紀錄
  </h3>
  <v-divider />
</template>

<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '報名紀錄 | VPT',
    login: true,
    admin: false
  }
})
</script>
<route lang="yaml">
  meta:
    layout: member
</route>
