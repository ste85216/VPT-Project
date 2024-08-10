<template>
  <h3 class="opacity-90 mb-4">
    訂單管理
  </h3>
  <v-divider />
  <v-expansion-panels
    class="mt-4"
    multiple
  >
    <v-expansion-panel
      v-for="order in orders"
      :key="order._id"
      class="rounded-lg py-4"
    >
      <v-expansion-panel-title class="text-center">
        <v-row>
          <v-col cols="2">
            <v-img
              :src="order.cart[0].p_id.images[0]"
              height="80"
            />
          </v-col>
          <v-col>
            <v-row>
              <v-col cols="4">
                訂單編號
              </v-col>
              <v-col cols="3">
                訂單日期
              </v-col>
              <v-col cols="2">
                訂單總額
              </v-col>
              <v-col cols="3">
                訂單備註
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col cols="4">
                {{ order._id }}
              </v-col>
              <v-col cols="3">
                {{ formatDate(order.createdAt) }}
              </v-col>
              <v-col cols="2">
                ${{ calculateTotal(order.cart) }}
              </v-col>
              <v-col cols="3">
                {{ order.note || '無' }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-divider />

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
          <v-list-item class="d-flex justify-end">
            <v-btn
              elevation="0"
              class="opacity-80 cancel-btn"
              @click="cancelOrder(order._id)"
            >
              取消訂單
            </v-btn>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <ConfirmDeleteDialog
    v-model="confirmDialog.open"
    title="確認要取消此訂單嗎？"
    message="此操作不可恢復。"
    confirm-text="確認"
    cancel-text="取消"
    confirm-color="error"
    cancel-color="grey"
    @confirm="confirmCancelOrder"
    @cancel="closeConfirmDialog"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { definePage } from 'vue-router/auto'
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog.vue'

definePage({
  meta: {
    title: '訂單管理 | VPT',
    login: true,
    admin: false
  }
})

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

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
        color: 'red'
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
        color: 'green'
      }
    })
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '無法取消訂單',
      snackbarProps: {
        color: 'red'
      }
    })
  } finally {
    closeConfirmDialog()
  }
}

onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
.opacity-90 {
  opacity: 0.9;
}
.cancel-btn {
  border: 1px solid #d9534f50;
  color: #d9534f;
}
</style>

<route lang="yaml">
  meta:
    layout: member
</route>
