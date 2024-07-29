<template>
  <v-container class="">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">
          選擇管理項目
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '後台管理 | VPT'
  }
})
</script>

<route lang="yaml">
  meta:
    layout: admin
</route>
