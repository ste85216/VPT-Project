<template>
  <h3 class="opacity-90 mb-4">
    個人資料管理
  </h3>
  <v-divider class="mb-8" />
  <v-row>
    <v-col class="px-4 py-0">
      姓名 :
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
        v-model="profile.name"
        density="compact"
        variant="outlined"
        hide-details
      />
    </v-col>
    <v-col class="pt-1">
      <v-text-field
        v-model="profile.nickname"
        density="compact"
        variant="outlined"
        hide-details
      />
    </v-col>
    <v-col class="pt-1">
      <v-text-field
        v-model="profile.birthday"
        type="date"
        density="compact"
        variant="outlined"
        hide-details
      />
    </v-col>
  </v-row>
  <v-row class="mt-4">
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
        v-model="profile.phone"
        density="compact"
        variant="outlined"
        hide-details
      />
    </v-col>
    <v-col cols="4">
      <v-text-field
        v-model="profile.email"
        density="compact"
        variant="outlined"
        hide-details
      />
    </v-col>
  </v-row>
  <v-row class="mt-4">
    <v-col class="px-4 py-0">
      地址 :
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="8">
      <v-text-field
        v-model="profile.address"
        density="compact"
        variant="outlined"
        hide-details
      />
    </v-col>
  </v-row>
  <v-row class="px-4 py-16">
    <v-btn
      size="large"
      elevation="0"
      style="color: #d9534f; border: 1px solid #d9534f30"
      @click="dialog.open = true"
    >
      修改密碼
    </v-btn>
    <v-spacer />
    <v-btn
      elevation="0"
      size="large"
      style="color: #039199; border: 1px solid #03919950"
      @click="saveProfile"
    >
      儲存
    </v-btn>
  </v-row>

  <v-dialog
    v-model="dialog.open"
    persistent
    max-width="440"
  >
    <v-form @submit.prevent="submitPassword">
      <v-card>
        <v-card-title>修改密碼</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="oldPassword"
            label="舊密碼"
            type="password"
            variant="outlined"
            density="compact"
          />
          <v-text-field
            v-model="newPassword"
            label="新密碼"
            type="password"
            variant="outlined"
            density="compact"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red"
            text
            @click="dialog.open = false"
          >
            取消
          </v-btn>
          <v-btn
            color="green"
            text
            type="submit"
          >
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'

definePage({
  meta: {
    title: '個人資料管理 | VPT',
    login: true,
    admin: false
  }
})

const user = useUserStore()
const createSnackbar = useSnackbar()

const profile = ref({
  name: '',
  nickname: '',
  birthday: '',
  phone: '',
  email: '',
  address: ''
})

const dialog = ref({ open: false })
const oldPassword = ref('')
const newPassword = ref('')

const formatDate = (datestring) => {
  const date = new Date(datestring)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

onMounted(async () => {
  await user.profile()
  profile.value.name = user.name
  profile.value.nickname = user.nickname
  profile.value.birthday = formatDate(user.birthday)
  profile.value.phone = user.phone
  profile.value.email = user.email
  profile.value.address = user.address
})

const saveProfile = async () => {
  try {
    const updatedProfile = await user.updateProfile(profile.value)
    // 確保本地的 profile 更新為最新值
    profile.value = {
      ...profile.value,
      ...updatedProfile
    }
    createSnackbar({
      text: '資料已更新',
      snackbarProps: { color: 'green' }
    })
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: { color: 'red' }
    })
  }
}

const submitPassword = async () => {
  try {
    await user.updatePassword(oldPassword.value, newPassword.value)
    createSnackbar({
      text: '密碼已更新，請重新登入',
      snackbarProps: { color: 'green' }
    })
    dialog.value.open = false
    user.logout() // 更新密碼後，強制用戶重新登入
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: { color: 'red' }
    })
  }
}

onMounted(async () => {
  await user.profile()
  console.log(user) // 添加這行以檢查user中的數據
  profile.value.name = user.name
  profile.value.nickname = user.nickname
  profile.value.birthday = formatDate(user.birthday)
  profile.value.phone = user.phone
  profile.value.email = user.email
  profile.value.address = user.address
})
</script>

<route lang="yaml">
  meta:
    layout: member
</route>
