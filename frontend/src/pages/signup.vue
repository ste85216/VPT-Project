<template>
  <!-- 主容器 -->
  <v-container
    fluid
    style="max-width: 1200px;margin-top: 32px;"
    class=" mb-14"
  >
    <v-row>
      <v-col cols="12">
        <v-row>
          <!-- 標題 -->
          <v-col
            cols="12"
            class="ps-5 pb-10 text-grey-darken-1"
          >
            <h2>臨打報名系統</h2>
          </v-col>
          <!-- 搜尋篩選區域 -->
          <v-col
            cols="12"
            md="3"
            class="py-0 px-4"
          >
            <v-form @submit.prevent="applyFilters">
              <v-card
                class="pa-4 card-search"
                elevation="4"
              >
                <v-row no-gutters>
                  <!-- 搜尋篩選標題 -->
                  <v-col cols="12">
                    <h4 class="title-search py-4 text-grey-darken-3">
                      搜尋篩選
                    </h4>
                  </v-col>
                  <!-- 地區選擇 -->
                  <v-col cols="12">
                    <div class="region">
                      地區: <v-select
                        v-model="filters.city"
                        variant="outlined"
                        density="compact"
                        :items="cities"
                        clearable
                      />
                    </div>
                  </v-col>
                  <!-- 球場選擇 -->
                  <v-col cols="12">
                    <div class="venue">
                      球場: <v-autocomplete
                        v-model="filters.venueId"
                        :items="venueOptions"
                        item-title="name"
                        item-value="id"
                        variant="outlined"
                        density="compact"
                        clearable
                        @change="onVenueChange"
                      />
                    </div>
                  </v-col>
                  <!-- 日期選擇 -->
                  <v-col
                    cols="12"
                    class="mt-4"
                  >
                    <div>
                      日期:
                      <v-text-field
                        v-model="filters.date"
                        type="date"
                        density="compact"
                        variant="outlined"
                      />
                    </div>
                  </v-col>
                  <!-- 網高選擇 -->
                  <v-col
                    cols="12"
                    class="mt-4"
                  >
                    <div>
                      網高:
                      <v-chip-group
                        v-model="filters.netheight"
                        filter
                        color="primary"
                        variant="outlined"
                        multiple
                      >
                        <v-chip
                          label
                          value="男網"
                        >
                          男網
                        </v-chip>
                        <v-chip
                          label
                          value="女網"
                        >
                          女網
                        </v-chip>
                      </v-chip-group>
                    </div>
                  </v-col>
                  <!-- 程度選擇 -->
                  <v-col
                    cols="12"
                    class="mt-4"
                  >
                    <div>
                      程度:
                      <v-chip-group
                        v-model="filters.level"
                        filter
                        color="primary"
                        column
                        variant="outlined"
                        multiple
                      >
                        <v-chip
                          label
                          value="C"
                        >
                          C
                        </v-chip>
                        <v-chip
                          label
                          value="B"
                        >
                          B
                        </v-chip>
                        <v-chip
                          label
                          value="B+"
                        >
                          B+
                        </v-chip>
                        <v-chip
                          label
                          value="A"
                        >
                          A
                        </v-chip>
                        <v-chip
                          label
                          value="新手友善"
                        >
                          新手友善
                        </v-chip>
                      </v-chip-group>
                    </div>
                  </v-col>
                  <!-- 搜尋和重置按鈕 -->
                  <v-col
                    cols="12"
                    class="my-4"
                  >
                    <v-row>
                      <v-col cols="2">
                        <v-btn
                          block
                          color="blue-grey-darken-1"
                          class="mt-2"
                          @click="clearFilters"
                        >
                          <v-icon icon="mdi-arrow-u-left-top" />
                        </v-btn>
                      </v-col>
                      <v-col>
                        <v-btn
                          block
                          color="primary"
                          class="mt-2"
                          @click="applyFilters"
                        >
                          搜尋
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-form>
          </v-col>
          <!-- 場次列表區域 -->
          <v-col
            cols="12"
            md="9"
          >
            <v-row>
              <v-col
                cols="12"
                class="py-0 px-4 pt-4 pt-md-0 px-md-0"
              >
                <v-card
                  class="pa-md-8"
                  elevation="4"
                >
                  <v-row>
                    <!-- 場次列表標題 -->
                    <v-col cols="12">
                      <h3 class="title-session ps-5 pt-5">
                        場次清單
                      </h3>
                    </v-col>
                    <v-col>
                      <!-- 無搜尋結果時顯示 -->
                      <v-sheet
                        v-if="filteredSessions.length === 0"
                        class="text-center pb-10"
                      >
                        未搜尋到相關場次
                      </v-sheet>
                      <!-- 場次列表 -->
                      <v-expansion-panels class="d-none d-md-block">
                        <v-expansion-panel
                          v-for="(session, index) in filteredSessions"
                          :key="session._id"
                          elevation="0"
                          :style="{ backgroundColor: index % 2 === 0 ? '#f0f0f080' : '#ECEFF1' }"
                        >
                          <v-expansion-panel-title>
                            <v-row class="text-center">
                              <v-col
                                cols="12"
                              >
                                <v-row
                                  align="center"
                                  justify="center"
                                >
                                  <!-- 場次信息標題 -->
                                  <v-col
                                    cols="4"
                                    sm
                                  >
                                    會員編號
                                  </v-col>
                                  <v-col
                                    cols="4"
                                    sm
                                  >
                                    地區
                                  </v-col>
                                  <v-col
                                    cols="4"
                                    sm
                                  >
                                    球場
                                  </v-col>
                                  <v-col
                                    cols="3"
                                    sm="2"
                                  >
                                    日期
                                  </v-col>
                                  <v-col
                                    cols="3"
                                    sm
                                  >
                                    時段
                                  </v-col>
                                  <v-col
                                    cols="3"
                                    sm
                                  >
                                    網高
                                  </v-col>
                                  <v-col
                                    cols="3"
                                    sm
                                  >
                                    程度
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col class="pe-sm-6">
                                <v-divider />
                              </v-col>
                              <v-col cols="12">
                                <v-row
                                  style="line-height: 32px;font-size: 14px"
                                  class="text-blue-grey-darken-3"
                                >
                                  <!-- 場次信息內容 -->
                                  <v-col
                                    cols="4"
                                    sm
                                  >
                                    {{ session.userId.userId }}
                                  </v-col>
                                  <v-col
                                    cols="4"
                                    sm
                                  >
                                    {{ getVenueCity(session.v_id) }}
                                  </v-col>
                                  <v-col
                                    cols="4"
                                    sm
                                  >
                                    {{ getVenueName(session.v_id) }}
                                  </v-col>
                                  <v-col
                                    cols="3"
                                    sm="2"
                                  >
                                    {{ formatDate(session.date) }}
                                  </v-col>
                                  <v-col
                                    cols="3"
                                    sm
                                  >
                                    {{ session.time }}
                                  </v-col>
                                  <v-col
                                    cols="3"
                                    sm
                                  >
                                    {{ session.netheight }}
                                  </v-col>
                                  <v-col
                                    cols="3"
                                    sm
                                  >
                                    {{ session.level }}
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-title>
                          <v-expansion-panel-text>
                            <v-row
                              class="pa-4 ps-0 text-center"
                              style="font-size: 15px"
                            >
                              <v-col cols="9">
                                <v-row>
                                  <v-col cols="12">
                                    <v-row>
                                      <!-- 場次詳細信息標題 -->
                                      <v-col
                                        cols="4"
                                        sm="2"
                                      >
                                        價錢
                                      </v-col>
                                      <v-col
                                        cols="4"
                                        sm="2"
                                      >
                                        備註
                                      </v-col>
                                      <v-col cols="3">
                                        報名狀態
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="7"
                                  >
                                    <v-divider />
                                  </v-col>
                                  <v-col cols="12">
                                    <v-row
                                      class="text-blue-grey-darken-3"
                                      style="font-size: 14px;"
                                    >
                                      <!-- 場次詳細信息內容 -->
                                      <v-col
                                        cols="4"
                                        sm="2"
                                      >
                                        {{ session.fee === 0 ? '免費' : `$${session.fee}/人` }}
                                      </v-col>
                                      <v-col
                                        cols="4"
                                        sm="2"
                                      >
                                        {{ session.note || '無備註' }}
                                      </v-col>
                                      <v-col cols="3">
                                        尚需: <span style="font-size: 15px;color:#FF1744;">{{ formatRemainingPlayers(session) }}</span>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <!-- 報名按鈕 -->
                              <v-col
                                cols="12"
                                sm="3"
                                class="d-flex align-center"
                              >
                                <v-btn
                                  size="large"
                                  block
                                  elevation="0"
                                  color="yellow-darken-4"
                                  :disabled="isSessionFull(session)"
                                  @click="openEnrollDialog(session)"
                                >
                                  {{ isSessionFull(session) ? '名額已滿' : '我要報名' }}
                                  <v-icon
                                    icon="mdi-playlist-check"
                                    class="ms-2"
                                  />
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>
                      <!-- md以下一些資訊丟報名dialog -->
                      <v-expansion-panels class="d-md-none">
                        <v-expansion-panel
                          v-for="(session, index) in filteredSessions"
                          :key="session._id"
                          elevation="0"
                          :style="{ backgroundColor: index % 2 === 0 ? '#f0f0f080' : '#ECEFF1' }"
                        >
                          <v-expansion-panel-title>
                            <v-row class="text-center">
                              <v-col
                                cols="12"
                              >
                                <v-row
                                  align="center"
                                  justify="center"
                                >
                                  <!-- 場次信息標題 -->

                                  <v-col
                                    cols="4"
                                  >
                                    球場
                                  </v-col>
                                  <v-col
                                    cols="4"
                                  >
                                    日期
                                  </v-col>
                                  <v-col
                                    cols="4"
                                  >
                                    時段
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col class="pe-sm-6">
                                <v-divider />
                              </v-col>
                              <v-col cols="12">
                                <v-row
                                  style="line-height: 32px;font-size: 14px"
                                  class="text-blue-grey-darken-3"
                                >
                                  <!-- 場次信息內容 -->
                                  <v-col
                                    cols="4"
                                  >
                                    {{ getVenueName(session.v_id) }}
                                  </v-col>
                                  <v-col
                                    cols="4"
                                  >
                                    {{ formatDate(session.date) }}
                                  </v-col>
                                  <v-col
                                    cols="4"
                                  >
                                    {{ session.time }}
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-title>
                          <v-expansion-panel-text>
                            <v-row
                              class="pa-4 ps-0 text-center"
                              style="font-size: 15px"
                            >
                              <v-col cols="12">
                                <v-row>
                                  <v-col
                                    cols="12"
                                    class="pe-4"
                                  >
                                    <v-row>
                                      <!-- 場次詳細信息標題 -->

                                      <v-col
                                        cols="4"
                                      >
                                        網高
                                      </v-col>
                                      <v-col
                                        cols="4"
                                      >
                                        價錢
                                      </v-col>

                                      <v-col cols="4">
                                        報名狀態
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                  >
                                    <v-divider />
                                  </v-col>
                                  <v-col cols="12">
                                    <v-row
                                      class="text-blue-grey-darken-3"
                                      style="font-size: 14px;"
                                    >
                                      <!-- 場次詳細信息內容 -->
                                      <v-col
                                        cols="4"
                                      >
                                        {{ session.netheight }}
                                      </v-col>
                                      <v-col
                                        cols="4"
                                      >
                                        {{ session.fee === 0 ? '免費' : `$${session.fee}/人` }}
                                      </v-col>
                                      <v-col cols="4">
                                        尚需: <br><span style="font-size: 14px;color:#FF1744;">{{ formatRemainingPlayers(session) }}</span>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <!-- 報名按鈕 -->
                              <v-col
                                cols="12"
                                class="d-flex align-center"
                              >
                                <v-btn
                                  size="large"
                                  block
                                  elevation="0"
                                  color="yellow-darken-4"
                                  :disabled="isSessionFull(session)"
                                  @click="openEnrollDialog(session)"
                                >
                                  {{ isSessionFull(session) ? '名額已滿' : '我要報名' }}
                                  <v-icon
                                    icon="mdi-playlist-check"
                                    class="ms-2"
                                  />
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <!-- 報名對話框 -->
  <v-dialog
    v-model="enrollDialog.open"
    max-width="400px"
  >
    <v-card class="px-4 py-5">
      <v-card-title>報名場次</v-card-title>
      <v-card-text class="pa-0">
        <!-- 場次信息 -->
        <v-list-item>
          <v-list-item-title>球場：{{ enrollDialog.session?.v_id.name }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>日期：{{ formatDate(enrollDialog.session?.date) }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>時段：{{ enrollDialog.session?.time }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="d-md-none">
          <v-list-item-title>程度：{{ enrollDialog.session?.level }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="d-md-none">
          <v-list-item-title>備註：{{ enrollDialog.session?.note || '無備註' }}</v-list-item-title>
        </v-list-item>
        <!-- 報名人數輸入 -->
        <v-text-field
          v-if="!enrollDialog.maleDisabled"
          v-model="enrollDialog.male"
          label="男生人數"
          class="px-3 pt-4"
          variant="outlined"
          density="compact"
          type="number"
          hide-details
          min="0"
          :disabled="enrollDialog.maleDisabled"
        />
        <v-text-field
          v-if="!enrollDialog.femaleDisabled"
          v-model="enrollDialog.female"
          label="女生人數"
          class="px-3 pt-4"
          variant="outlined"
          density="compact"
          type="number"
          hide-details
          min="0"
          :disabled="enrollDialog.femaleDisabled"
        />
        <v-text-field
          v-if="!enrollDialog.nopreferenceDisabled"
          v-model="enrollDialog.nopreference"
          label="不限性別人數"
          class="px-3 pt-4"
          variant="outlined"
          density="compact"
          type="number"
          hide-details
          min="0"
          :disabled="enrollDialog.nopreferenceDisabled"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <!-- 取消按鈕 -->
        <v-btn
          color="red-lighten-1"
          variant="outlined"
          @click="closeEnrollDialog"
        >
          取消
        </v-btn>
        <!-- 確認按鈕 -->
        <v-btn
          color="teal-darken-1"
          variant="outlined"
          @click="submitEnrollment"
        >
          確認
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
// 導入所需的模組和函數
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useApi } from '@/composables/axios'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/user'
import { definePage } from 'vue-router/auto'

// 初始化 API、路由器、提示訊息和用戶存儲
const { api, apiAuth } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()
const user = useUserStore()

// 定義城市列表
const cities = [
  '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市',
  '基隆市', '新竹市', '嘉義市', '新竹縣', '苗栗縣', '彰化縣',
  '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣',
  '台東縣', '澎湖縣', '金門縣', '連江縣'
]

// 定義反應性變量
const needsRefresh = ref(false)
const sessions = ref([]) // 存放所有場次資料
const venues = ref({}) // 存放球場資料
const venueOptions = ref([]) // 球場選項
const filters = ref({
  city: '',
  venueId: '',
  date: '',
  netheight: [],
  level: []
})

// 過濾狀態和結果
const isFiltered = ref(false)
const tempFilteredSessions = ref([])

// 報名對話框狀態
const enrollDialog = ref({
  open: false,
  session: null,
  male: 0,
  female: 0,
  nopreference: 0
})

// 打開報名對話框
const openEnrollDialog = (session) => {
  if (isSessionFull(session)) {
    createSnackbar({
      text: '此場次名額已滿',
      snackbarProps: { color: 'red-lighten-1' }
    })
    return
  }

  enrollDialog.value = {
    open: true,
    session,
    male: 0,
    female: 0,
    nopreference: 0,
    maleDisabled: session.male === 0,
    femaleDisabled: session.female === 0,
    nopreferenceDisabled: session.nopreference === 0
  }
}

// 驗證報名
const validateEnrollment = (male, female, nopreference, session) => {
  const totalRequested = male + female + nopreference
  const availableMale = session.male - (session.participantMale || 0)
  const availableFemale = session.female - (session.participantFemale || 0)
  const availableNoPreference = session.nopreference - (session.participantNoPreference || 0)
  const totalAvailable = availableMale + availableFemale + availableNoPreference

  if (totalRequested > totalAvailable) {
    return false
  }

  if (nopreference > 0) {
    return nopreference <= availableNoPreference
  } else {
    return male <= availableMale && female <= availableFemale
  }
}

// 檢查用戶是否已報名特定場次
const checkEnrollment = async (sessionId) => {
  try {
    const { data } = await apiAuth.get(`/enrollment/check/${sessionId}`)
    return data.enrolled
  } catch (error) {
    console.error('Error checking enrollment:', error)
    throw error // 將錯誤拋出，以便在調用處處理
  }
}

// 提交報名
const submitEnrollment = async () => {
  if (!user.token) {
    createSnackbar({
      text: '請先登錄',
      snackbarProps: { color: 'red-lighten-1' }
    })
    router.push('/loginregister')
    return
  }

  const male = !enrollDialog.value.maleDisabled ? parseInt(enrollDialog.value.male) || 0 : 0
  const female = !enrollDialog.value.femaleDisabled ? parseInt(enrollDialog.value.female) || 0 : 0
  const nopreference = !enrollDialog.value.nopreferenceDisabled ? parseInt(enrollDialog.value.nopreference) || 0 : 0
  const session = enrollDialog.value.session

  if (male + female + nopreference === 0) {
    createSnackbar({
      text: '請至少報名一人',
      snackbarProps: { color: 'red-lighten-1' }
    })
    return
  }

  if (!validateEnrollment(male, female, nopreference, session)) {
    createSnackbar({
      text: `報名人數超過可報名人數，當前剩餘: ${formatRemainingPlayers(session)}`,
      snackbarProps: {
        color: 'red-lighten-1'
      }
    })
    return
  }

  try {
    // 檢查用戶是否已經報名過該場次
    const isEnrolled = await checkEnrollment(session._id)
    if (isEnrolled) {
      createSnackbar({
        text: '您已報名過該場次，點擊此處查看"報名紀錄"',
        snackbarProps: {
          color: 'orange-darken-3',
          timeout: 3000,
          closeOnClick: false,
          onClick: () => {
            router.push('/member/enrollment')
          }
        }
      })
      closeEnrollDialog()
      return
    }
    // 執行報名
    const response = await apiAuth.post('/enrollment', {
      s_id: session._id,
      male,
      female,
      nopreference
    })

    // 更新本地的剩餘名額
    const updatedSession = response.data.result.session
    const sessionIndex = sessions.value.findIndex(s => s._id === updatedSession._id)
    if (sessionIndex !== -1) {
      sessions.value[sessionIndex] = { ...sessions.value[sessionIndex], ...updatedSession }
    }

    closeEnrollDialog()
    createSnackbar({
      text: '報名成功',
      snackbarProps: { color: 'teal-darken-1' }
    })
    await loadSessions() // 重新加載場次數據
    router.push('/member/enrollment')
  } catch (error) {
    console.error('Enrollment error:', error)
    let errorMessage = '報名失敗'
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message
    } else if (error.message) {
      errorMessage = error.message
    }
    createSnackbar({
      text: errorMessage,
      snackbarProps: { color: 'red-lighten-1' }
    })
  }
}

// 關閉報名對話框
const closeEnrollDialog = () => {
  enrollDialog.value.open = false
}

// 加載場次資料
const loadSessions = async () => {
  try {
    const params = {}
    if (filters.value.date) {
      params.date = filters.value.date
    }

    const { data } = await api.get('/session', { params })

    if (Array.isArray(data.result)) {
      // 對場次進行排序，日期最近的排在前面
      sessions.value = data.result.sort((a, b) => new Date(a.date) - new Date(b.date))
      const uniqueVenueIds = [...new Set(sessions.value.map(s => s.v_id.$oid))]
      await Promise.all(uniqueVenueIds.map(loadVenue))
    } else {
      createSnackbar({
        text: '接收到的資料格式不正確',
        snackbarProps: { color: 'red-lighten-1' }
      })
    }
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || '無法加載場次資料',
      snackbarProps: { color: 'red-lighten-1' }
    })
  }
}

