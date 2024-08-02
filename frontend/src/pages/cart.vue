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
                    @click="changeQuantity(item, item.quantity - 1)"
                  >
                    -
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model.number="item.quantity"
                    type="number"
                    min="1"
                    @blur="updateQuantity(item)"
                    @keypress.enter="updateQuantity(item)"
                  />
                </v-col>
                <v-col cols="3">
                  <v-btn
                    icon
                    @click="changeQuantity(item, item.quantity + 1)"
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
            :disabled="loading"
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
import { ref, computed } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/user'

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
const loading = ref(false)

const loadItems = async () => {
  try {
    const { data } = await apiAuth.get('/user/cart')
    items.value = data.result // 確保每個商品的數量與資料庫同步
    updateCartQuantity() // 更新購物車總數量
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}

const changeQuantity = async (item, newQuantity) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }

  if (newQuantity < 1) {
    newQuantity = 1
  }

  await updateQuantity(item, newQuantity, false)
}

const updateQuantity = async (item, newQuantity = null, showSnackbar = false) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }

  try {
    loading.value = true
    const quantity = newQuantity !== null ? newQuantity : item.quantity
    const result = await user.addCart(item.p_id._id, quantity)
    if (showSnackbar) {
      createSnackbar({
        text: result.text,
        snackbarProps: {
          color: result.color
        }
      })
    }
    if (result.color === 'green') {
      item.quantity = quantity
      updateCartQuantity()
    }
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: { color: 'red' }
    })
  }
}

const updateCartQuantity = () => {
  const totalQuantity = items.value.reduce((acc, item) => acc + item.quantity, 0)
  user.cart = totalQuantity // 更新用戶商店中的購物車總數量
}

const totalPrice = computed(() => {
  return items.value.reduce((acc, item) => acc + (item.p_id.price * item.quantity), 0)
})

const checkout = async () => {
  loading.value = true
  try {
    const result = await user.checkout()
    createSnackbar({ message: result.text, color: result.color })
    if (result.color === 'green') {
      router.push('/order-confirmation') // 導向結帳完成頁面
    }
  } catch (error) {
    createSnackbar({ message: '結帳失敗', color: 'error' })
  }
  loading.value = false
}

loadItems()
</script>
