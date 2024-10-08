<template>
  <v-row
    class="mt-4"
  >
    <v-col
      cols="12"
      class="pt-0"
    >
      <v-row>
        <v-col
          cols="12"
          sm="3"
        >
          <h3 class="opacity-90 mb-4">
            訂單管理
          </h3>
        </v-col>
      </v-row>
    </v-col>
    <v-col class="pt-0 pb-2">
      <v-divider />
    </v-col>
    <v-col cols="12">
      <v-sheet
        v-if="orders.length === 0"
        height="100%"
        align="center"
        class="opacity-80"
      >
        目前您沒有任何訂單
      </v-sheet>

      <!-- 訂單列表 -->
      <v-expansion-panels v-if="mdAndUp">
        <v-expansion-panel
          v-for="(order, index) in orders"
          :key="order._id"
          class="mb-4"
        >
          <v-expansion-panel-title
            :style="{ backgroundColor: index % 2 === 0 ? '#ECEFF190' : '#f0f0f080' }"
          >
            <v-row
              class="text-center py-4"
              style="font-size: 15px;"
            >
              <v-col cols="4">
                <div class="text-subtitle-2 font-weight-bold mb-4">
                  訂單編號
                </div>
                <div>{{ order._id }}</div>
              </v-col>
              <v-col>
                <div class="text-subtitle-2 font-weight-bold mb-4">
                  訂單日期
                </div>
                <div>{{ formatDate(order.createdAt) }}</div>
              </v-col>
              <v-col>
                <div class="text-subtitle-2 font-weight-bold mb-4">
                  訂單總額
                </div>
                <div>${{ calculateTotal(order.cart) }}</div>
              </v-col>
              <v-col>
                <div class="text-subtitle-2 font-weight-bold mb-4">
                  訂單備註
                </div>
                <div>{{ order.note || '無' }}</div>
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list>
              <v-list-item
                class="mb-3 opacity-90"
                style="font-size: 12px;"
              >
                <v-row
                  style="font-size: 14px; font-weight: 500;"
                  class="text-center"
                >
                  <v-col cols="2">
                    商品縮圖
                  </v-col>
                  <v-col cols="2">
                    商品名稱
                  </v-col>
                  <v-col cols="2">
                    商品規格
                  </v-col>
                  <v-col cols="2">
                    商品價格
                  </v-col>
                  <v-col cols="2">
                    商品數量
                  </v-col>
                  <v-col cols="2">
                    商品小計
                  </v-col>
                </v-row>
              </v-list-item>
              <v-list-item
                v-for="item in order.cart"
                :key="item.p_id._id"
              >
                <v-row
                  style="font-size: 14px;"
                  class="text-center"
                >
                  <v-col cols="2">
                    <v-img
                      :src="item.p_id.images[0]"
                      height="50"
                    />
                  </v-col>
                  <v-col
                    cols="2"
                    class="align-self-center"
                  >
                    {{ item.p_id.name }}
                  </v-col>
                  <v-col
                    cols="2"
                    class="align-self-center"
                  >
                    {{ item.colors }} / {{ item.sizes }}
                  </v-col>
                  <v-col
                    cols="2"
                    class="align-self-center"
                  >
                    ${{ item.p_id.price }}
                  </v-col>
                  <v-col
                    cols="2"
                    class="align-self-center"
                  >
                    {{ item.quantity }}
                  </v-col>
                  <v-col
                    cols="2"
                    class="align-self-center"
                  >
                    ${{ item.p_id.price * item.quantity }}
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
            <v-col class="d-flex justify-end pe-6">
              <v-btn

                color="red-darken-3"
                variant="outlined"
                @click.stop="cancelOrder(order._id)"
              >
                取消訂單
              </v-btn>
            </v-col>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- 小尺寸螢幕顯示 -->
      <v-expansion-panels v-if="!mdAndUp">
        <v-expansion-panel
          v-for="(order, index) in orders"
          :key="order._id"
          class="mb-4"
        >
          <v-expansion-panel-title
            :style="{ backgroundColor: index % 2 === 0 ? '#ECEFF190' : '#f0f0f080' }"
          >
            <v-row>
              <v-col
                cols="4"
                sm="3"
              >
                <v-img
                  :src="order?.cart[0]?.p_id?.images?.[0]"
                  cover
                  class="data-img"
                />
              </v-col>
              <v-col
                cols="8"
                sm="9"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="7"
                  >
                    <div class="order-data-title mb-1">
                      訂單編號 :
                    </div>
                    <div class="order-data-text">
                      {{ order._id }}
                    </div>
                  </v-col>
                  <v-col
                    class="pt-0 pt-sm-3"
                    sm="5"
                  >
                    <div class="order-data-title mb-1">
                      訂單日期 :
                    </div>
                    <div class="order-data-text">
                      {{ formatDate(order.createdAt) }}
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list>
              <v-list-item
                v-for="item in order.cart"
                :key="item.p_id._id"
              >
                <v-row>
                  <v-col
                    cols="3"
                    class="ps-sm-4"
                  >
                    <v-img
                      :src="item.p_id.images[0]"
                      height="50"
                      width="50"
                    />
                  </v-col>
                  <v-col class="d-flex">
                    <v-row no-gutters>
                      <v-col
                        cols="12"
                        class="align-self-center product-text"
                      >
                        {{ item.p_id.name }}
                      </v-col>
                      <v-col
                        cols="12"
                        class="align-self-center product-text"
                      >
                        {{ item.colors }} / {{ item.sizes }}
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col

                    class="d-flex"
                  >
                    <v-row
                      no-gutters
                    >
                      <v-col
                        cols="12"
                        class="align-self-center product-text"
                      >
                        ${{ item.p_id.price }}
                      </v-col>
                      <v-col
                        cols="12"
                        class="align-self-center product-text"
                      >
                        數量: {{ item.quantity }}
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col
                    cols="3"
                    class="d-flex per-total"
                  >
                    <v-row no-gutters>
                      <v-col
                        cols="12"
                        class="align-self-center"
                      >
                        商品小計:
                      </v-col>
                      <v-col
                        cols="12"
                        class="align-self-center"
                      >
                        ${{ item.p_id.price * item.quantity }}
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col
                    cols="12"
                    class="pt-0 mb-2"
                  >
                    <v-divider />
                  </v-col>
                </v-row>
              </v-list-item>

              <v-list-item>
                <v-row class="justify-end">
                  <v-col
                    cols="12"
                    class="total-price d-flex align-self-center justify-end pe-sm-16"
                  >
                    訂單總額: <span class="total-price-tag ps-1">${{ calculateTotal(order.cart) }}</span>
                  </v-col>
                  <v-col
                    cols="12"
                    class="d-flex align-self-center justify-end pe-sm-16"
                  >
                    <v-btn
                      class="cancel-btn"
                      color="red-darken-3"
                      variant="outlined"
                      size="x-small"
                      @click.stop="cancelOrder(order._id)"
                    >
                      取消訂單
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>

  <!-- 確認取消對話框 -->
  <ConfirmDeleteDialog
    v-model="confirmDialog.open"
    title="確認要取消此訂單嗎？"
    message="取消後不可恢復。"
    confirm-text="確認"
    cancel-text="取消"
    confirm-color="red-darken-3"
    cancel-color="blue-grey-darken-1"
    cancel-size="small"
    confirm-size="small"
    @confirm="confirmCancelOrder"
    @cancel="closeConfirmDialog"
  />