// 加載球場資料
const loadVenue = async () => {
  try {
    let allVenues = []
    let page = 1
    let hasMoreData = true

    while (hasMoreData) {
      const { data } = await api.get('/venue', {
        params: {
          page,
          itemsPerPage: 100 // 每次請求100條記錄
        }
      })

      if (Array.isArray(data.result.data) && data.result.data.length > 0) {
        allVenues = allVenues.concat(data.result.data)
        page++
      } else {
        hasMoreData = false
      }

      // 如果獲取的數據量等於或超過總數，就停止請求
      if (data.result.total && allVenues.length >= data.result.total) {
        hasMoreData = false
      }
    }

    const venuesData = allVenues.map(venue => ({
      id: venue._id.$oid || venue._id,
      name: venue.name,
      city: extractCity(venue.address)
    }))

    venues.value = venuesData.reduce((acc, venue) => {
      acc[venue.id] = venue
      return acc
    }, {})

    venueOptions.value = venuesData
  } catch (error) {
    console.error('Error loading venues:', error)
    createSnackbar({
      text: error?.response?.data?.message || '無法加載球場資料',
      snackbarProps: { color: 'red-lighten-1' }
    })
  }
}

// 從地址中提取城市
const extractCity = (address) => {
  const addressWithoutPostalCode = address.replace(/^\d{3,5}\s*/, '')
  const cityCountyMatch = addressWithoutPostalCode.match(/^(.+?[市縣])/)
  return cityCountyMatch ? cityCountyMatch[1] : '未知地區'
}

