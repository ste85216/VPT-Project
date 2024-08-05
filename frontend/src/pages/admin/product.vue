<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">
          商品管理
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
          新增商品
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
          <template #[`item.colors`]="{ value }">
            {{ value.join(', ') }}
          </template>
          <template #[`item.sizes`]="{ value }">
            {{ value.join(', ') }}
          </template>
          <template #[`item.images`]="{ value }">
            <div
              class="images-container"
              style="width: 200px;"
            >
              <v-img
                v-for="(image, index) in value"
                :key="index"
                :src="image"
                height="50"
                width="50"
                class="me-2"
              />
            </div>
          </template>
          <template #[`item.sell`]="{ value }">
            <v-icon
              v-if="value"
              icon="mdi-check"
            />
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
  </v-container>
  <v-dialog
    v-model="dialog.open"
    persistent
    width="500"
  >
    <v-form
      :disabled="isSubmitting"
      @submit.prevent="submit"
    >
      <v-card class="rounded-xl">
        <v-card-title style="font-size: 18px;">
          {{ dialog.id ? '編輯商品' : '新增商品' }}
        </v-card-title>
        <v-card-text class="mt-3 pa-3">
          <v-text-field
            v-model="name.value.value"
            label="名稱"
            variant="outlined"
            density="compact"
            :error-messages="name.errorMessage.value"
          />
          <v-combobox
            v-model="colors.value.value"
            label="顏色"
            :items="colorItems"
            variant="outlined"
            density="compact"
            multiple
            clearable
            :error-messages="colors.errorMessage.value"
          />
          <v-combobox
            v-model="sizes.value.value"
            label="尺寸"
            :items="sizeItems"
            variant="outlined"
            density="compact"
            clearable
            multiple
            :error-messages="sizes.errorMessage.value"
          />
          <v-text-field
            v-model="price.value.value"
            label="價格"
            type="number"
            variant="outlined"
            density="compact"
            min="0"
            :error-messages="price.errorMessage.value"
          />
          <v-select
            v-model="category.value.value"
            label="分類"
            :items="categories"
            variant="outlined"
            density="compact"
            :error-messages="category.errorMessage.value"
          />
          <v-checkbox
            v-model="sell.value.value"
            label="上架"
            :error-messages="sell.errorMessage.value"
          />
          <v-textarea
            v-model="description.value.value"
            label="說明"
            variant="outlined"
            density="compact"
            clearable
            no-resize
            rows="3"
            :error-messages="description.errorMessage.value"
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
        您確定要刪除此商品嗎？此操作無法撤銷。
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
          @click="deleteProduct"
        >
          刪除
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
    title: '商品管理 | VPT',
    login: true, // 需要登入才能訪問
    admin: true // 需要是管理員才能訪問
  }
})

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const fileAgent = ref(null)

const dialog = ref({
  // 編輯對話框的狀態
  open: false,
  // 紀錄編輯中的 id，沒有就是新增，有就是編輯
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
    price.value.value = item.price
    description.value.value = item.description
    category.value.value = item.category
    sell.value.value = item.sell
    colors.value.value = item.colors
    sizes.value.value = item.sizes

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
  console.log('Dialog opened with id:', dialog.value.id) // 調試訊息
}

const closeDialog = () => {
  dialog.value.open = false
  resetForm()
  fileAgent.value.deleteFileRecord()
  fileRecords.value = []
  rawFileRecords.value = []
  existingImages.value = [] // 新增：清空现有图片
  console.log('Dialog closed') // 調試訊息
}

const openConfirmDialog = () => {
  confirmDialog.value.open = true
}

const closeConfirmDialog = () => {
  confirmDialog.value.open = false
}

const colorItems = [
  '紅色',
  '藍色',
  '黃色',
  '綠色',
  '紫色',
  '橘色',
  '星空灰',
  '亮彩橘',
  '亮粉紅',
  '新款黑',
  '新款白',
  '顏色請備註在訂單'
]

const sizeItems = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  '2XL',
  '3XL',
  'F',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '尺寸請備註在訂單'
]

