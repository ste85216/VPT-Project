<template>
  <swiper
    v-if="products.length > 1"
    :effect="'coverflow'"
    :centered-slides="true"
    :slides-per-view="'auto'"
    :space-between="30"
    :coverflow-effect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :pagination="{
      el: '.swiper-pagination',
      clickable: true,
    }"
    :autoplay="{
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    :loop="products.length > 2"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      v-for="product in products"
      :key="product._id"
    >
      <router-link :to="`/products/${product._id}`">
        <img
          :src="product.images[0]"
          :alt="product.name"
        >
      </router-link>
    </swiper-slide>
    <div class="swiper-button-next" />
    <div class="swiper-button-prev" />
    <div class="swiper-pagination" />
  </swiper>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import 'swiper/css/bundle'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const modules = [Autoplay, Navigation, Pagination, EffectCoverflow]
const { api } = useApi()
const createSnackbar = useSnackbar()

// 使用 ref 來存儲從後端獲取的數據
const products = ref([])
const isLoading = ref(false)

// 從後端獲取數據的函數
const loadProducts = async () => {
  isLoading.value = true
  try {
    const params = {
      itemsPerPage: 10,
      page: 1,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    }
    const { data } = await api.get('/product', { params })

    if (data.success) {
      products.value = data.result.data.filter(product => product.sell)
      console.log('Loaded products:', products.value.length) // 添加這行來檢查加載的產品數量
    } else {
      throw new Error(data.message || '載入商品失敗')
    }
  } catch (error) {
    console.error('載入商品時發生錯誤:', error)
    createSnackbar({
      text: error.message || '載入商品時發生錯誤',
      snackbarProps: {
        color: 'error'
      }
    })
    products.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<style lang="scss" scoped>
.mySwiper {
  width: 100%;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 280px;
  height: 320px;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-button-next,
.swiper-button-prev {
  width: 60px;
  height: 60px;
  color: white;
  background-color: #26A69A;
  border-radius: 50%;
  transition: 0.8s;
  display: none;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 18px;
  font-weight: 900;
}

.swiper-button-prev::after {
  position: absolute;
  left: 23px;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: #edc453;
}

:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 8px;
  background-color: #edc453;
  opacity: 1;
  border-radius: 23rem;
}

:deep(.swiper-pagination-bullet-active) {
  width: 50px;
  height: 8px;
  background-color: #26A69A;
  opacity: 1;
  border-radius: 23rem;
  transition: 0.35s;
  -webkit-transition: 0.35s ease-in-out;
  transform-origin: left;
}

@media (min-width: 768px) {
  .swiper-button-next,
  .swiper-button-prev {
    display: flex;
  }
  :deep(.swiper-pagination-bullet) {
    width: 16px;
  }
  :deep(.swiper-pagination-bullet-active) {
    width: 80px
  }
}

@media (min-width: 1200px) {
  :deep(.swiper-pagination-bullet) {
    width: 20px;
  }
  :deep(.swiper-pagination-bullet-active) {
    width: 120px
  }
}
</style>