// 獲取場地名稱
const getVenueName = (v_id) => {
  const id = v_id._id || v_id
  return venues.value[id]?.name || '未知場地'
}

// 獲取場地城市
const getVenueCity = (v_id) => {
  const id = v_id._id || v_id
  return venues.value[id]?.city || '未知地區'
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW')
}

// 格式化剩餘球員數量
const formatRemainingPlayers = (session) => {
  const remainingMale = session.male - (session.participantMale || 0)
  const remainingFemale = session.female - (session.participantFemale || 0)
  const remainingNoPreference = session.nopreference - (session.participantNoPreference || 0)

  if (remainingMale === 0 && remainingFemale === 0 && remainingNoPreference === 0) {
    return '名額已滿'
  }
  if (remainingNoPreference > 0) {
    return `不限${remainingNoPreference}人`
  } else {
    const result = []
    if (remainingMale > 0) result.push(`男${remainingMale}人`)
    if (remainingFemale > 0) result.push(`女${remainingFemale}人`)
    return result.join(' ')
  }
}

// 應用過濾器
const applyFilters = async () => {
  isFiltered.value = true
  await loadSessions()

  tempFilteredSessions.value = sessions.value
    .filter(session => {
      let isMatch = true

      // 城市過濾
      if (filters.value.city && getVenueCity(session.v_id) !== filters.value.city) {
        isMatch = false
      }

      // 場地過濾
      if (isMatch && filters.value.venueId) {
        const sessionVenueId = session.v_id._id || session.v_id
        if (sessionVenueId !== filters.value.venueId) {
          isMatch = false
        }
      }

      // 日期過濾
      if (isMatch && filters.value.date) {
        const sessionDate = new Date(session.date).toISOString().split('T')[0]
        if (sessionDate !== filters.value.date) {
          isMatch = false
        }
      }

      // 網高過濾
      if (isMatch && filters.value.netheight.length) {
        if (!filters.value.netheight.includes(session.netheight)) {
          isMatch = false
        }
      }

      // 等級過濾
      if (isMatch && filters.value.level && filters.value.level.length) {
        const levelMatch = filters.value.level.some(level => level === session.level)
        if (!levelMatch) {
          isMatch = false
        }
      }

      return isMatch
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date)) // 確保過濾後的結果也按日期排序
}

