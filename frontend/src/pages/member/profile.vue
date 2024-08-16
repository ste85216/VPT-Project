<template>
  <h3 class="opacity-90 mb-4">
    個人資料管理
  </h3>
  <v-divider class="mb-8" />
  <v-form
    v-if="mdAndUp"
    :disabled="isSubmitting"
    @submit.prevent="submitProfile"
  >
    <v-row
      style="font-size: 14px;"
      class="text-blue-grey-darken-2"
    >
      <v-col
        class="px-4 py-0"
        cols="4"
      >
        姓名 <span style="color: #d9534f;">*</span> :
      </v-col>
      <v-col class="px-4 py-0">
        暱稱 :
      </v-col>
      <v-col class="px-4 py-0">
        生日 :
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col class="pt-1">
        <v-text-field
          v-model="name.value.value"
          :error-messages="name.errorMessage.value"
          density="compact"
          variant="outlined"
          clearable
        />
      </v-col>
      <v-col class="pt-1">
        <v-text-field
          v-model="nickname.value.value"
          density="compact"
          variant="outlined"
          hide-details
          clearable
        />
      </v-col>
      <v-col class="pt-1">
        <v-text-field
          v-model="birthday.value.value"
          :error-messages="birthday.errorMessage.value"
          type="date"
          density="compact"
          variant="outlined"
          hide-details
          clearable
        />
      </v-col>
    </v-row>
    <v-row
      class="mt-4 text-blue-grey-darken-2"
      style="font-size: 14px;"
    >
      <v-col
        class="px-4 py-0"
        cols="4"
      >
        手機號碼 <span style="color: #d9534f;">*</span> :
      </v-col>
      <v-col
        class="px-4 py-0"
        cols="4"
      >
        Email <span style="color: #d9534f;">*</span> :
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="phone.value.value"
          :error-messages="phone.errorMessage.value"
          density="compact"
          variant="outlined"
          maxlength="10"
          clearable
        />
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          density="compact"
          variant="outlined"
          clearable
        />
      </v-col>
    </v-row>
    <v-row
      class="mt-4 text-blue-grey-darken-2"
      style="font-size: 14px;"
    >
      <v-col class="px-4 py-0">
        地址 :
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-text-field
          v-model="address.value.value"
          :error-messages="address.errorMessage.value"
          density="compact"
          variant="outlined"
          hide-details
          clearable
        />
      </v-col>
    </v-row>
    <v-row class="px-4 py-10">
      <v-spacer />
      <v-btn
        elevation="0"
        color="teal-darken-1"
        variant="outlined"
        type="submit"
        :loading="isSubmitting"
      >
        儲存
      </v-btn>
    </v-row>
  </v-form>
  <v-form
    v-if="!mdAndUp"
    id="profile-form-sm"
    :disabled="isSubmitting"
    @submit.prevent="submitProfile"
  >
    <v-row
      style="font-size: 14px;"
      class="text-blue-grey-darken-2"
    >
      <v-col
        cols="12"
      >
        <v-row
          class="d-flex justify-center align-center"
        >
          <v-col
            cols="4"
            class="position-relative"
          >
            <v-img
              :src="user.avatar"
              class="avatar"
              :aspect-ratio="1"
              cover
            >
              <template #placeholder>
                <v-row
                  class="fill-height ma-0"
                  justify="center"
                  align="center"
                >
                  <v-progress-circular indeterminate />
                </v-row>
              </template>
            </v-img>
            <v-tooltip
              :text="'檔案最大不超過1MB'"
              location="bottom"
              :open-delay="50"
              :close-delay="50"
            >
              <template #activator="{ props: tooltipProps }">
                <v-icon
                  v-bind="tooltipProps"
                  :color="isHovering ? 'primary' : undefined"
                  class="camera-icon opacity-70"
                  @click="triggerFileInput"
                  @mouseenter="isHovering = true"
                  @mouseleave="isHovering = false"
                >
                  mdi-camera
                </v-icon>
              </template>
            </v-tooltip>
            <input
              ref="fileInput"
              type="file"
              class="d-none"
              accept="image/*"
              @change="handleFileChange"
            >
          </v-col>
          <v-col
            cols="12"
            class="text-center text-teal-darken-3 userId"
          >
            {{ user.userId }}
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        class="px-4 py-0 mt-4"
      >
        <v-row>
          <v-col cols="4">
            姓名 <span style="color: #d9534f;">*</span> :
          </v-col>
          <v-col>
            <v-text-field
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
              density="compact"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        class="px-4 py-0"
      >
        <v-row>
          <v-col cols="4">
            暱稱 :
          </v-col>
          <v-col>
            <v-text-field
              v-model="nickname.value.value"
              density="compact"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        class="px-4 py-0"
        cols="12"
      >
        <v-row>
          <v-col
            cols="4"
          >
            生日 :
          </v-col>
          <v-col>
            <v-text-field
              v-model="birthday.value.value"
              :error-messages="birthday.errorMessage.value"
              type="date"
              density="compact"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        class="px-4 py-0"
        cols="12"
      >
        <v-row>
          <v-col
            cols="4"
          >
            手機號碼 <span style="color: #d9534f;">*</span> :
          </v-col>
          <v-col>
            <v-text-field
              v-model="phone.value.value"
              :error-messages="phone.errorMessage.value"
              density="compact"
              variant="outlined"
              maxlength="10"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        class="px-4 py-0"
        cols="12"
      >
        <v-row>
          <v-col
            cols="4"
          >
            Email <span style="color: #d9534f;">*</span> :
          </v-col>
          <v-col>
            <v-text-field
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              density="compact"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        class="px-4 py-0"
        cols="12"
      >
        <v-row>
          <v-col
            cols="4"
          >
            地址 :
          </v-col>
          <v-col>
            <v-text-field
              v-model="address.value.value"
              :error-messages="address.errorMessage.value"
              density="compact"
              variant="outlined"
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="px-4 py-10">
      <v-spacer />
      <v-btn
        elevation="0"
        color="teal-darken-1"
        variant="outlined"
        type="submit"
        size="small"
        :loading="isSubmitting"
      >
        儲存
      </v-btn>
    </v-row>
  </v-form>

  <!-- 新增上傳對話框 -->
  <v-dialog
    v-model="isUploading"
    persistent
    width="auto"
  >
    <v-card class="rounded-lg">
      <v-card-text class="pa-12">
        頭像上傳中...
        <v-progress-circular
          indeterminate
          color="primary"
          class="ml-3"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import validator from 'validator'
