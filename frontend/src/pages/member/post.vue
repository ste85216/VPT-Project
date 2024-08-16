<template>
  <v-row class="mt-4">
    <v-col
      cols="12"
      class="pt-0"
    >
      <v-row>
        <v-col
          cols="12"
          sm="3"
        >
          <h3 class="opacity-90 mb-4">
            刊登列表
          </h3>
        </v-col>
        <v-spacer />
        <v-col
          cols="12"
          sm="3"
        >
          <v-btn
            block
            elevation="0"
            variant="flat"
            class="post-btn"
            @click="openDialog(null)"
          >
            刊登場次
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col class="pt-0 pb-2">
      <v-divider />
    </v-col>
    <!-- md以上 -->
    <v-col
      v-if="mdAndUp"
      cols="12"
    >
      <v-row
        class="mb-4"
      >
        <v-col cols="12">
          <v-row
            class="px-4 text-center"
            style="font-size: 15px;"
          >
            <v-col>
              球場
            </v-col>
            <v-col cols="2">
              日期/時段
            </v-col>
            <v-col cols="1">
              網高
            </v-col>
            <v-col cols="1">
              程度
            </v-col>
            <v-col>
              人數
            </v-col>
            <v-col cols="1">
              費用
            </v-col>
            <v-col>
              備註
            </v-col>
            <v-col cols="1">
              操作
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-sheet
        v-if="sessions.length === 0"
        height="100%"
        align="center"
        class="opacity-80"
      >
        目前您沒有刊登任何場次
      </v-sheet>

      <!-- 場次卡片列表 -->
      <v-card
        v-for="(session, index) in sessions"
        :key="session._id.$oid || session._id"
        elevation="0"
        class="pa-4 py-8 post-card"
        :style="{ backgroundColor: index % 2 === 0 ? '#f0f0f080' : '#EFEBE990' }"
      >
        <v-row>
          <v-col cols="12">
            <v-row
              class="align-center text-center text-blue-grey-darken-2"
              style="font-size: 13px; font-weight: 500;"
            >
              <v-col>
                {{ getVenueName(session.v_id) }}
              </v-col>
              <v-col cols="2">
                {{ formatDate(session.date) }} <br>
                {{ session.time }}
              </v-col>
              <v-col cols="1">
                {{ session.netheight }}
              </v-col>
              <v-col cols="1">
                {{ session.level }}
              </v-col>
              <v-col>
                男:{{ session.male }} (已報名:{{ session.participantMale }}) <br>
                女:{{ session.female }} (已報名:{{ session.participantFemale }}) <br>
                不限:{{ session.nopreference }} (已報名:{{ session.participantNoPreference }})
              </v-col>
              <v-col cols="1">
                {{ session.fee }}/人
              </v-col>
              <v-col>
                {{ session.note || '無備註' }}
              </v-col>
              <v-col cols="1">
                <v-btn
                  size="x-small"
                  color="blue-darken-3"
                  variant="outlined"
                  class="mt-2"
                  @click="openEnrollmentRecordDialog(session)"
                >
                  <v-icon icon="mdi-progress-check" />
                </v-btn>
                <v-btn
                  size="x-small"
                  color="teal-darken-1"
                  variant="outlined"
                  class="mt-1"
                  @click="openDialog(session)"
                >
                  <v-icon icon="mdi-pen" />
                </v-btn>
                <v-btn
                  size="x-small"
                  color="red-darken-3"
                  variant="outlined"
                  class="mt-1"
                  @click="openConfirmDialog(session._id.$oid || session._id)"
                >
                  <v-icon icon="mdi-delete" />
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <!-- sm~md -->
    <v-col
      v-if="!mdAndUp && smAndUp"
      cols="12"
    >
      <v-row
        class="mb-4"
      >
        <v-col cols="12">
          <v-row
            class="px-4 text-center"
            style="font-size: 14px;"
          >
            <v-col class="align-self-center">
              球場
            </v-col>
            <v-col class="align-self-center">
              日期<br>時段
            </v-col>
            <v-col class="align-self-center">
              網高<br>程度<br>費用
            </v-col>
            <v-col class="align-self-center">
              人數
            </v-col>
            <v-col class="align-self-center">
              備註
            </v-col>
            <v-col class="align-self-center">
              操作
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-sheet
        v-if="sessions.length === 0"
        height="100%"
        align="center"
        class="opacity-80"
      >
        目前您沒有刊登任何場次
      </v-sheet>

      <!-- 場次卡片列表 -->
      <v-card
        v-for="(session, index) in sessions"
        :key="session._id.$oid || session._id"
        elevation="0"
        class="pa-4 py-8 post-card"
        :style="{ backgroundColor: index % 2 === 0 ? '#f0f0f080' : '#EFEBE990' }"
      >
        <v-row>
          <v-col cols="12">
            <v-row
              class="align-center text-center text-blue-grey-darken-2"
              style="font-size: 13px; font-weight: 500;"
            >
              <v-col>
                {{ getVenueName(session.v_id) }}
              </v-col>
              <v-col>
                {{ formatDate(session.date) }} <br>
                {{ session.time }}
              </v-col>
              <v-col>
                {{ session.netheight }}<br>
                {{ session.level }}<br>
                {{ session.fee }}/人
              </v-col>
              <v-col>
                男:{{ session.male }}<br>
                女:{{ session.female }} <br>
                不限:{{ session.nopreference }}
              </v-col>
              <v-col>
                {{ session.note || '無備註' }}
              </v-col>
              <v-col>
                <v-btn
                  size="x-small"
                  color="blue-darken-3"
                  variant="outlined"
                  class="mt-2"
                  @click="openEnrollmentRecordDialog(session)"
                >
                  <v-icon icon="mdi-progress-check" />
                </v-btn><br>
                <v-btn
                  size="x-small"
                  color="teal-darken-1"
                  variant="outlined"
                  class="mt-1"
                  @click="openDialog(session)"
                >
                  <v-icon icon="mdi-pen" />
                </v-btn><br>
                <v-btn
                  size="x-small"
                  color="red-darken-3"
                  variant="outlined"
                  class="mt-1"
                  @click="openConfirmDialog(session._id.$oid || session._id)"
                >
                  <v-icon icon="mdi-delete" />
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <!-- sm以下 -->
    <v-col
      v-if="!mdAndUp && !smAndUp"
      cols="12"
    >
      <v-row
        class="mb-4"
      >
        <v-col cols="12">
          <v-row
            class="px-4 text-center"
            style="font-size: 14px;"
          >
            <v-col class="align-self-center">
              球場
            </v-col>
            <v-col class="align-self-center">
              日期<br>時段
            </v-col>
            <v-col class="align-self-center">
              網高<br>程度<br>費用
            </v-col>
            <v-col class="align-self-center">
              操作
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-sheet
        v-if="sessions.length === 0"
        height="100%"
        align="center"
        class="opacity-80"
      >
        目前您沒有刊登任何場次
      </v-sheet>

      <!-- 場次卡片列表 -->
      <v-card
        v-for="(session, index) in sessions"
        :key="session._id.$oid || session._id"
        elevation="0"
        class="pa-4 py-8 post-card"
        :style="{ backgroundColor: index % 2 === 0 ? '#f0f0f080' : '#EFEBE990' }"
      >
        <v-row>
          <v-col cols="12">
            <v-row
              class="align-center text-center text-blue-grey-darken-2"
              style="font-size: 13px; font-weight: 500;"
            >
              <v-col>
                {{ getVenueName(session.v_id) }}
              </v-col>
              <v-col>
                {{ formatDate(session.date) }} <br>
                {{ session.time }}
              </v-col>
              <v-col>
                {{ session.netheight }}<br>
                {{ session.level }}<br>
                {{ session.fee }}/人
              </v-col>
              <v-col>
                <v-btn
                  size="x-small"
                  color="blue-darken-3"
                  variant="outlined"
                  class="mt-2"
                  @click="openEnrollmentRecordDialog(session)"
                >
                  <v-icon icon="mdi-progress-check" />
                </v-btn><br>
                <v-btn
                  size="x-small"
                  color="teal-darken-1"
                  variant="outlined"
                  class="mt-1"
                  @click="openDialog(session)"
                >
                  <v-icon icon="mdi-pen" />
                </v-btn><br>
                <v-btn
                  size="x-small"
                  color="red-darken-3"
                  variant="outlined"
                  class="mt-1"
                  @click="openConfirmDialog(session._id.$oid || session._id)"
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

  <!-- 刊登場次的Dialog -->
  <v-dialog
    v-model="dialog.open"
    persistent
    width="440"
  >
    <v-form @submit.prevent="submit">
      <v-card class="rounded-lg px-6 py-5">
        <v-card-title class="dialog-title">
          {{ dialog.id ? '編輯場次' : '新增場次' }}
        </v-card-title>
        <v-card-text class="mt-3 pa-3">
          <v-autocomplete
            v-model="venueId.value.value"
            :error-messages="venueId.errorMessage.value"
            :items="venues"
            item-title="fullName"
            item-value="id"
            label="球場"
            variant="outlined"
            density="compact"
            required
            :menu-props="{ maxHeight: 400 }"
            :filter="customFilter"
          >
            <template #item="{ props, item }">
              <v-list-item
                v-bind="props"
                :title="item.raw.fullName"
              />
            </template>
          </v-autocomplete>
          <v-text-field
            v-model="date.value.value"
            :error-messages="date.errorMessage.value"
            label="日期"
            variant="outlined"
            density="compact"
            type="date"
            required
          />
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="startTime.value.value"
                :error-messages="startTime.errorMessage.value"
                type="time"
                label="開始時間"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="endTime.value.value"
                :error-messages="endTime.errorMessage.value"
                type="time"
                label="結束時間"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
          </v-row>
          <v-select
            v-model="netheight.value.value"
            :error-messages="netheight.errorMessage.value"
            :items="['男網', '女網']"
            label="網高"
            variant="outlined"
            density="compact"
            required
          />
          <v-select
            v-model="level.value.value"
            :error-messages="level.errorMessage.value"
            :items="['A', 'B+', 'B', 'C', '新手友善']"
            label="程度"
            variant="outlined"
            density="compact"
            required
          />
          <v-row class="mb-1">
            <v-col>
              <v-text-field
                v-model="male.value.value"
                :error-messages="male.errorMessage.value"
                label="男生人數"
                variant="outlined"
                density="compact"
                type="number"
                required
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="female.value.value"
                :error-messages="female.errorMessage.value"
                label="女生人數"
                variant="outlined"
                density="compact"
                type="number"
                required
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="nopreference.value.value"
                :error-messages="nopreference.errorMessage.value"
                label="不限性別人數"
                variant="outlined"
                density="compact"
                type="number"
                required
              />
            </v-col>
            <v-alert
              v-if="errors['at-least-one-gender']"
              type="error"
              class="mt-3"
            >
              {{ errors['at-least-one-gender'] }}
            </v-alert>
          </v-row>

          <v-text-field
            v-model="fee.value.value"
            :error-messages="fee.errorMessage.value"
            label="費用"
            variant="outlined"
            density="compact"
            type="number"
            required
            placeholder="e.g. 250"
          />
          <v-textarea
            v-model="note.value.value"
            :error-messages="note.errorMessage.value"
            label="備註"
            variant="outlined"
            density="compact"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-if="mdAndUp"
            color="red-lighten-1"
            variant="outlined"
            @click="closeDialog"
          >
            取消
          </v-btn>
          <v-btn
            v-if="mdAndUp"
            color="teal-darken-1"
            type="submit"
            variant="outlined"
            :loading="isSubmitting"
          >
            送出
          </v-btn>
          <v-btn
            v-if="!mdAndUp"
            color="red-lighten-1"
            variant="outlined"
            size="small"
            @click="closeDialog"
          >
            取消
          </v-btn>
          <v-btn
            v-if="!mdAndUp"
            color="teal-darken-1"
            type="submit"
            variant="outlined"
            size="small"
            :loading="isSubmitting"
          >
            送出
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

  <!-- 使用新的 ConfirmDeleteDialog 組件 -->
  <ConfirmDeleteDialog
    v-model="confirmDialog.open"
    title="確認要取消此場次嗎？"
    message="此操作不可撤銷。"
    cancel-size="small"
    confirm-size="small"
    @confirm="confirmCancel"
    @cancel="closeConfirmDialog"
  />

  <!-- 報名紀錄對話框 -->
  <v-dialog
    v-model="enrollmentRecordDialog.open"
    max-width="480px"
  >
    <v-card class="pa-4">
      <v-card-title class="enrollment-record-title">
        報名清單
      </v-card-title>
      <v-card-text>
        <v-sheet
          v-if="enrollmentRecordDialog.enrollments.length === 0"
          class="text-center text-grey-darken-2"
        >
          尚未有人報名
        </v-sheet>
        <div v-else>
          <v-alert
            color="blue-grey-lighten-1"
            class="mb-4 alert-title"
            density="compact"
            variant="flat"
          >
            <v-icon
              size="small"
              icon="mdi-information-outline"
              class="pb-0 me-2 "
            />
            報名狀態 - {{ formatRemainingPlayers(enrollmentRecordDialog.session) }}
          </v-alert>
          <v-list>
            <v-list-item
              v-for="enrollment in enrollmentRecordDialog.enrollments"
              :key="enrollment._id"
            >
              <v-list-item-title>
                <span class="enrollment-list-name">{{ enrollment.userId.name }}</span> <span class="enrollment-list-userId">{{ enrollment.userId.userId }}</span>
              </v-list-item-title>
              <v-list-item-subtitle class="mt-2 mb-4">
                電話: {{ enrollment.userId.phone }} |
                {{ formatEnrollmentCount(enrollment) }}
              </v-list-item-subtitle>
              <v-divider />
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue-grey-darken-2"
          text
          @click="closeEnrollmentRecordDialog"
        >
          關閉
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { definePage } from 'vue-router/auto'
import { useDisplay } from 'vuetify'

