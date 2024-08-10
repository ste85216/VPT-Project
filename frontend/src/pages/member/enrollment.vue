<template>
  <v-row class="mt-4">
    <v-col cols="12">
      <v-row>
        <v-col
          cols="12"
          sm="3"
        >
          <h3 class="opacity-90 mb-4">
            報名紀錄
          </h3>
        </v-col>
      </v-row>
    </v-col>
    <v-divider />
    <v-col cols="12">
      <v-row class="mb-4">
        <v-col cols="12">
          <v-row class="px-4 text-center">
            <v-col cols="2">
              球場
            </v-col>
            <v-col cols="2">
              日期
            </v-col>
            <v-col cols="1">
              時段
            </v-col>
            <v-col cols="1">
              網高
            </v-col>
            <v-col cols="1">
              程度
            </v-col>
            <v-col cols="2">
              報名人數
            </v-col>
            <v-col cols="1">
              費用
            </v-col>
            <v-col cols="1">
              備註
            </v-col>
            <v-col cols="1">
              操作
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-sheet
        v-if="enrollments.length === 0"
        height="100%"
        align="center"
        class="opacity-80"
      >
        目前您沒有報名任何場次
      </v-sheet>

      <!-- 場次卡片列表 -->
      <v-card
        v-for="(enrollment, index) in enrollments"
        :key="enrollment._id"
        elevation="0"
        class="pa-4 py-8 post-card"
        :style="{ backgroundColor: index % 2 === 0 ? '#ECEFF1' : '#ffffff' }"
      >
        <v-row>
          <v-col cols="12">
            <v-row class="align-center text-center text-subtitle-2">
              <v-col cols="2">
                {{ getVenueName(enrollment.s_id) }}
              </v-col>
              <v-col cols="2">
                {{ formatDate(enrollment.s_id?.date) }}
              </v-col>
              <v-col cols="1">
                {{ enrollment.s_id?.time || '未知時段' }}
              </v-col>
              <v-col cols="1">
                {{ enrollment.s_id?.netheight || '未知網高' }}
              </v-col>
              <v-col cols="1">
                {{ enrollment.s_id?.level || '未知程度' }}
              </v-col>
              <v-col cols="2">
                {{ formatEnrollmentCount(enrollment) }}
              </v-col>
              <v-col cols="1">
                ${{ enrollment.s_id?.fee || '未知' }}/人
              </v-col>
              <v-col cols="1">
                {{ enrollment.s_id?.note || '無' }}
              </v-col>
              <v-col cols="1">
                <v-btn
                  size="small"
                  color="teal-darken-1"
                  variant="outlined"
                  @click="openEditDialog(enrollment)"
                >
                  <v-icon icon="mdi-pen" />
                </v-btn>
                <v-btn
                  size="small"
                  color="red-darken-3"
                  variant="outlined"
                  class="mt-2"
                  @click="openDeleteDialog(enrollment._id)"
                >
                  <v-icon icon="mdi-delete" />
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <!-- 編輯對話框 -->
  <v-dialog
    v-model="editDialog.open"
    max-width="400px"
  >
    <v-card>
      <v-card-title>編輯報名</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="editDialog.male"
          label="男生人數"
          type="number"
          min="0"
        />
        <v-text-field
          v-model="editDialog.female"
          label="女生人數"
          type="number"
          min="0"
        />
        <v-text-field
          v-model="editDialog.nopreference"
          label="不限性別人數"
          type="number"
          min="0"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="closeEditDialog"
        >
          取消
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="submitEdit"
        >
          確認
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 刪除確認對話框 -->
  <v-dialog
    v-model="deleteDialog.open"
    max-width="300px"
  >
    <v-card>
      <v-card-title>確認刪除</v-card-title>
      <v-card-text>確定要刪除這個報名嗎？</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="closeDeleteDialog"
        >
          取消
        </v-btn>
        <v-btn
          color="red darken-1"
          text
          @click="submitDelete"
        >
          確認
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { definePage } from 'vue-router/auto'

const { api, apiAuth } = useApi()
const createSnackbar = useSnackbar()

const enrollments = ref([])

const editDialog = ref({
  open: false,
  id: null,
  male: 0,
  female: 0
})

const deleteDialog = ref({
  open: false,
  id: null
})

const getVenueName = (s_id) => {
  if (!s_id || !s_id.v_id) return '未知場地'
  return s_id.v_id.name || '未知場地'
}

const formatDate = (dateString) => {
  if (!dateString) return '未知日期'
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW')
}

