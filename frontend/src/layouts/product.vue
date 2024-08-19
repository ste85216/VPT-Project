<template>
  <v-container
    style="max-width: 1280px;"
    class="pa-0 pt-md-10 product-container"
  >
    <v-row
      class=" h-100 px-0 pe-0 px-sm-8"
      no-gutters
    >
      <v-col
        v-if="mdAndUp"
        style="width: 240px;"
        class="px-10 pt-6"
      >
        <h3>分類</h3>
        <v-list class="pa-0">
          <v-list-item
            v-for="category in categories"
            :key="category.to"
            :to="category.to"
            :ripple="false"
            :disabled="true"
            variant="plain"
            class="pa-0 mt-5 "
            style="font-size: 15px;"
          >
            <v-list-item-title style="font-size: 15px; letter-spacing: 2px;">
              {{ category.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-expansion-panels
          v-model="expandedPanel"
          variant="accordion"
          class="custom-expansion-panels mt-3"
        >
          <v-expansion-panel
            elevation="0"
          >
            <v-expansion-panel-title
              class="pa-0 custom-icon mt-2"
              collapse-icon="mdi-minus-box-outline"
              expand-icon="mdi-plus-box-outline"
            >
              <v-btn
                variant="plain"
                :ripple="false"
                class="pa-0"
                to="/products"
                style="opacity: 1; color:#333; font-size: 15px; font-weight:400;"
              >
                所有商品
              </v-btn>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list>
                <v-list-item
                  v-for="subcategory in subcategories"
                  :key="subcategory.to"
                  :to="subcategory.to"
                  :ripple="false"
                  variant="plain"
                  class="pa-0 mb-2 custom"
                >
                  <v-list-item-title style="font-size: 15px; font-weight: 400;">
                    {{ subcategory.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col
        cols="12"
        md="9"
        class="pa-0"
        style="max-height: 100%;"
      >
        <v-container class="pa-sm-4 h-100">
          <!-- 麵包屑 -->
          <v-breadcrumbs
            :items="breadcrumbs"
            class="pa-0 pb-5 pt-3 custom-breadcrumbs"
          />
          <router-view />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
const route = useRoute()
const { api } = useApi()
const createSnackbar = useSnackbar()
const breadcrumbs = ref([
  { title: '所有商品', disabled: false, to: '/products' }
])
const productCategory = ref(null)

const loadProductCategory = async (id) => {
  try {
    const { data } = await api.get(`/product/${id}`)
    productCategory.value = data.result.category
    updateBreadcrumbs()
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red-lighten-1'
      }
    })
  }
}

const expandedPanel = ref([0])

const categories = ref([
  { title: '熱銷商品', to: '/products/bestsellers' },
  { title: '新品上市', to: '/products/new' }
])

const subcategories = ref([
  { title: '球衣', to: '/products/shirts' },
  { title: '球褲', to: '/products/pants' },
  { title: '排球', to: '/products/balls' },
  { title: '球鞋', to: '/products/shoes' },
  { title: '球襪', to: '/products/socks' },
  { title: '護具', to: '/products/protection' },
  { title: '其他', to: '/products/others' }
])

const subCategoriesMap = {
  '/products/shirts': '球衣',
  '/products/pants': '球褲',
  '/products/balls': '排球',
  '/products/socks': '球襪',
  '/products/shoes': '球鞋',
  '/products/protection': '護具',
  '/products/others': '其他'
}

const categoriesMap = {
  '/products': '所有商品',
  '/products/bestsellers': '熱銷商品',
  '/products/new': '新品上市'
}

const subCategoryPathMap = {
  球衣: '/products/shirts',
  球褲: '/products/pants',
  排球: '/products/balls',
  球襪: '/products/socks',
  球鞋: '/products/shoes',
  護具: '/products/protection',
  其他: '/products/others'
}

const updateBreadcrumbs = () => {
  const subCategory = subCategoriesMap[route.path]
  const category = categoriesMap[route.path]
  const productId = route.params.id
  const queryCategory = route.query.category
  const subCategoryPath = subCategoryPathMap[productCategory.value || queryCategory] || ''

  if (category) {
    breadcrumbs.value = [
      { title: category, disabled: false, to: route.path }
    ]
  } else if (subCategory) {
    breadcrumbs.value = [
      { title: '所有商品', disabled: false, to: '/products' },
      { title: subCategory, disabled: false, to: route.path }
    ]
  } else if (productId && (productCategory.value || queryCategory)) {
    breadcrumbs.value = [
      { title: '所有商品', disabled: false, to: '/products' },
      { title: productCategory.value || queryCategory, disabled: false, to: subCategoryPath },
      { title: '商品詳情', disabled: true }
    ]
  } else {
    breadcrumbs.value = [
      { title: '所有商品', disabled: false, to: '/products' }
    ]
  }
}

watch(route, async (newRoute) => {
  if (newRoute.params.id) {
    await loadProductCategory(newRoute.params.id)
  } else {
    updateBreadcrumbs()
  }
}, { immediate: true, deep: true })

// 移除原來的 onMounted 钩子，因為 watch 的 immediate: true 會在組件掛載時立即執行一次
</script>

<style lang="scss" scoped>
@import '/src/styles/settings.scss';
h2{
  color: #333;
}

:deep(.v-expansion-panel-title__overlay) {
    background-color: transparent;
    transition: none;
  }
// :deep(.expand-transition-panel-enter-active),
// :deep(.expand-transition-leave-to),
// :deep(.expand-transition-panel-leave-active),
// :deep(.expand-transition-enter-to) {
//     transition: none;
//   }
:deep(.custom-icon .v-icon) {
    font-size: 18px;
    color: #333;
  }

.custom-breadcrumbs {
    font-size: 12px;
    color: #333;
    font-weight: 400;
    :deep(.v-breadcrumbs-item) {
      padding: 0;
    }
    @include md {
      font-size: 15px;
    }
  }

.product-container {
    margin-bottom: 25%;
    padding-bottom: 0;
    @include sm {
      margin-bottom: 10%;
    }
  }
</style>
