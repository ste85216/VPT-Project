<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">
          球場資訊管理
        </h2>
      </v-col>
      <v-col
        cols="12"
        class="d-flex pa-0 ps-4 pe-4 mt-5"
      >
        <v-btn
          class="custom-btn"
          @click="openDialog(null)"
        >
          新增球場資訊
        </v-btn>
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
        <v-data-table-server
          v-model:items-per-page="tableItemsPerPage"
          v-model:sort-by="tableSortBy"
          v-model:page="tablePage"
          :items-per-page-options="[10, 20, 50]"
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
          <template #[`item.images`]="{ value }">
            <div class="images-container">
              <v-img
                v-for="(image, index) in value"
                :key="index"
                :src="image"
                class="me-2"
                height="50"
              />
            </div>
          </template>
          <template #[`item.action`]="{ item }">
            <v-btn
              icon="mdi-pencil"
              variant="plain"
              class="edit-btn"
              @click="openDialog(item)"
            />
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog.open"
      persistent
      width="500"
    >
      <v-form
        :disabled="isSubmitting"
        @submit.prevent="submit"
      >
        <v-card class="rounded-xl pa-4 pt-6">
          <v-card-title style="font-size: 18px;">
            {{ dialog.id ? '編輯球場資訊' : '新增球場資訊' }}
          </v-card-title>
          <v-card-text class="mt-3 pa-3">
            <v-text-field
              v-model="name.value.value"
              label="球場名稱"
              variant="outlined"
              density="compact"
              :error-messages="name.errorMessage.value"
            />
            <v-text-field
              v-model="time.value.value"
              label="營業時間"
              variant="outlined"
              density="compact"
              :error-messages="time.errorMessage.value"
            />
            <v-text-field
              v-model="address.value.value"
              label="地址"
              variant="outlined"
              density="compact"
              :error-messages="address.errorMessage.value"
            />
            <v-text-field
              v-model="phone.value.value"
              label="電話"
              variant="outlined"
              density="compact"
              :error-messages="phone.errorMessage.value"
            />
            <v-text-field
              v-model="mapLink.value.value"
              label="連結"
              variant="outlined"
              density="compact"
              :error-messages="mapLink.errorMessage.value"
            />
            <div
              v-if="existingImages.length > 0"
              class="mb-5 px-2 py-1"
              style="border: 1px solid #ababab;border-radius: 4px;"
            >
              <div style="font-size: 14px;font-weight: 400; color:#333;">
                現有圖片：
              </div>
              <v-row>
                <v-col
                  v-for="(image, index) in existingImages"
                  :key="index"
                  cols="3"
                  class="position-relative"
                >
                  <v-btn
                    icon
                    size="x-small"
                    elevation="8"
                    height="24"
                    width="24"
                    style="position: absolute; right: 0; top: 0;z-index: 1;"
                    @click="removeExistingImage(index)"
                  >
                    <v-icon
                      size="small"
                      color="error"
                    >
                      mdi-close
                    </v-icon>
                  </v-btn>
                  <v-img
                    :src="image.url"
                    aspect-ratio="1"
                    cover
                  >
                    <template #placeholder>
                      <v-row
                        class="fill-height ma-0"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        />
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
              </v-row>
            </div>
            <vue-file-agent
              ref="fileAgent"
              v-model="fileRecords"
              v-model:raw-model-value="rawFileRecords"
              accept="image/jpeg,image/png"
              multiple
              deletable
              max-size="1MB"
              help-text="選擇檔案或拖曳到這裡"
              :error-text="{ type: '檔案格式不支援', size: '檔案大小不能超過 1MB' }"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="dialog.id"
              color="red"
              :loading="isSubmitting"
              @click="openConfirmDialog"
            >
              刪除
            </v-btn>
            <v-spacer />
            <v-btn
              color="red"
              :loading="isSubmitting"
              @click="closeDialog"
            >
              取消
            </v-btn>
            <v-btn
              color="green"
              type="submit"
              :loading="isSubmitting"
            >
              送出
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-dialog
      v-model="confirmDialog.open"
      max-width="320"
    >
      <v-card>
        <v-card-title
          class="headline"
          style="font-size: 18px;"
        >
          確認刪除
        </v-card-title>
        <v-card-text class="mt-3 pa-4">
          您確定要刪除此球場資訊嗎？此操作無法撤銷。
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="closeConfirmDialog"
          >
            取消
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteVenue"
          >
            刪除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

definePage({
  meta: {
    title: '球場資訊管理 | VPT',
    login: true,
    admin: true
  }
})

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const fileAgent = ref(null)

const dialog = ref({
  open: false,
  id: ''
})

const confirmDialog = ref({
  open: false
})