const loadEnrollments = async () => {
  try {
    const { data } = await apiAuth.get('/enrollment')
    if (Array.isArray(data.result)) {
      enrollments.value = data.result
      console.log('Loaded enrollments:', enrollments.value)
    } else {
      console.error('Unexpected data format:', data)
      throw new Error('資料格式錯誤')
    }
  } catch (error) {
    console.error('Error loading enrollments:', error)
    createSnackbar({
      text: error?.response?.data?.message || error.message || '無法加載報名資料',
      snackbarProps: { color: 'error' }
    })
  }
}

const formatEnrollmentCount = (enrollment) => {
  const parts = []
  if (enrollment.male > 0) parts.push(`男${enrollment.male}人`)
  if (enrollment.female > 0) parts.push(`女${enrollment.female}人`)
  if (enrollment.nopreference > 0) parts.push(`不限${enrollment.nopreference}人`)
  return parts.join(' ')
}

const openEditDialog = (enrollment) => {
  editDialog.value = {
    open: true,
    id: enrollment._id,
    male: enrollment.male || 0,
    female: enrollment.female || 0,
    nopreference: enrollment.nopreference || 0,
    originalMale: enrollment.male || 0,
    originalFemale: enrollment.female || 0,
    originalNopreference: enrollment.nopreference || 0,
    session: enrollment.s_id
  }
}

const closeEditDialog = () => {
  editDialog.value.open = false
}

const submitEdit = async () => {
  try {
    const newMale = parseInt(editDialog.value.male)
    const newFemale = parseInt(editDialog.value.female)
    const newNopreference = parseInt(editDialog.value.nopreference)
    const oldMale = editDialog.value.originalMale
    const oldFemale = editDialog.value.originalFemale
    const oldNopreference = editDialog.value.originalNopreference
    const session = editDialog.value.session

    const maleDiff = newMale - oldMale
    const femaleDiff = newFemale - oldFemale
    const nopreferenceDiff = newNopreference - oldNopreference

    if (session.nopreference > 0) {
      if (maleDiff + femaleDiff + nopreferenceDiff > session.nopreference) {
        throw new Error(`超過可用名額。當前剩餘 ${session.nopreference} 個名額。`)
      }
    } else {
      if (maleDiff > session.male || femaleDiff > session.female) {
        throw new Error(`超過可用名額。當前剩餘男 ${session.male} 名，女 ${session.female} 名。`)
      }
    }

    await apiAuth.patch(`/enrollment/${editDialog.value.id}`, {
      male: newMale,
      female: newFemale,
      nopreference: newNopreference
    })
    createSnackbar({
      text: '報名更新成功',
      snackbarProps: { color: 'success' }
    })
    closeEditDialog()
    loadEnrollments()
  } catch (error) {
    createSnackbar({
      text: error?.message || '更新失敗',
      snackbarProps: { color: 'error' }
    })
  }
}

const openDeleteDialog = (id) => {
  deleteDialog.value = {
    open: true,
    id
  }
}

const closeDeleteDialog = () => {
  deleteDialog.value.open = false
}

const loadSessions = async () => {
  try {
    const { data } = await api.get('/session')
    if (Array.isArray(data.result)) {
      // 這裡我們只是簡單地更新場次數據，您可能需要根據您的需求進行調整
      console.log('Sessions reloaded:', data.result)
    } else {
      console.error('Unexpected data format:', data)
    }
  } catch (error) {
    console.error('Error loading sessions:', error)
    createSnackbar({
      text: error?.response?.data?.message || '無法加載場次資料',
      snackbarProps: { color: 'error' }
    })
  }
}

const submitDelete = async () => {
  try {
    const response = await apiAuth.delete(`/enrollment/${deleteDialog.value.id}`)
    console.log('Delete response:', response.data)
    createSnackbar({
      text: '報名刪除成功',
      snackbarProps: { color: 'success' }
    })
    closeDeleteDialog()
    await loadEnrollments()
    // 重新加載場次數據
    await loadSessions()
  } catch (error) {
    console.error('Delete error:', error)
    createSnackbar({
      text: error?.response?.data?.message || error.message || '刪除失敗',
      snackbarProps: { color: 'error' }
    })
  }
}

onMounted(() => {
  loadEnrollments()
})

definePage({
  meta: {
    title: '報名紀錄 | VPT',
    login: true,
    admin: false
  }
})
</script>
<style lang="scss" scoped>
.post-card {
  background-color: #f5f5f5;
  border-top: 2px solid #d5d5d5;
  border-radius: 0;
}
</style>

<route lang="yaml">
meta:
  layout: member
</route>
