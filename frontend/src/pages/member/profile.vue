<template>
  <h3 class="opacity-90 mb-4">
    個人資料管理
  </h3>
  <v-divider class="mb-8" />
  <v-form
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
        size="large"
        color="teal-darken-1"
        variant="outlined"
        type="submit"
        :loading="isSubmitting"
      >
        儲存
      </v-btn>
    </v-row>
  </v-form>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import validator from 'validator'

definePage({
  meta: {
    title: '個人資料管理 | VPT',
    login: true,
    admin: false
  }
})

const user = useUserStore()
const createSnackbar = useSnackbar()

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

<route lang="yaml">
  meta:
    layout: member
</route>
