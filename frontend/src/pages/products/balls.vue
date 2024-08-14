<template>
  <v-container class="pa-0">
    <v-row class="d-flex justify-start align-start">
      <v-col
        cols="12"
        class="d-flex justify-space-between pb-0"
      >
        <v-row>
          <v-col><h2>所有商品</h2></v-col>
          <v-col
            sm="3"
          >
            <v-text-field
              v-model="searchQuery"
              variant="outlined"
              density="compact"
              max-width="240"
              append-inner-icon="mdi-magnify"
              placeholder="搜尋商品"
              :loading="isSearching"
              clearable
              @input="debounceSearch"
              @click:clear="clearSearch"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        v-if="isLoading"
        cols="12"
        class="text-center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </v-col>
      <template v-else>
        <v-col
          v-for="product in products"
          :key="product._id"
          cols="6"
          md="4"
          class="px-0 d-flex justify-center"
        >
          <ProductCard v-bind="product" />
        </v-col>
        <v-col
          v-if="products.length === 0"
          cols="12"
          class="text-center"
        >
          <p>沒有找到相關商品</p>
        </v-col>
      </template>
      <v-col
        v-if="pages > 1"
        cols="12"
      >
        <v-pagination
          v-model="page"
          :length="pages"
          rounded="circle"
          density="compact"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          color="teal-darken-1"
          @update:model-value="onPageChange"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import ProductCard from '@/components/ProductCard.vue'
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '排球 | VPT',
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
const category = ref('排球')
const products = ref([])
const isLoading = ref(false)
const isSearching = ref(false)

const loadProducts = async () => {
  isLoading.value = true
  try {
    const params = {
      itemsPerPage: ITEMS_PER_PAGE,
      page: page.value,
      category: category.value,
      search: searchQuery.value
    }

    const { data } = await api.get('/product', { params })

    if (data.success) {
      products.value = data.result.data
      pages.value = Math.ceil(data.result.total / ITEMS_PER_PAGE)
    } else {
      throw new Error(data.message || '載入商品失敗')
    }
  } catch (error) {
    console.error('載入商品時發生錯誤:', error)
    createSnackbar({
      text: error.message || '載入商品時發生錯誤',
      snackbarProps: {
        color: 'red-lighten-1'
      }
    })
    products.value = []
    pages.value = 1
  } finally {
    isLoading.value = false
  }
}

const debounceSearch = (() => {
  let timer
  return () => {
    isSearching.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      page.value = 1
      loadProducts()
      isSearching.value = false
    }, 300)
  }
})()

const clearSearch = () => {
  searchQuery.value = ''
  page.value = 1
  loadProducts()
}

const onPageChange = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  loadProducts()
}

watch(category, () => {
  page.value = 1
  loadProducts()
})

watch(searchQuery, (newValue) => {
  if (newValue === '') {
    page.value = 1
    loadProducts()
  }
})

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
/* 可以添加任何特定於此組件的樣式 */
</style>

<route lang="yaml">
meta:
  layout: productdefault
</route>
