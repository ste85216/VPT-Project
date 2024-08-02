<template>
  <v-container>
    <h1>購物車</h1>
    <v-row>
      <!-- 左邊的商品清單 -->
      <v-col cols="8">
        <v-card
          v-for="item in items"
          :key="item._id"
          class="mb-4"
        >
          <v-row>
            <!-- 商品圖片 -->
            <v-col cols="2">
              <v-img
                :src="item.p_id.images[0]"
                class="elevation-2"
                height="80"
              />
            </v-col>
            <!-- 商品名稱和價格 -->
            <v-col cols="6">
              <div>{{ item.p_id.name }}</div>
              <div>{{ item.p_id.price }} 元</div>
            </v-col>
            <!-- 數量控制按鈕 -->
            <v-col cols="4">
              <v-row align="center">
                <v-col cols="3">
                  <v-btn
                    icon
                    @click="updateQuantity(item, item.quantity - 1)"
                  >
                    -
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.quantity"
                    type="number"
                    min="0"
                    @blur="updateQuantity(item, item.quantity)"
                  />
                </v-col>
                <v-col cols="3">
                  <v-btn
                    icon
                    @click="updateQuantity(item, item.quantity + 1)"
                  >
                    +
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- 右邊的總價和結帳按鈕 -->
      <v-col cols="4">
        <v-card class="pa-4">
          <div class="text-h6">
            總價: {{ totalPrice }} 元
          </div>
          <v-btn
            color="primary"
            class="mt-4"
            @click="checkout"
          >
            結帳
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/user'
import { ref, computed, watch } from 'vue'

definePage({
  meta: {
    title: '購物車 | VPT',
    login: true,
    admin: false
  }
})

const { apiAuth } = useApi()
const router = useRouter()
const user = useUserStore()
const createSnackbar = useSnackbar()

const items = ref([])

const loadItems = async () => {
  try {
    const { data } = await apiAuth.get('/user/cart')
    items.value = data.result.map(item => {
      return {
        ...item,
        quantity: item.quantity // 確保每個商品的數量與資料庫同步
      }
    })
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}

const updateQuantity = async (item, newQuantity) => {
  if (newQuantity < 1) {
    newQuantity = 1
  }

  try {
    // 直接更新商品的最終數量，而不是差值
    const result = await user.addCart(item.p_id._id, newQuantity)
    createSnackbar({ message: result.text, color: result.color })
    item.quantity = newQuantity // 更新前端顯示的數量
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: { color: 'red' }
    })
  }
}

watch(
  items,
  (newItems) => {
    newItems.forEach(item => {
      if (item.quantity < 1) {
        item.quantity = 1
      }
    })
  },
  { deep: true }
)

const totalPrice = computed(() => {
  return items.value.reduce((acc, item) => acc + (item.p_id.price * item.quantity), 0);
})

const checkout = async () => {
  try {
    const result = await user.checkout()
    createSnackbar({ message: result.text, color: result.color })
    if (result.color === 'green') {
      router.push('/order-confirmation') // 導向結帳完成頁面
    }
  } catch (error) {
    createSnackbar({ message: '結帳失敗', color: 'error' })
  }
}

loadItems()
</script>
