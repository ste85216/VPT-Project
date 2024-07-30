<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">
          會員管理
        </h2>
      </v-col>
      <v-col cols="12">
        <v-btn
          class="custom-btn"
          @click="openDialog(null)"
        >
          新增會員
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-data-table-server
          v-model:items-per-page="tableItemsPerPage"
          v-model:sort-by="tableSortBy"
          v-model:page="tablePage"
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
          <template #top>
            <v-text-field
              v-model="tableSearch"
              label="搜尋"
              append-icon="mdi-magnify"
              @click-append="tableLoadItems(true)"
              @keydown.enter="tableLoadItems(true)"
            />
          </template>
          <template #[`item.image`]="{ value }">
            <v-img
              :src="value"
              height="60px"
            />
          </template>
          <template #[`item.sell`]="{ value }">
            <v-icon
              v-if="value"
              icon="mdi-check"
            />
          </template>
          <template #[`item.action`]="{ item }">
            <v-btn
              class="edit-btn"
              icon="mdi-pencil"
              variant="text"
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
    width="600"
  >
    <v-form
      :disabled="isSubmitting"
      @submit.prevent="submit"
    >
      <v-card class="rounded-xl">
        <v-card-title>{{ dialog.id ? '會員資料編輯' : '新增會員' }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
            label="帳號"
            variant="outlined"
            density="compact"
            min-length="4"
            maxlength="20"
            clearable
          />
          <v-text-field
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
            class="mt-2"
            label="姓名"
            type="text"
            variant="outlined"
            density="compact"
            min-length="4"
            maxlength="20"
            clearable
          />
          <v-text-field
            v-model="nickname.value.value"
            :error-messages="nickname.errorMessage.value"
            class="mt-2"
            label="暱稱"
            type="text"
            variant="outlined"
            density="compact"
            clearable
          />
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            class="mt-2"
            label="email"
            type="email"
            variant="outlined"
            density="compact"
            min-length="4"
            maxlength="20"
            clearable
          />
          <v-text-field
            v-model="phone.value.value"
            :error-messages="phone.errorMessage.value"
            class="mt-2"
            label="手機號碼"
            type="text"
            variant="outlined"
            density="compact"
            min-length="10"
            maxlength="10"
            clearable
          />
          <v-text-field
            v-model="birthday.value.value"
            :error-messages="birthday.errorMessage.value"
            class="mt-2"
            label="生日"
            type="date"
            variant="outlined"
            density="compact"
            min-length="4"
            maxlength="20"
            clearable
          />
          <v-text-field
            v-if="!dialog.id"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            class="mt-2"
            label="密碼"
            variant="outlined"
            density="compact"
            min-length="4"
            maxlength="20"
            clearable
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
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
    max-width="240"
  >
    <v-card>
      <v-card-title class="headline">
        確認刪除
      </v-card-title>
      <v-card-text>您確定要刪除此會員嗎？此操作無法撤銷。</v-card-text>
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
import validator from 'validator'
import { definePage } from 'vue-router/auto'
import { ref } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

definePage({
  meta: {
    title: '商品管理 | VPT',
    login: true,
    admin: true
  }
})

const showPassword = ref(false)

const { apiAuth } = useApi()
const { api } = useApi()
const createSnackbar = useSnackbar()

const dialog = ref({
  // 編輯對話框的狀態
  open: false,
  // 紀錄編輯中的 id，沒有就是新增，有就是編輯
  id: ''
})

const confirmDialog = ref({
  open: false
})

const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id
    account.value.value = item.account
    name.value.value = item.name
    nickname.value.value = item.nickname
    email.value.value = item.email
    phone.value.value = item.phone
    birthday.value.value = formatDate(item.birthday)
    password.value.value = item.password
  } else {
    dialog.value.id = ''
  }
  dialog.value.open = true
}