definePage({
  meta: {
    title: '刊登場次 | VPT',
    login: true,
    admin: false
  }
})

const { mdAndUp, smAndUp } = useDisplay()
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const sessions = ref([])
const venues = ref([])

const schema = yup.object({
  venueId: yup.string().required('請選擇球場'),
  date: yup.string().required('請選擇日期'),
  startTime: yup.string().required('請輸入開始時間'),
  endTime: yup.string().required('請輸入結束時間'),
  netheight: yup.string().required('請選擇網高'),
  level: yup.string().required('請選擇程度'),
  male: yup.string().min(0, '人數不能小於0'),
  female: yup.string().min(0, '人數不能小於0'),
  nopreference: yup.string().min(0, '人數不能小於0'),
  fee: yup.string().required('請輸入費用').min(1, '請填寫費用'),
  note: yup.string()
}).test('at-least-one-gender', '至少需要填寫其中一性別的人數', function (values) {
  if (!(Number(values.male) > 0 || Number(values.female) > 0 || Number(values.nopreference) > 0)) {
    return this.createError({
      path: 'male', // 你可以選擇將錯誤附加到哪個字段
      message: '三欄必填一欄人數'
    })
  }
  return true
})

const { handleSubmit, isSubmitting, resetForm, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    venueId: '',
    date: '',
    startTime: '',
    endTime: '',
    netheight: '',
    level: '',
    male: 0,
    female: 0,
    nopreference: 0,
    fee: 0,
    note: ''
  }
})

