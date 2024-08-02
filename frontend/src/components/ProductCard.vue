<template>
  <v-card
    :to="'/products/' + _id"
    min-width="280"
    max-width="280"
    class="pb-2 rounded-lg border-sm mx-3"
    elevation="0"
  >
    <v-img
      :src="props.images[0]"
      cover
      height="200"
    />

    <v-card-title class="ps-0 pt-4">
      {{ props.name }}
    </v-card-title>
    <v-card-text
      class="text-right pe-2"
      style="font-size: 16px; font-weight: 500;"
    >
      {{ props.price }} 元
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps(['_id', 'category', 'description', 'images', 'name', 'price', 'sell'])
</script>

<style lang="scss" scoped>
  @import '/src/styles/settings.scss';
</style>
