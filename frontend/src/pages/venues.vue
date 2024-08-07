<template>
  <v-container
    class="mt-8"
    style="max-width: 1200px;"
  >
    <h2>球場資訊</h2>
    <v-row class="mt-4">
      <div
        class="ps-4"
        style="color: #333;font-size: 16px; font-weight: 500;"
      >
        地區 :
      </div>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-select
          variant="outlined"
          density="compact"
        />
      </v-col>
      <v-spacer />
      <v-col cols="3">
        <v-text-field
          v-model="tableSearch"
          label="搜尋"
          append-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          @click-append="tableLoadItems(true)"
          @keydown.enter="tableLoadItems(true)"
        />
      </v-col>
    </v-row>

    <v-container class="pa-0 mt-8">
      <v-row>
        <v-col><VenueCard /></v-col>
        <v-col><VenueCard /></v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import VenueCard from '@/components/VenueCard.vue'

definePage({
  meta: {
    title: '球場資訊 | VPT'
  }
})
</script>