const venueId = useField('venueId')
const date = useField('date')
const startTime = useField('startTime')
const endTime = useField('endTime')
const netheight = useField('netheight')
const level = useField('level')
const male = useField('male')
const female = useField('female')
const nopreference = useField('nopreference')
const fee = useField('fee')
const note = useField('note')

const dialog = ref({ open: false, id: null })
const confirmDialog = ref({ open: false })
const sessionIdToCancel = ref(null)

const submit = handleSubmit(async (values) => {
  try {
    const payload = {
      ...values,
      v_id: values.venueId,
      time: `${values.startTime}-${values.endTime}`,
      male: parseInt(values.male),
      female: parseInt(values.female),
      nopreference: parseInt(values.nopreference),
      fee: parseFloat(values.fee)
    }
    delete payload.venueId
    delete payload.startTime
    delete payload.endTime

    let response
    if (dialog.value.id) {
      response = await apiAuth.patch(`/session/${dialog.value.id}`, payload)
    } else {
      response = await apiAuth.post('/session', payload)
      console.log(response)
    }

    createSnackbar({
      text: dialog.value.id ? '場次編輯成功' : '場次新增成功',
      snackbarProps: { color: 'teal-darken-1' }
    })
    closeDialog()
    loadSessions()
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '操作失敗',
      snackbarProps: { color: 'red-lighten-1' }
    })
  }
})

