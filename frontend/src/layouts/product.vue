<template>
  <v-container
    style="max-width: 1200px; height: 100%;"
    class="pa-0 pt-10"
  >
    <v-row class="ps-5 h-100">
      <v-col style="max-width: 240px;">
        <h3>分類</h3>
        <v-list class="pa-0">
          <v-list-item
            v-for="category in categories"
            :key="category.to"
            :to="category.to"
            :ripple="false"
            variant="plain"
            class="pa-0 mt-5 custom"
          >
            <v-list-item-title style="font-size: 15px;">
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
              class="pa-0 custom-icon"
              collapse-icon="mdi-minus-box-outline"
              expand-icon="mdi-plus-box-outline"
            >
              所有商品
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
        cols="9"
        class="pa-0 ps-10"
        style="max-height: 100%;"
      >
        <v-container class="pa-0 h-100">
          <!-- 麵包屑 -->
          <v-breadcrumbs
            :items="breadcrumbs"
            class="pa-0 pb-5 pt-3"
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

const route = useRoute()

const expandedPanel = ref([0])

const categories = ref([
  { title: '熱銷商品', to: '/products/bestsellers' },
  { title: '新品上市', to: '/products/new' }
])

const subcategories = ref([
  { title: '排球衣', to: '/products/shirts' },
  { title: '排球褲', to: '/products/pants' },
  { title: '排球', to: '/products/balls' },
  { title: '排球襪', to: '/products/socks' },
  { title: '護具', to: '/products/protection' },
  { title: '其他', to: '/products/others' }
])

const breadcrumbs = ref([
  { title: '所有商品', disabled: false, to: '/products' }
])

const products = ref([])

const fetchProductsForCategory = (category) => {
  // 模擬根據分類獲取產品列表
  return [
    { name: `${category} 商品 1` },
    { name: `${category} 商品 2` },
    { name: `${category} 商品 3` }
  ]
}

const categoriesMap = {
  '/products': '所有商品',
  '/products/shirts': '排球衣',
  '/products/pants': '排球褲',
  '/products/balls': '排球',
  '/products/socks': '排球襪',
  '/products/protection': '護具',
  '/products/others': '其他',
  '/products/bestsellers': '熱銷商品',
  '/products/new': '新品上市'
}

watch(route, (newRoute) => {
  const category = categoriesMap[newRoute.path] || '所有商品'
  breadcrumbs.value = [
    { title: '所有商品', disabled: false, to: '/products' },
    { title: category, disabled: true }
  ]
  products.value = fetchProductsForCategory(category)
})
</script>

<style lang="scss" scoped>
@import '/src/styles/settings.scss';
h2{
  color: #333;
}

:deep(.v-expansion-panel-title__overlay) {
    background-color: transparent;
  }
:deep(.custom-icon .v-icon) {
    font-size: 18px;
    color: #333;
  }
</style>
