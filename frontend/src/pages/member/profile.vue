<template>
  <h3 class="opacity-90">
    個人資料管理
  </h3>
</template>

<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '個人資料管理 | VPT',
    login: true,
    admin: false
  }
})

</script>

<route lang="yaml">
  meta:
    layout: member
</route>