const openDialog = (session) => {
  if (session) {
    dialog.value.id = session._id
    const [startTime, endTime] = session.time.split('-')
    resetForm({
      values: {
        venueId: session.v_id._id || session.v_id,
        date: formatDateForInput(session.date),
        startTime,
        endTime,
        netheight: session.netheight,
        level: session.level,
        male: session.male,
        female: session.female,
        nopreference: session.nopreference,
        fee: session.fee,
        note: session.note
      }
    })
  } else {
    dialog.value.id = null
    resetForm({
      values: {
        venueId: '',
        date: '',
        startTime: '',
        endTime: '',
        netheight: '',
        level: '',
        male: 0,
        female: 0,
        nopreference: 0,
        fee: 0,
        note: ''
      }
    }) // 這裡確保表單重置為初始空值
  }
  dialog.value.open = true
}

// 添加這個輔助函數來格式化日期
const formatDateForInput = (dateString) => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

const closeDialog = () => {
  resetForm() // 確保表單在關閉時被重置
  dialog.value.open = false
}

const openConfirmDialog = (sessionId) => {
  sessionIdToCancel.value = sessionId
  confirmDialog.value.open = true
}

const closeConfirmDialog = () => {
  confirmDialog.value.open = false
}

const confirmCancel = async () => {
  try {
    await apiAuth.delete(`/session/${sessionIdToCancel.value}`)
    sessions.value = sessions.value.filter(s => s._id !== sessionIdToCancel.value)
    createSnackbar({
      text: '場次已成功取消',
      snackbarProps: { color: 'teal-darken-1' }
    })
    closeConfirmDialog()
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || '操作失敗',
      snackbarProps: { color: 'red-lighten-1' }
    })
  }
}

