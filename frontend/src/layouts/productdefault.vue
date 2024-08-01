<template>
  <DefaultLayout />
  <ProductLayout v-if="!isOnProductsPage" />
</template>

<script setup>
import ProductLayout from './product.vue'
import DefaultLayout from './default.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isOnProductsPage = route.path.includes('/66')
</script>

<style scoped>
/* Style for combined layout if needed */
</style>
