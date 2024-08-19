<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">
          收件匣
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
          @click:append="tableLoadItems(true)"
          @keydown.enter="tableLoadItems(true)"
        />
      </v-col>
      <v-col cols="12">
        <v-data-table-server
          v-model:items-per-page="tableItemsPerPage"
          v-model:sort-by="tableSortBy"
          v-model:page="tablePage"
          :items-per-page-options="[10, 20 ,50]"
          :items="tableItems"
          :headers="tableHeaders"
          :loading="tableLoading"
          :items-length="tableItemsLength"
          :search="tableSearch"
          hover
          @update:items-per-page="tableLoadItems(false)"
          @update:sort-by="tableLoadItems(false)"
          @update:page="tableLoadItems(false)"
        >
          <template #top />
          <template #[`item.status`]="{ item }">
            <v-chip
              :color="getStatusColor(item.status)"
              @click="openStatusDialog(item)"
            >
              {{ item.status }}
            </v-chip>
          </template>
          <template #[`item.content`]="{ item }">
            <v-btn
              class="view-btn"
              icon="mdi-eye"
              size="small"
              variant="plain"
              @click="openViewDialog(item)"
            />
          </template>
          <template #[`item.action`]="{ item }">
            <v-btn
              class="delete-btn"
              color="red-darken-1"
              icon="mdi-delete"
              size="small"
              variant="plain"
              @click="openDeleteDialog(item)"
            />
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog
    v-model="viewDialog.open"
    width="520"
  >
    <v-card class="rounded-xl py-4 px-8 pt-6">
      <v-card-title style="font-size: 18px;">
        查看完整信件
      </v-card-title>
      <v-card-text class="mt-3 pa-0">
        <v-list>
          <v-list-item>
            <v-list-item-title class="card-title">
              姓名
            </v-list-item-title>
            <v-list-item-text class="card-text">
              {{ viewDialog.item?.name }}
            </v-list-item-text>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="card-title">
              信箱
            </v-list-item-title>
            <v-list-item-text class="card-text">
              {{ viewDialog.item?.email }}
            </v-list-item-text>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="card-title">
              主旨
            </v-list-item-title>
            <v-list-item-text class="card-text">
              {{ viewDialog.item?.subject }}
            </v-list-item-text>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="card-title">
              內容
            </v-list-item-title>
            <v-list-item-text class="card-text">
              {{ viewDialog.item?.content }}
            </v-list-item-text>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          variant="outlined"
          @click="closeViewDialog"
        >
          關閉
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="statusDialog.open"
    width="400"
  >
    <v-card class="rounded-xl pa-4 pt-6">
      <v-card-title style="font-size: 16px;">
        更新狀態
      </v-card-title>
      <v-card-text class="mt-3 pa-3">
        <v-radio-group v-model="statusDialog.status">
          <v-radio
            label="待處理"
            value="待處理"
            style="font-size: 14px;"
          />
          <v-radio
            label="處理中"
            value="處理中"
            style="font-size: 14px;"
          />
          <v-radio
            label="已完成"
            value="已完成"
            style="font-size: 14px;"
          />
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red-lighten-1"
          size="small"
          variant="outlined"
          @click="closeStatusDialog"
        >
          取消
        </v-btn>
        <v-btn
          color="teal-darken-1"
          size="small"
          variant="outlined"
          :loading="isSubmitting"
          @click="updateStatus"
        >
          更新
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="deleteDialog.open"
    width="400"
  >
    <v-card class="rounded-xl pa-4 pt-6">
      <v-card-title style="font-size: 16px;">
        確認刪除
      </v-card-title>
      <v-card-text
        class="mt-3 pa-4"
        style="font-size: 14px;"
      >
        您確定要刪除此信件嗎？此操作無法撤銷。
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="grey"
          size="small"
          variant="outlined"
          @click="closeDeleteDialog"
        >
          取消
        </v-btn>
        <v-btn
          color="error"
          size="small"
          variant="outlined"
          :loading="isDeleting"
          @click="deleteContact"
        >
          刪除
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '收件匣 | VPT',
    login: true,
    admin: true
  }
})

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const viewDialog = ref({
  open: false,
  item: null
})

