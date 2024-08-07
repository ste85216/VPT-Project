<template>
  <div>
    <h1>球場資訊</h1>
  </div>
</template>
<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '球場資訊 | VPT',
    login: true,
    admin: true
  }
})
</script>

<route lang="yaml">
  meta:
    layout: admin
  </route>>
