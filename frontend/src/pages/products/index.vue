<template>
  <v-container class="pa-0">
    <v-row class="d-flex justify-start align-start">
      <v-col
        cols="12"
        class="d-flex justify-space-between pb-0"
      >
        <h2>所有商品</h2>
        <v-text-field
          v-model="searchQuery"
          variant="outlined"
          density="compact"
          max-width="240"
          append-inner-icon="mdi-magnify"
          placeholder="搜尋商品"
          @input="onSearch"
        />
      </v-col>
      <v-col
        v-for="product in products"
        :key="product._id"
        cols="auto"
        class="px-0"
      >
        <ProductCard v-bind="product" />
      </v-col>
      <v-col cols="12">
        <v-pagination
          v-model="page"
          :length="pages"
          rounded="circle"
          density="compact"
          @update:model-value="loadProducts"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref, watch } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import ProductCard from '@/components/ProductCard.vue'

definePage({
  meta: {
    title: '所有商品 | VPT',
    login: false,
    admin: false
  }
})

const { api } = useApi()
const createSnackbar = useSnackbar()

const page = ref(1)
const pages = ref(1)
const ITEMS_PER_PAGE = 18
const searchQuery = ref('')

const products = ref([])
const loadProducts = async () => {
  try {
    const { data } = await api.get('/product', {
      params: {
        itemsPerPage: ITEMS_PER_PAGE,
        page: page.value,
        search: searchQuery.value // Add search query
      }
    })
    pages.value = Math.ceil(data.result.total / ITEMS_PER_PAGE)
    products.value.splice(0, products.value.length, ...data.result.data)
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
loadProducts()
// 搜尋時加載商品
const onSearch = () => {
  page.value = 1
  loadProducts()
}

// 當頁碼改變時重新加載商品
watch(page, () => {
  loadProducts()
})

</script>

<route lang="yaml">
  meta:
    layout: productdefault
  </route>