import { useDisplay } from 'vuetify'
import { useApi } from '@/composables/axios'

const { mdAndUp } = useDisplay()
const { apiAuth } = useApi()
definePage({
  meta: {
    title: '個人資料管理 | VPT',
    login: true,
    admin: false
  }
})

const user = useUserStore()
const createSnackbar = useSnackbar()

// 新增頭像上傳相關的響應式變數
const fileInput = ref(null)
const isUploading = ref(false)
const isHovering = ref(false)

// 新增頭像上傳相關的方法
const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 1024 * 1024) {
      createSnackbar({
        text: '檔案大小不能超過1MB',
        snackbarProps: { color: 'red-lighten-1' }
      })
      return
    }
    uploadAvatar(file)
  }
}

const uploadAvatar = async (file) => {
  if (!file) return

  isUploading.value = true
  try {
    const formData = new FormData()
    formData.append('avatar', file)

    const { data } = await apiAuth.patch('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    createSnackbar({
      text: data.message,
      snackbarProps: { color: 'teal-darken-1' }
    })

    await user.profile() // 更新用戶資料，確保新的頭像 URL 被加載

    console.log(data)
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || '上傳失敗',
      snackbarProps: { color: 'red-darken-1' }
    })
  } finally {
    isUploading.value = false // 確保在成功或失敗後都關閉對話框
  }
}

const formatDate = (datestring) => {
  const date = new Date(datestring)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const toISOString = (dateString) => {
  const date = new Date(dateString)
  return date.toISOString()
}

const schema = yup.object({
  name: yup
    .string()
    .required('請輸入姓名'),
  nickname: yup
    .string(),
  birthday: yup
    .string()
    .required('請輸入生日')
    .test(
      'isDate', '請輸入正確的日期格式',
      (value) => {
        return validator.isDate(value)
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
  email: yup
    .string()
    .required('請輸入信箱')
    .test(
      'isEmail', '請輸入正確的信箱格式',
      (value) => {
        return validator.isEmail(value)
      }
    ),
  address: yup
    .string()
})

const { handleSubmit, setValues, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    nickname: '',
    birthday: '',
    phone: '',
    email: '',
    address: ''
  }
})

const name = useField('name')
const nickname = useField('nickname')
const birthday = useField('birthday')
const phone = useField('phone')
const email = useField('email')
const address = useField('address')

const loadProfile = async () => {
  await user.profile()
  setValues({
    name: user.name,
    nickname: user.nickname,
    birthday: formatDate(user.birthday),
    phone: user.phone,
    email: user.email,
    address: user.address
  })
}

onMounted(loadProfile)

const saveProfile = async (values) => {
  try {
    const updatedProfile = await user.updateProfile({
      ...values,
      birthday: toISOString(values.birthday)
    })
    setValues({
      ...updatedProfile,
      birthday: formatDate(updatedProfile.birthday)
    })
    createSnackbar({
      text: '資料更新成功',
      snackbarProps: { color: 'teal-darken-1' }
    })
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: { color: 'red-lighten-1' }
    })
  }
}

const submitProfile = handleSubmit(saveProfile)
</script>

<style lang="scss" scoped>
  @import '/src/styles/settings.scss';
  #profile-form-sm {
    :deep(.v-field__input) {
    min-height: 28px !important;
    padding: 0 4px !important;
    font-size: 14px;
    }
    .avatar {
    border: 1px solid #039199;
    border-radius: 50%;
    position: relative;
    max-width: 200px;
    max-height: 200px;
    }

    .camera-icon {
      position: absolute;
      cursor: pointer;
      background-color: white;
      border-radius: 50%;
      padding: 5px;
      right: 4px;
      bottom: 4px;
    }

    .userId {
      font-size: 14px;
      font-weight: 400;
    }
  }

</style>

<route lang="yaml">
  meta:
    layout: member
</route>
