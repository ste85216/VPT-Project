<template>
  <v-container>
    <v-row>
      <v-col
        class="pa-0 pt-5"
        cols="6"
      >
        <v-img
          :src="product.images[0]"
          height="500"
          class="rounded-xl elevation-6"
          cover
        />
      </v-col>
      <v-col
        cols="6"
        class="ps-16"
      >
        <v-col>
          <h2>
            {{ product.name }}
          </h2>
          <v-sheet>{{ product.description }}</v-sheet>
        </v-col>
        <v-col>
          <h3>尺寸</h3>
          <v-chip-group>
            <v-chip
              v-for="(size, index) in product.sizes"
              :key="index"
            >
              {{ size }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col>
          <h3>顏色</h3>
          <v-chip-group>
            <v-chip
              v-for="(color, index) in product.colors"
              :key="index"
            >
              {{ color }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col>
          <h3>數量</h3>
          <!-- @click="addCart(item.p_id._id, -1)" -->
          <!-- <template #[`item.quantity`]="{item}"> -->
          <v-btn
            variant="text"
            color="red"
            class="border-sm"
          >
            -
          </v-btn>
          <span class="px-5">0</span>
          <!-- @click="addCart(item.p_id._id, 1)" -->
          <v-btn
            variant="text"
            color="green"
            class="border-sm"
          >
            +
          </v-btn>
          <!-- </template> -->
        </v-col>
        <v-card-actions class="pa-0">
          <v-spacer />
          <v-btn
            color="primary"
            prepend-icon="mdi-cart"
          >
            加入購物車
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <v-col cols="12" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/axios'
import { definePage } from 'vue-router/auto'
import { useSnackbar } from 'vuetify-use-dialog'

definePage({
  meta: {
    title: '商品詳情 | VPT',
    login: false,
    admin: false
  }
})

const { api } = useApi()
const route = useRoute()
const createSnackbar = useSnackbar()

const product = ref({
  _id: '',
  name: '',
  price: 0,
  images: [],
  sell: true,
  description: '',
  category: '',
  colors: [],
  sizes: []
})

const load = async () => {
  try {
    const { data } = await api.get(`/product/${route.params.id}`)
    product.value._id = data.result._id
    product.value.name = data.result.name
    product.value.price = data.result.price
    product.value.images = data.result.images
    product.value.sell = data.result.sell
    product.value.description = data.result.description
    product.value.category = data.result.category
    product.value.colors = data.result.colors
    product.value.sizes = data.result.sizes

    // 將顏色字符串轉換為陣列
    if (Array.isArray(product.value.colors) && product.value.colors.length === 1) {
      product.value.colors = product.value.colors[0].split(',')
    }

    if (Array.isArray(product.value.sizes) && product.value.sizes.length === 1) {
      product.value.sizes = product.value.sizes[0].split(',')
    }

    console.log(product.value.colors)
    document.title = `${product.value.name} | VPT`
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}
load()
</script>

<route lang="yaml">
  meta:
    layout: productdefault
</route>

<style lang="scss" scoped>
h3 {
  font-size: 16px;
  font-weight: 400;
}
</style>