// 清除過濾條件
const clearFilters = async () => {
  filters.value = {
    city: '',
    venueId: '',
    date: '',
    netheight: [],
    level: []
  }
  isFiltered.value = false
  await loadSessions()
  tempFilteredSessions.value = []
}

// 計算過濾後的場次
const filteredSessions = computed(() => {
  const sessionsToDisplay = isFiltered.value ? tempFilteredSessions.value : sessions.value
  return sessionsToDisplay.sort((a, b) => new Date(a.date) - new Date(b.date))
})

// 場地變更時的處理函數
const onVenueChange = (value) => {
  applyFilters()
}

// 檢查場次是否已滿
const isSessionFull = (session) => {
  const remainingMale = session.male - (session.participantMale || 0)
  const remainingFemale = session.female - (session.participantFemale || 0)
  const remainingNoPreference = session.nopreference - (session.participantNoPreference || 0)
  return remainingMale <= 0 && remainingFemale <= 0 && remainingNoPreference <= 0
}

// 組件卸載前的處理
onBeforeUnmount(() => {
  if (router.currentRoute.value.path === '/member/enrollment') {
    needsRefresh.value = true
  }
})

// 組件掛載時的處理
onMounted(async () => {
  if (needsRefresh.value) {
    await loadSessions()
    needsRefresh.value = false
  } else {
    loadSessions()
    loadVenue()
  }
})

// 定義頁面元數據
definePage({
  meta: {
    title: '場次報名 | VPT',
    login: false,
    admin: false
  }
})
</script>