const statusDialog = ref({
  open: false,
  item: null,
  status: ''
})

const openViewDialog = (item) => {
  viewDialog.value.item = item
  viewDialog.value.open = true
}

const closeViewDialog = () => {
  viewDialog.value.open = false
  viewDialog.value.item = null
}

const openStatusDialog = (item) => {
  statusDialog.value.item = item
  statusDialog.value.status = item.status
  statusDialog.value.open = true
}

const closeStatusDialog = () => {
  statusDialog.value.open = false
  statusDialog.value.item = null
  statusDialog.value.status = ''
}

const deleteDialog = ref({
  open: false,
  item: null
})

const openDeleteDialog = (item) => {
  deleteDialog.value.item = item
  deleteDialog.value.open = true
}

const closeDeleteDialog = () => {
  deleteDialog.value.open = false
  deleteDialog.value.item = null
}

const isDeleting = ref(false)

const deleteContact = async () => {
  if (!deleteDialog.value.item) return

  try {
    isDeleting.value = true
    await apiAuth.delete(`/contact/${deleteDialog.value.item._id}`)

    createSnackbar({
      text: '聯絡表單已成功刪除',
      snackbarProps: {
        color: 'success'
      }
    })
    closeDeleteDialog()
    tableLoadItems(true)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '刪除失敗',
      snackbarProps: {
        color: 'error'
      }
    })
  } finally {
    isDeleting.value = false
  }
}

const tableItemsPerPage = ref(10)
const tableSortBy = ref([
  { key: 'createdAt', order: 'desc' }
])
const tablePage = ref(1)
const tableItems = ref([])
const tableHeaders = [
  { title: '姓名', align: 'left', sortable: true, key: 'name', width: '110' },
  { title: '信箱', align: 'left', sortable: true, key: 'email', width: '170' },
  { title: '主旨', align: 'left', sortable: true, key: 'subject', width: '170' },
  { title: '內容', align: 'left', sortable: false, key: 'content', width: '150' },
  { title: '狀態', align: 'left', sortable: true, key: 'status', width: '150' },
  { title: '操作', align: 'center', sortable: false, key: 'action', width: '100' }
]

const tableLoading = ref(true)
const tableItemsLength = ref(0)
const tableSearch = ref('')

const tableLoadItems = async (reset) => {
  if (reset) tablePage.value = 1
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/contact', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order || 'desc',
        search: tableSearch.value
      }
    })
    tableItems.value.splice(0, tableItems.value.length, ...data.result.data)
    tableItemsLength.value = data.result.total
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red-lighten-1'
      }
    })
  }
  tableLoading.value = false
}

const isSubmitting = ref(false)

const updateStatus = async () => {
  if (!statusDialog.value.item) return

  try {
    isSubmitting.value = true
    const { data } = await apiAuth.patch(`/contact/${statusDialog.value.item._id}/status`, {
      status: statusDialog.value.status
    })

    const index = tableItems.value.findIndex(item => item._id === statusDialog.value.item._id)
    if (index !== -1) {
      tableItems.value[index].status = data.result.status
    }

    createSnackbar({
      text: '狀態更新成功',
      snackbarProps: {
        color: 'teal-darken-1'
      }
    })
    closeStatusDialog()
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red-lighten-1'
      }
    })
  } finally {
    isSubmitting.value = false
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case '待處理':
      return 'warning'
    case '處理中':
      return 'info'
    case '已完成':
      return 'success'
    default:
      return 'grey'
  }
}

tableLoadItems()
</script>

<style lang="scss" scoped>
  @import '/src/styles/settings.scss';
  .view-btn {
    color: #546E7A;
    padding: 0;
    width: 30px;
  }
  .card-title {
    font-size: 15px;
    color: #455A64;
  }
  .card-text {
    font-size: 14px;
    font-weight: 400;
    color: #333;
  }
</style>

<route lang="yaml">
meta:
  layout: admin
</route>
