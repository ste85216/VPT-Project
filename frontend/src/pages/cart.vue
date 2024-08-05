<template>
  <v-container
    class="pa-0 mt-10"
    style="max-width: 1200px;"
  >
    <h2 class="mb-5">
      購物車
    </h2>
    <v-row>
      <!-- 左邊的商品清單 -->
      <v-col cols="8">
        <v-card
          v-for="item in items"
          :key="item._id"
          class="mb-4 cart-card"
        >
          <v-row>
            <!-- 商品圖片 -->
            <v-col cols="2">
              <v-img
                :src="item.p_id.images[0]"
                elevation="0"
                height="80"
                width="80"
              />
            </v-col>
            <!-- 商品名稱和價格 -->
            <v-col
              cols="2"
              class="d-flex flex-column justify-center"
            >
              <div>{{ item.p_id.name }}</div>
              <div>{{ item.p_id.price }} 元</div>
            </v-col>
            <!-- 商品顏色和尺寸 -->
            <v-col
              cols="3"
              class="d-flex align-center"
            >
              <div>{{ item.colors }} / {{ item.sizes }}</div>
            </v-col>
            <!-- 數量控制按鈕 -->
            <v-col
              cols="4"
              class="d-flex align-center"
            >
              <v-row>
                <v-col
                  cols="3"
                  class="d-flex align-center"
                >
                  <v-btn
                    icon
                    size="x-small"
                    elevation="0"
                    class="quantity-btn"
                    @click="changeQuantity(item, item.quantity - 1)"
                  >
                    <v-icon
                      icon="mdi-minus"
                      size="small"
                      class="minus-btn"
                    />
                  </v-btn>
                </v-col>
                <v-col
                  cols="5"
                  class="d-flex align-center"
                >
                  <v-text-field
                    v-model.number="item.quantity"
                    type="number"
                    min="1"
                    variant="outlined"
                    density="compact"
                    @input="validateQuantity(item)"
                    @blur="handleQuantityBlur(item)"
                    @keypress.enter="handleQuantityBlur(item)"
                  />
                </v-col>
                <v-col
                  cols="3"
                  class="d-flex align-center"
                >
                  <v-btn
                    icon
                    size="x-small"
                    elevation="0"
                    class="quantity-btn"
                    @click="changeQuantity(item, item.quantity + 1)"
                  >
                    <v-icon
                      icon="mdi-plus"
                      size="small"
                      class="plus-btn"
                    />
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="d-flex align-center">
              <v-btn
                size="xl"
                icon
                variant="text"
              >
                <v-icon
                  icon="mdi-delete"
                  class="delete-btn"
                  @click="deleteItem(item)"
                />
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- 右邊的總價和結帳按鈕 -->
      <v-col cols="4">
        <v-card
          class="pa-4 pb-0 cart-card "
          height="150"
        >
          <v-row class="d-flex flex-column h-100">
            <v-col class="d-flex justify-space-between">
              <h4 style="font-size: 18px;">
                結帳金額
              </h4>
              <div style="font-size: 18px;font-weight: 500;">
                ${{ totalPrice }}
              </div>
            </v-col>
            <v-col class="pb-0">
              <v-btn
                color="primary"
                class="checkout-btn"
                :disabled="loading"
                @click="checkout"
              >
                結帳
              </v-btn>
            </v-col>
          </v-row>
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
import Swal from 'sweetalert2'

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

const items = ref([]) // 購物車中的商品
const loading = ref(false) // 標示是否正在載入或處理請求

const loadItems = async () => {
  try {
    const { data } = await apiAuth.get('/user/cart')
    // 過濾掉 p_id 不存在或 p_id.sell 為 false 的商品
    const validItems = data.result.filter(item => item.p_id && item.p_id.sell)
    // 刪除無效商品
    const invalidItems = data.result.filter(item => !item.p_id || !item.p_id.sell)
    for (const item of invalidItems) {
      await deleteItem(item, false) // false 表示不彈出確認對話框
    }
    // 將最新加入的商品排在最上面
    items.value = validItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    user.cart = validItems // 更新 user.cart 確保 cartQuantity 正確
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}

const handleQuantityBlur = async (item) => {
  if (!item.quantity || item.quantity < 1) {
    item.quantity = 1
  }
  await updateQuantity(item, item.quantity)
}

const validateQuantity = (item) => {
  if (isNaN(item.quantity) || item.quantity === null || item.quantity === '') {
    item.quantity = 1
  }
}
const changeQuantity = async (item, newQuantity) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }

  if (newQuantity < 1) {
    const result = await Swal.fire({
      title: '確認要移除此商品嗎？',
      icon: 'warning',
      iconColor: 'success',
      showCancelButton: true,
      confirmButtonText: '確認',
      confirmButtonColor: '#d9534f',
      cancelButtonText: '取消',
      cancelButtonColor: '#a1a1a1',
      focusConfirm: false,
      returnFocus: false,
      width: '25%',
      customClass: {
        confirmButton: 'me-5 fw-light',
        cancelButton: 'ms-5'
      },
      didOpen: () => {
        document.body.style.paddingRight = '0px'
      }
    })
    if (result.isConfirmed) {
      await updateQuantity(item, 0)
      return
    } else {
      newQuantity = 1
    }
  }

  item.quantity = newQuantity // 先更新本地數量
  await updateQuantity(item, newQuantity)
}

const deleteItem = async (item, showConfirmation = true) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }

  if (showConfirmation) {
    const result = await Swal.fire({
      title: '確認要移除此商品嗎？',
      icon: 'warning',
      iconColor: 'success',
      showCancelButton: true,
      confirmButtonText: '確認',
      confirmButtonColor: '#d9534f',
      cancelButtonText: '取消',
      cancelButtonColor: '#a1a1a1',
      focusConfirm: false,
      returnFocus: false,
      width: '25%',
      customClass: {
        confirmButton: 'me-5 fw-light',
        cancelButton: 'ms-5'
      },
      didOpen: () => {
        document.body.style.paddingRight = '0px'
      }
    })

    if (!result.isConfirmed) {
      return
    }
  }

  await updateQuantity(item, 0)
}

const updateQuantity = async (item, newQuantity = null) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }

  try {
    loading.value = true
    const quantity = newQuantity !== null ? newQuantity : item.quantity
    const result = await user.addCart(item.p_id._id, quantity, item.colors, item.sizes)
    if (result.color === 'green') {
      if (quantity === 0) {
        items.value = items.value.filter(i => i._id !== item._id) // 移除商品
      } else {
        item.quantity = quantity // 更新商品數量
      }
      user.cart = items.value.slice() // 直接更新引用來觸發更新
    } else {
      createSnackbar({
        text: result.text,
        snackbarProps: {
          color: result.color
        }
      })
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

const totalPrice = computed(() => {
  return items.value.reduce((acc, item) => acc + (item.p_id.price * item.quantity), 0)
})

const checkout = async () => {
  loading.value = true
  const result = await user.checkout()

  createSnackbar({
    text: result.text,
    snackbarProps: {
      color: result.color
    }
  })

  if (result.color === 'green') {
    router.push('/order')
    loading.value = false
  }
}

loadItems()
</script>

<style lang="scss" scoped>
@import "@/styles/settings.scss";
:deep(.v-input__details) {
  display: none;
}
.cart-card {
  padding: 24px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: none;
}
.delete-btn {
  color: $danger-color;
}
.quantity-btn {
  border: 1px solid rgba(0, 0, 0, 0.2);
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 0;
}
.plus-btn {
  color: $primary-color;
}
.minus-btn {
  color: $danger-color;
}

.checkout-btn {
  width: 100%;
}
</style>
