<template>
  <v-container
    class="px-4 px-lg-0 py-0 mt-10 h-75"
    style="max-width: 1200px;"
  >
    <h2 class="mb-5">
      購物車
    </h2>
    <v-row>
      <!-- 左邊的商品清單 -->
      <v-col
        cols="12"
        sm="7"
        md="8"
      >
        <v-card
          v-if="items.length === 0"
          class="mb-4 cart-card d-flex justify-center align-center"
        >
          <div class="text-gray">
            購物車內尚未加入商品
          </div>
        </v-card>
        <v-card
          v-for="item in items"
          :key="item._id"
          class="mb-4 cart-card py-4 ps-4 pe-5"
        >
          <v-row
            no-gutters
            class="d-flex justify-space-between"
          >
            <!-- 商品圖片 -->
            <v-col
              cols="4"
              md="2"
              class="d-flex align-center justify-center"
            >
              <v-img
                :src="item.p_id.images[0]"
                elevation="0"
                height="80"
                width="80"
              />
            </v-col>
            <!-- 商品名稱和價格 -->
            <v-col
              cols="6"
              md="9"
              class="d-flex flex-column justify-center"
            >
              <v-row
                no-gutters
              >
                <v-col
                  cols="12"
                  md
                  class="d-flex flex-column justify-center text-sm-center px-md-2"
                >
                  <div class="card-text">
                    {{ item.p_id.name }} / {{ item.p_id.price }} 元
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md=""
                  class="d-flex align-center justify-sm-center ps-md-2"
                >
                  <div class="card-text ">
                    {{ item.colors }} / {{ item.sizes }}
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  class="d-flex align-sm-center justify-sm-center"
                >
                  <v-row
                    no-gutters
                    class="d-flex align-sm-center justify-sm-center"
                  >
                    <v-col
                      cols="1"
                      sm="2"
                      md="4"
                      class="d-flex align-center justify-center me-3 me-md-0"
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
                      cols="3"
                      sm="4"
                      class="d-flex align-center me-3 me-md-0"
                    >
                      <v-text-field
                        v-model.number="item.quantity"
                        type="number"
                        min="1"
                        variant="outlined"
                        density="compact"
                        class="quantity-input"
                        @input="validateQuantity(item)"
                        @blur="handleQuantityBlur(item)"
                        @keypress.enter="handleQuantityBlur(item)"
                      />
                    </v-col>
                    <v-col
                      cols="1"
                      sm="2"
                      md="4"
                      class="d-flex align-center justify-center"
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
              </v-row>
            </v-col>
            <v-col
              cols="1"
              md="1"
              class="d-flex align-center justify-center"
            >
              <v-btn
                icon
                class="delete-btn"
                :ripple="false"
                variant="plain"
                @click="deleteItem(item)"
              >
                <v-icon
                  icon="mdi-delete"
                  color="red-darken-3"
                  class="pb-2"
                />
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- 右邊的總價和結帳按鈕 -->
      <v-col
        cols="12"
        sm="5"
        md="4"
      >
        <v-card
          class="pa-4 pb-0 cart-card mb-4"
          height="160"
        >
          <v-row>
            <v-col
              cols="12"
              class="pb-0"
            >
              <h4 class="note-title">
                訂單備註
              </h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pt-4">
              <v-textarea
                v-model="note"
                rows="2"
                variant="outlined"
                auto-grow
                base-color="#666"
                hide-details
                no-resize
                max-rows="2"
                :disabled="loading || items.length === 0"
              />
            </v-col>
          </v-row>
        </v-card>
        <v-card
          class="pa-4 pb-0 cart-card "
          height="150"
        >
          <v-row class="d-flex flex-column h-100">
            <v-col class="d-flex justify-space-between">
              <h4 class="total-price-title">
                結帳金額
              </h4>
              <div class="total-price">
                ${{ totalPrice }}
              </div>
            </v-col>
            <v-col class="pb-0">
              <v-btn
                color="primary"
                class="checkout-btn"
                :disabled="loading || items.length === 0"
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

  <!-- ConfirmDeleteDialog 組件 -->
  <ConfirmDeleteDialog
    v-model="confirmDialog.open"
    :title="confirmDialog.title"
    :message="confirmDialog.message"
    cancel-size="small"
    confirm-size="small"
    @confirm="confirmAction"
    @cancel="closeConfirmDialog"
  />
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/user'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue'

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
const note = ref('') // 訂單備註
const confirmDialog = ref({ open: false })

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
        color: 'red-lighten-1'
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
    confirmDialog.value = {
      open: true,
      title: '您確認要移除嗎？',
      message: '',
      action: () => updateQuantity(item, 0)
    }
    return
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
    confirmDialog.value = {
      open: true,
      title: '您確認要移除嗎？',
      message: '',
      action: () => updateQuantity(item, 0)
    }
  } else {
    await updateQuantity(item, 0)
  }
}

const confirmAction = async () => {
  if (confirmDialog.value.action) {
    await confirmDialog.value.action()
  }
  closeConfirmDialog()
}

const closeConfirmDialog = () => {
  confirmDialog.value.open = false
  confirmDialog.value.action = null
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
      snackbarProps: { color: 'red-lighten-1' }
    })
  }
}

const totalPrice = computed(() => {
  return items.value.reduce((acc, item) => acc + (item.p_id.price * item.quantity), 0)
})

const checkout = async () => {
  loading.value = true
  const result = await user.checkout(note.value)
  console.log(result)

  createSnackbar({
    text: result.text,
    snackbarProps: {
      color: result.color
    }
  })

  if (result.color === 'green') {
    router.push('/member/order')
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
  width: 16px;
  height: 16px;
}
.quantity-btn {
  width: 14px;
  height: 14px;
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

.quantity-input {
  :deep(.v-field__input) {
    min-height: 20px !important;
    padding: 0 4px !important;
    font-size: 10px;
  }
  :deep(.v-field__outline) {
    --v-field-border-width: 1px !important;
  }
  :deep(.v-field__input input) {
    font-size: 12px !important;
    padding: 0 !important;
  }
}

.card-text {
  font-size: 13px;
}

.total-price-title {
    font-size: 16px;
  }
  .total-price {
    font-size: 16px;
    font-weight: 500;
  }

.note-title {
  font-size: 14px;
  font-weight: 500;
}
@include md {
  .quantity-btn {
  width: 24px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 0;
  }
  .card-text {
    font-size: 15px;
  }
  .quantity-input {
  :deep(.v-field__input) {
    min-height: 32px !important;
    padding: 0 4px !important;
    font-size: 14px;
  }
  :deep(.v-field__outline) {
    --v-field-border-width: 1px !important;
  }
  :deep(.v-field__input input) {
    font-size: 12px !important;
    padding: 0 !important;
  }
  }
  .total-price-title {
    font-size: 18px;
  }
  .total-price {
    font-size: 18px;
    font-weight: 500;
  }
  .note-title {
    font-size: 16px;
  }
}
</style>
