<template>
  <v-card
    :to="'/products/' +_id"
    min-width="280"
    max-width="280"
    class="pb-2 rounded-lg border-sm mx-3"
    elevation="0"
  >
    <v-img
      :src="images[0]"
      cover
      height="200"
    />

    <v-card-title class="ps-0 pt-4">
      {{ name }}
    </v-card-title>
    <v-card-text
      class="text-right pe-2"
      style="font-size: 16px; font-weight: 500;"
    >
      {{ price }}
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { ref } from 'vue'

const user = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()

const props = defineProps(['_id', 'category', 'description', 'images', 'name', 'price', 'sell'])

const loading = ref(false)

const addCart = async () => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  loading.value = true
  const result = await user.addCart(props._id, 1)
  createSnackbar({
    text: result.text,
    snackbarProps: {
      color: result.color
    }
  })
  loading.value = false
}
</script>

<style lang="scss" scoped>
  @import '/src/styles/settings.scss';
</style>
