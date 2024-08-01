<template>
  <Navbar />
  <router-view v-if="!isOnProductsPage" />
</template>
<script setup>
import Navbar from '../components/Navbar.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const currentPath = route.path

const isOnProductsPage = computed(() => {
  return currentPath.includes('/products')
})
</script>
