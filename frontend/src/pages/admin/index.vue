<template>
  <v-container class="">
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">
          後台首頁
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '後台管理 | VPT',
    login: true,
    admin: true
  }
})
</script>

<route lang="yaml">
  meta:
    layout: admin
</route>