</template>

<script setup>
// Script 部分保持不變
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { definePage } from 'vue-router/auto'
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog.vue'
import { useDisplay } from 'vuetify'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const { mdAndUp } = useDisplay()

const orders = ref([])
const confirmDialog = ref({ open: false })
const orderIdToCancel = ref(null)

const loadOrders = async () => {
  try {
    const { data } = await apiAuth.get('/order')
    orders.value = data.result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    console.log(data.result)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '無法加載訂單',
      snackbarProps: {
        color: 'red-lighten-1'
      }
    })
  }
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + item.p_id.price * item.quantity, 0)
}

const cancelOrder = (orderId) => {
  orderIdToCancel.value = orderId
  confirmDialog.value.open = true
}

const closeConfirmDialog = () => {
  confirmDialog.value.open = false
}

const confirmCancelOrder = async () => {
  try {
    await apiAuth.delete(`/order/${orderIdToCancel.value}`)
    orders.value = orders.value.filter(order => order._id !== orderIdToCancel.value)
    createSnackbar({
      text: '訂單已取消',
      snackbarProps: {
        color: 'teal-darken-1'
      }
    })
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '無法取消訂單',
      snackbarProps: {
        color: 'red-lighten-1'
      }
    })
  } finally {
    closeConfirmDialog()
  }
}

onMounted(() => {
  loadOrders()
})

definePage({
  meta: {
    title: '訂單管理 | VPT',
    login: true,
    admin: false
  }
})
</script>

<style lang="scss" scoped>
@import '/src/styles/settings.scss';
.opacity-90 {
  opacity: 0.9;
}

.order-data-title {
  font-size: 14px;
  font-weight: 500;
}
.order-data-text {
  font-size: 12px;
}

.data-img {
  min-width: 72px;
  width: 80px;
}

.product-text {
  font-size: 11px;
  font-weight: 500;
}

.per-total {
  font-size: 11px;
  font-weight: 500;
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px;
}

.total-price {
  font-size: 12px;
  font-weight: 500;
  .total-price-tag {
    font-size: 12px;
    font-weight: 500;
    color: #EF6C00;
  }
}

@include sm {
  .order-data-title {
    font-size: 15px;
    height: 50px;
  }
  .order-data-text {
    font-size: 13px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: member
</route>