const loadSessions = async () => {
  try {
    const { data } = await apiAuth.get('/session/user')
    if (Array.isArray(data.result)) {
      sessions.value = data.result.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else {
      console.error('Received data is not an array:', data)
      createSnackbar({
        text: '接收到的資料格式不正確',
        snackbarProps: { color: 'red-lighten-1' }
      })
    }
  } catch (error) {
    console.error('Error loading sessions:', error)
    createSnackbar({
      text: error?.response?.data?.message || '無法加載場次資料',
      snackbarProps: { color: 'red-lighten-1' }
    })
  }
}

const getVenueName = (v_id) => {
  if (v_id && typeof v_id === 'object') {
    return v_id.name || '未知場地'
  }
  return '未知場地'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW')
}

const loadVenues = async () => {
  try {
    let allVenues = []
    let page = 1
    let hasMoreData = true
    const itemsPerPage = 100 // 每頁獲取的記錄數，可以根據需要調整

    while (hasMoreData) {
      const { data } = await apiAuth.get('/venue', {
        params: {
          page,
          itemsPerPage
        }
      })

      if (Array.isArray(data.result.data) && data.result.data.length > 0) {
        allVenues = allVenues.concat(data.result.data)
        if (data.result.data.length < itemsPerPage) {
          hasMoreData = false
        } else {
          page++
        }
      } else {
        hasMoreData = false
      }
    }

    venues.value = allVenues.map(venue => {
      const addressWithoutPostalCode = venue.address.replace(/^\d{3,5}\s*/, '')
      const cityCountyMatch = addressWithoutPostalCode.match(/^(.+?[市縣])/)
      const cityCounty = cityCountyMatch ? cityCountyMatch[1] : '未知地區'

      return {
        id: venue._id.$oid || venue._id,
        name: venue.name,
        city: cityCounty,
        fullName: `[${cityCounty}] ${venue.name}`
      }
    }).sort((a, b) => a.city.localeCompare(b.city, 'zh-TW'))

    console.log(`Loaded ${venues.value.length} venues`)
  } catch (error) {
    console.error('Error loading venues:', error)
    createSnackbar({
      text: error?.response?.data?.message || '無法加載球場資料',
      snackbarProps: { color: 'red-lighten-1' }
    })
  }
}

const customFilter = (item, query, itemText) => {
  const searchLower = query.toLowerCase()
  return item.raw.fullName.toLowerCase().includes(searchLower) ||
         item.raw.city.toLowerCase().includes(searchLower) ||
         item.raw.name.toLowerCase().includes(searchLower)
}

const enrollmentRecordDialog = ref({
  open: false,
  enrollments: [],
  session: null
})

const formatEnrollmentCount = (enrollment) => {
  const parts = []
  if (enrollment.male > 0) parts.push(`男${enrollment.male}人`)
  if (enrollment.female > 0) parts.push(`女${enrollment.female}人`)
  if (enrollment.nopreference > 0) parts.push(`不限${enrollment.nopreference}人`)
  return parts.length > 0 ? parts.join(' ') : '無報名資料'
}

const formatRemainingPlayers = (session) => {
  if (!session) return '無資料'

  const remainingMale = session.male - (session.participantMale || 0)
  const remainingFemale = session.female - (session.participantFemale || 0)
  const remainingNoPreference = session.nopreference - (session.participantNoPreference || 0)

  if (remainingMale <= 0 && remainingFemale <= 0 && remainingNoPreference <= 0) {
    return '名額已滿'
  }

  const parts = []
  if (remainingNoPreference > 0) {
    parts.push(`不限${remainingNoPreference}人`)
  }
  if (remainingMale > 0) parts.push(`男${remainingMale}人`)
  if (remainingFemale > 0) parts.push(`女${remainingFemale}人`)

  return `尚需: ${parts.join(' ')}`
}

const updateSessionData = async (sessionId) => {
  try {
    const { data } = await apiAuth.get(`/session/${sessionId}`)
    const index = sessions.value.findIndex(s => s._id === sessionId)
    if (index !== -1) {
      sessions.value[index] = data.result
    }
  } catch (error) {
    console.error('Error updating session data:', error)
    createSnackbar({
      text: '無法更新場次資料',
      snackbarProps: { color: 'red-lighten-1' }
    })
  }
}

const openEnrollmentRecordDialog = async (session) => {
  try {
    const response = await apiAuth.get(`/enrollment/session/${session._id}`)
    enrollmentRecordDialog.value = {
      open: true,
      enrollments: response.data.result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
      session
    }
    await updateSessionData(session._id) // 更新場次數據
  } catch (error) {
    console.error('Error fetching enrollment records:', error)
    createSnackbar({
      text: '無法獲取報名紀錄',
      snackbarProps: { color: 'red-lighten-1' }
    })
  }
}

const closeEnrollmentRecordDialog = () => {
  enrollmentRecordDialog.value.open = false
}

onMounted(() => {
  loadSessions()
  loadVenues()
})
</script>

<style lang="scss" scoped>
@import '/src/styles/settings.scss';
.post-btn {
  background-color: #5e7b88;
  color: white;
  &:hover {
    background-color: #303e44;
  }
}
.post-card {
  background-color: #f5f5f5;
  border-top: 2px solid #d5d5d5;
  border-radius: 0;
}

.dialog-title {
  font-size: 16px;
}

.alert-title {
  font-size: 14px;
}

.enrollment-record-title {
  font-size: 15px;
}

.enrollment-list-name {
  font-size: 15px;
  font-weight: 500;
}

.enrollment-list-userId {
  font-size: 14px;
  color: #666;
}

@include md {
  .dialog-title {
    font-size: 18px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: member
</route>