const existingImages = ref([])

const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id
    name.value.value = item.name
    time.value.value = item.time
    address.value.value = item.address
    phone.value.value = item.phone
    mapLink.value.value = item.mapLink

    existingImages.value = item.images.map(url => ({ url, isExisting: true }))
    fileRecords.value = []
    rawFileRecords.value = []
  } else {
    dialog.value.id = ''
    fileRecords.value = []
    rawFileRecords.value = []
    existingImages.value = []
  }
  dialog.value.open = true
}

const closeDialog = () => {
  dialog.value.open = false
  resetForm()
  fileAgent.value.deleteFileRecord()
  fileRecords.value = []
  rawFileRecords.value = []
  existingImages.value = []
}

const openConfirmDialog = () => {
  confirmDialog.value.open = true
}

const closeConfirmDialog = () => {
  confirmDialog.value.open = false
}

const schema = yup.object({
  name: yup
    .string()
    .required('球場名稱必填'),
  time: yup
    .string()
    .required('營業時間必填'),
  address: yup
    .string()
    .required('球場地址必填'),
  phone: yup
    .string()
    .required('球場電話必填'),
  mapLink: yup
    .string()
    .required('球場連結必填')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    time: '',
    address: '',
    phone: '',
    mapLink: ''
  }
})

const name = useField('name')
const time = useField('time')
const address = useField('address')
const phone = useField('phone')
const mapLink = useField('mapLink')

const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  console.log('Submit button clicked') // 調試訊息
  isSubmitting.value = false
  if (isSubmitting.value) {
    console.log('Already submitting') // 調試訊息
    return
  }

  if (fileRecords.value.some(record => record.error)) return

  if (dialog.value.id.length === 0 && fileRecords.value.length < 1 && existingImages.value.length === 0) return

  isSubmitting.value = true

  try {
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('time', values.time)
    fd.append('address', values.address)
    fd.append('phone', values.phone)
    fd.append('mapLink', values.mapLink)

    const existingImageUrls = existingImages.value.map(image => image.url)
    fd.append('existingImages', JSON.stringify(existingImageUrls))

    fileRecords.value.forEach((record) => {
      if (record.file) {
        fd.append('newImages', record.file)
      }
    })

    for (const [key, value] of fd.entries()) {
      console.log(key, value) // 調試訊息
    }

    let response
    if (dialog.value.id === '') {
      console.log('Creating new venue') // 調試訊息

      response = await apiAuth.post('/venue', fd)
    } else {
      console.log('Updating existing venue') // 調試訊息

      response = await apiAuth.patch('/venue/' + dialog.value.id, fd)
    }
    console.log('API response:', response.data)

    createSnackbar({
      text: dialog.value.id === '' ? '新增成功' : '編輯成功',
      snackbarProps: {
        color: 'green'
      }
    })
    closeDialog()
    tableLoadItems(true)
  } catch (error) {
    console.log('Error:', error) // 調試訊息
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  } finally {
    isSubmitting.value = false
    fileRecords.value = []
    rawFileRecords.value = []
    existingImages.value = []
  }
})

const removeExistingImage = (index) => {
  existingImages.value.splice(index, 1)
}

const tableItemsPerPage = ref(10)
const tableSortBy = ref([{ key: 'createdAt', order: 'desc' }])
const tablePage = ref(1)
const tableItems = ref([])
const tableHeaders = [
  { title: '圖片', align: 'left', sortable: false, key: 'images', width: '180px' },
  { title: '名稱', align: 'left', sortable: true, key: 'name', width: '150px' },
  { title: '營業時間', align: 'left', sortable: true, key: 'time', width: '180px' },
  { title: '地址', align: 'left', sortable: true, key: 'address', width: '220px' },
  { title: '電話', align: 'left', sortable: true, key: 'phone', width: '200px' },
  { title: '操作', align: 'left', sortable: false, key: 'action', width: '120px' }
]
const tableLoading = ref(true)
const tableItemsLength = ref(0)
const tableSearch = ref('')
const tableLoadItems = async (reset) => {
  if (reset) tablePage.value = 1
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/venue/all', {
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
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
  tableLoading.value = false
}
tableLoadItems()

const deleteVenue = async () => {
  if (!dialog.value.id) return

  try {
    isSubmitting.value = true
    await apiAuth.delete(`/venue/${dialog.value.id}`)

    createSnackbar({
      text: '刪除成功',
      snackbarProps: {
        color: 'green'
      }
    })
    closeDialog()
    closeConfirmDialog()
    tableLoadItems(true)
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped>
@import '/src/styles/settings.scss';
.images-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>

<route lang="yaml">
meta:
  layout: admin
</route>