const categories = ['球衣', '球褲', '球襪', '球鞋', '排球', '護具', '其他']
const schema = yup.object({
  name: yup
    .string()
    .required('商品名稱必填'),
  price: yup
    .number()
    .typeError('商品價格格式錯誤')
    .required('商品價格必填')
    .min(0, '商品價格不能小於 0'),
  colors: yup
    .array()
    .of(yup.string()),
  sizes: yup
    .array()
    .of(yup.string()),
  description: yup
    .string()
    .required('商品說明必填'),
  category: yup
    .string()
    .required('商品分類必填')
    .test('isCategory', '商品分類錯誤', value => {
      return categories.includes(value)
    }),
  sell: yup
    .boolean()
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    price: 0,
    colors: [],
    sizes: [],
    description: '',
    category: '',
    sell: true
  }
})

const name = useField('name')
const price = useField('price')
const description = useField('description')
const category = useField('category')
const sell = useField('sell')
const colors = useField('colors')
const sizes = useField('sizes')

const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  console.log('Submit clicked') // 調試訊息

  // 重置 isSubmitting 為 false 以確保開始新的提交
  isSubmitting.value = false

  if (isSubmitting.value) {
    console.log('Already submitting') // 調試訊息
    return
  }

  // 檢查是否有文件上傳錯誤
  if (fileRecords.value.some(record => record.error)) {
    console.log('File records have errors') // 調試訊息
    return
  }

  // 檢查是否有需要提交的文件或現有圖片
  if (dialog.value.id.length === 0 && fileRecords.value.length < 1 && existingImages.value.length === 0) {
    console.log('No files to submit') // 調試訊息
    return
  }

  // 設置 isSubmitting 為 true
  isSubmitting.value = true
  console.log('Start submitting') // 調試訊息

  try {
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('price', values.price)
    fd.append('description', values.description)
    values.colors.forEach(color => fd.append('colors', color))
    values.sizes.forEach(size => fd.append('sizes', size))
    fd.append('category', values.category)
    fd.append('sell', values.sell)

    const existingImageUrls = existingImages.value.map(image => image.url)
    fd.append('existingImages', JSON.stringify(existingImageUrls))
    console.log('FormData before files:', ...fd.entries()) // 調試訊息

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
      console.log('Creating new product') // 調試訊息
      response = await apiAuth.post('/product', fd)
    } else {
      console.log('Updating existing product') // 調試訊息
      response = await apiAuth.patch('/product/' + dialog.value.id, fd)
    }
    console.log('API response:', response.data) // 調試訊息

    createSnackbar({
      text: dialog.value.id === '' ? '新增成功' : '編輯成功',
      snackbarProps: {
        color: 'green'
      }
    })
    closeDialog()
    tableLoadItems(true)
  } catch (error) {
    console.log('Error:', error)
    console.log('Error details:', error.response ? error.response.data : error.message) // 新增詳細錯誤訊息
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  } finally {
    console.log('Resetting isSubmitting') // 調試訊息
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
const tableSortBy = ref([
  { key: 'createdAt', order: 'desc' }
])
const tablePage = ref(1)
const tableItems = ref([])
const tableHeaders = [
  {
    title: '圖片',
    align: 'left',
    sortable: false,
    key: 'images',
    width: '200px',
    render: (value) => {
      const displayImages = value.slice(0, 3)
      return `
        <div class="images-container" style="width: 200px;">
          ${displayImages.map(image => `
            <img src="${image}" style="height: 50px; width: 50px; object-fit: cover; margin-right: 5px;" />
          `).join('')}
          ${value.length > 3 ? `<span>+${value.length - 3} 更多</span>` : ''}
        </div>
      `
    }
  },
  { title: '名稱', align: 'left', sortable: true, key: 'name' },
  { title: '顏色', align: 'left', sortable: true, key: 'colors' },
  { title: '尺寸', align: 'left', sortable: true, key: 'sizes' },
  { title: '價格', align: 'left', sortable: true, key: 'price' },
  { title: '分類', align: 'left', sortable: true, key: 'category' },
  { title: '上架', align: 'left', sortable: true, key: 'sell' },
  { title: '操作', align: 'left', sortable: false, key: 'action' }
]
const tableLoading = ref(true)
const tableItemsLength = ref(0)
const tableSearch = ref('')
const tableLoadItems = async (reset) => {
  if (reset) tablePage.value = 1
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/product/all', {
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
    console.log(data)
    console.log(data.result.total)
  } catch (error) {
    console.log('提交表單時出錯', error)
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

const deleteProduct = async () => {
  if (!dialog.value.id) return

  try {
    isSubmitting.value = true
    await apiAuth.delete(`/product/${dialog.value.id}`)

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
    console.log(error)
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
