<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">
          訂單管理
        </h2>
      </v-col>
      <v-col
        cols="12"
        class="d-flex pa-0 ps-4 pe-4 mt-5"
      >
        <v-spacer />
        <v-text-field
          v-model="tableSearch"
          label="搜尋"
          append-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          max-width="240"
          clearable
          @click-append="tableLoadItems(true)"
          @keydown.enter="tableLoadItems(true)"
        />
      </v-col>
      <v-col cols="12">
        <v-data-table
          v-model:expanded="expanded"
          v-model:items-per-page="tableItemsPerPage"
          v-model:sort-by="tableSortBy"
          v-model:page="tablePage"
          item-value="_id"
          :items-per-page-options="[5, 10, 20]"
          :items="tableItems"
          :headers="tableHeaders"
          :loading="tableLoading"
          :items-length="tableItemsLength"
          :search="tableSearch"
          show-expand
          hover
          @update:items-per-page="tableLoadItems(false)"
          @update:sort-by="tableLoadItems(false)"
          @update:page="tableLoadItems(false)"
        >
          <template #expanded-row="{ columns, item }">
            <tr>
              <td :colspan="columns.length">
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
                    v-for="cartItem in item.cart"
                    :key="cartItem.p_id._id"
                  >
                    <v-row
                      style="font-size: 14px;"
                      class="text-center"
                    >
                      <v-col cols="2">
                        <v-img
                          :src="cartItem.p_id.images[0]"
                          height="50"
                        />
                      </v-col>
                      <v-col
                        cols="2"
                        class="align-self-center"
                      >
                        {{ cartItem.p_id.name }}
                      </v-col>
                      <v-col
                        cols="2"
                        class="align-self-center"
                      >
                        {{ cartItem.colors }} / {{ cartItem.sizes }}
                      </v-col>
                      <v-col
                        cols="2"
                        class="align-self-center"
                      >
                        ${{ cartItem.p_id.price }}
                      </v-col>
                      <v-col
                        cols="2"
                        class="align-self-center"
                      >
                        {{ cartItem.quantity }}
                      </v-col>
                      <v-col
                        cols="2"
                        class="align-self-center"
                      >
                        ${{ cartItem.p_id.price * cartItem.quantity }}
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '訂單管理 | VPT',
    login: true,
    admin: true
  }
})

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const tableItemsPerPage = ref(5)
const tableSortBy = ref([{ key: 'createdAt', order: 'desc' }])
const tablePage = ref(1)
const tableItems = ref([])
const tableHeaders = [
  { title: '訂單編號', align: 'left', sortable: true, key: '_id' },
  { title: '會員ID', align: 'left', sortable: true, key: 'user.account' },
  { title: '訂單日期', align: 'left', sortable: true, key: 'createdAt' },
  { title: '訂單總額', align: 'left', sortable: false, key: 'total' },
  { title: '訂單備註', align: 'left', sortable: false, key: 'remarks' },
  { title: '', key: 'data-table-expand' }
]
const tableLoading = ref(true)
const tableItemsLength = ref(0)
const tableSearch = ref('')
const expanded = ref([])

const tableLoadItems = async (reset) => {
  if (reset) tablePage.value = 1
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/order/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order || 'desc',
        search: tableSearch.value
      }
    })
    tableItems.value.splice(0, tableItems.value.length, ...data.result)
    tableItemsLength.value = data.result.length

    tableItems.value.forEach(order => {
      order.total = order.cart.reduce((sum, item) => sum + item.p_id.price * item.quantity, 0)
      order.createdAt = formatDate(order.createdAt)
    })
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
  tableLoading.value = false
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

onMounted(() => {
  tableLoadItems()
})
</script>

<style scoped>
.opacity-90 {
  opacity: 0.9;
}
</style>

<route lang="yaml">
meta:
  layout: admin
</route>
