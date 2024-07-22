<template>
  <v-card>
    <v-img :src="image" cover height="200"></v-img>
    <v-card-title>
      <router-link :to="'/products/' + _id">{{ name }}</router-link>
    </v-card-title>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>