const formatDate = (datestring) => {
  const date = new Date(datestring)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const closeDialog = () => {
  dialog.value.open = false
  resetForm()
}

const openConfirmDialog = () => {
  confirmDialog.value.open = true
}

const closeConfirmDialog = () => {
  confirmDialog.value.open = false
}

const schema = yup.object({
  account: yup
    .string()
    .required('請輸入帳號')
    .min(4, '帳號至少需輸入8個字')
    .max(20, '帳號長度不得超過20個字')
    .test(
      'isAlphanumeric', '帳號只能輸入英數字',
      (value) => {
        return validator.isAlphanumeric(value)
      }
    ),
  password: yup
    .string()
    .required('請輸入密碼')
    .min(8, '密碼至少需輸入8個字'),
  name: yup
    .string()
    .required('請輸入姓名'),
  nickname: yup
    .string()
    .required('請輸入暱稱'),
  email: yup
    .string()
    .required('請輸入信箱')
    .test(
      'isEmail', '請輸入正確的信箱格式',
      (value) => {
        return validator.isEmail(value)
      }
    ),
  phone: yup
    .string()
    .required('請輸入手機號碼')
    .min(10, '請輸入10碼手機號碼')
    .test(
      'isMobilePhone', '請輸入正確的手機號碼格式',
      (value) => {
        return validator.isMobilePhone(value)
      }
    ),
  birthday: yup
    .string()
    .required('請輸入生日')
    .test(
      'isDate', '請輸入正確的日期格式',
      (value) => {
        return validator.isDate(value)
      }
    )
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    account: '',
    name: '',
    nickname: '',
    email: '',
    phone: '',
    birthday: '',
    password: ''
  }
})
const account = useField('account')
const password = useField('password')
const name = useField('name')
const nickname = useField('nickname')
const email = useField('email')
const phone = useField('phone')
const birthday = useField('birthday')

const submit = handleSubmit(async (values) => {
  try {
    const payload = {
      account: values.account,
      password: values.password,
      name: values.name,
      nickname: values.nickname,
      email: values.email,
      phone: values.phone,
      birthday: new Date(values.birthday) // 確保日期格式正確
    }
    if (dialog.value.id === '') {
      await api.post('/user', payload)
    } else {
      await apiAuth.patch('/user/' + dialog.value.id, payload)
    }

    console.log(values.birthday)

    createSnackbar({
      text: dialog.value.id === '' ? '新增成功' : '編輯成功',
      snackbarProps: {
        color: 'green'
      }
    })
    closeDialog()
    tableLoadItems(true)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})

const tableItemsPerPage = ref(10)
const tableSortBy = ref([
  { key: 'createdAt', order: 'desc' }
])
const tablePage = ref(1)
const tableItems = ref([])
const tableHeaders = [
  { title: '帳號', align: 'center', sortable: false, key: 'account' },
  { title: '姓名', align: 'center', sortable: true, key: 'name' },
  { title: '暱稱', align: 'center', sortable: true, key: 'nickname' },
  { title: 'email', align: 'center', sortable: true, key: 'email' },
  { title: '手機', align: 'center', sortable: true, key: 'phone' },
  { title: '操作', align: 'center', sortable: false, key: 'action' }
]
const tableLoading = ref(true)
const tableItemsLength = ref(0)
const tableSearch = ref('')
const tableLoadItems = async (reset) => {
  if (reset) tablePage.value = 1
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/user/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order || 'desc',
        search: tableSearch.value
      }
    })
    const filteredData = data.result.data.filter(user => user.role !== 1)
    tableItems.value.splice(0, tableItems.value.length, ...filteredData)
    tableItemsLength.value = filteredData.length
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
tableLoadItems()

const deleteProduct = async () => {
  if (!dialog.value.id) return

  try {
    isSubmitting.value = true
    await apiAuth.delete(`/user/${dialog.value.id}`)

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

<style lang="scss">
  @import '/src/styles/settings.scss';
  h2 {
    color: #333;
    letter-spacing: 4px;
  }
  .edit-btn {
    color: $primary-color;
  }
  .custom-btn {
    background: $third-color;
    color: white;
  }
</style>

<route lang="yaml">
meta:
  layout: admin
</route>
