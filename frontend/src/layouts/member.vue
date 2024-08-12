<template>
  <v-container
    class="mt-10"
    style="max-width: 1220px;margin-bottom: 120px;"
  >
    <div class="d-flex justify-space-between ">
      <v-col
        id="profile"
        class="me-4 pa-0"
        cols="3"
      >
        <v-col>
          <v-card
            class="d-flex flex-column align-center profile-card pt-8 pb-4"
            elevation="0"
          >
            <v-img
              :src="user.avatar"
              class="avatar"
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
            <!-- 隱藏的文件輸入框 -->
            <input
              ref="fileInput"
              type="file"
              class="d-none"
              accept="image/*"
              @change="handleFileChange"
            >
            <v-card-title style="font-size: 18px;">
              {{ user.name }}
            </v-card-title>
            <v-card-subtitle>{{ user.userId }}</v-card-subtitle>
          </v-card>
        </v-col>
        <v-divider />
        <v-col class="pa-0">
          <v-list
            width="100%"
            class="mt-4 mb-6"
          >
            <v-list-item
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              :prepend-icon="item.icon"
              class="mb-4 opacity-90 ps-16"
              :ripple="false"
              :active="false"
              style="font-size: 14px;"
            >
              {{ item.text }}
            </v-list-item>
          </v-list>
        </v-col>
      </v-col>
      <v-col
        id="content"
        cols="9"
        class="pa-8"
      >
        <router-view />
      </v-col>
    </div>
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
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()
const fileInput = ref(null)
const isUploading = ref(false)
const isHovering = ref(false)

const navItems = [
  { to: '/member/profile', text: '個人資料管理', icon: ' mdi-account-cog' },
  { to: '/member/order', text: '訂單管理', icon: 'mdi-list-box' },
  { to: '/member/enrollment', text: '報名紀錄', icon: 'mdi-volleyball ' },
  { to: '/member/post', text: '刊登場次', icon: 'mdi-post' }
]

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 1024 * 1024) {
      createSnackbar({
        text: '檔案大小不能超過1MB',
        snackbarProps: { color: 'error' }
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
      snackbarProps: { color: 'success' }
    })

    await user.profile() // 更新用戶資料，確保新的頭像 URL 被加載

    console.log(data)
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || '上傳失敗',
      snackbarProps: { color: 'error' }
    })
  } finally {
    isUploading.value = false // 確保在成功或失敗後都關閉對話框
  }
}

onMounted(async () => {
  await user.profile()
})

</script>

<style lang="scss" scoped>
@import '/src/styles/settings.scss';
  #profile {
    // border: 1px solid #03919960;
    max-height: 569px;
    border-radius: 20px;
    box-shadow: 0 0 12px 0 rgba(0,0,0,0.1);
  }
  .profile-card {
    max-width: 300px;
    .avatar {
      width: 120px;
      height: 120px;
      border: 1px solid #039199;
      border-radius: 50%;
      position: relative;
    }
    .camera-icon {
    position: absolute;
    top:128px;
    right: 60px;
    cursor: pointer;
    background-color: white;
    border-radius: 50%;
    padding: 5px;
  }
  }
  #content {
    border-radius: 20px;
    box-shadow: 0 0 12px 0 rgba(0,0,0,0.1);
  }

</style>
