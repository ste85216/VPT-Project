<template>
  <v-container
    fluid
    style="max-width: 1200px;margin-top: 32px;"
  >
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col
            cols="12"
            class="ps-5 pb-10 text-grey-darken-1"
          >
            <h2>零打報名系統</h2>
          </v-col>
          <v-col
            cols="12"
            sm="3"
            class="py-0 px-4"
          >
            <v-form @submit.prevent="applyFilters">
              <v-card
                class="pa-4 card-search"
                elevation="4"
              >
                <v-row no-gutters>
                  <v-col cols="12">
                    <h4 class="title-search py-4 text-grey-darken-3">
                      搜尋篩選
                    </h4>
                  </v-col>
                  <v-col cols="12">
                    <div class="region">
                      地區: <v-select
                        v-model="filters.city"
                        variant="outlined"
                        density="compact"
                        :items="cities"
                      />
                    </div>
                  </v-col>
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
          <v-col
            cols="12"
            sm="9"
            class="elevation-4 rounded-sm pa-8 mt-4 mt-sm-0"
          >
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="12">
                    <h3 class="title-session">
                      場次清單
                    </h3>
                  </v-col>
                  <v-col>
                    <v-sheet
                      v-if="filteredSessions.length === 0"
                      class="text-center"
                    >
                      未搜尋到相關場次
                    </v-sheet>
                    <v-expansion-panels>
                      <v-expansion-panel
                        v-for="(session, index) in filteredSessions"
                        :key="session._id"
                        elevation="0"
                        :style="{ backgroundColor: index % 2 === 0 ? '#f0f0f080' : '#EFEBE9' }"
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
                                    <v-col
                                      cols="4"
                                      sm="2"
                                    >
                                      ${{ session.fee }}/人
                                    </v-col>
                                    <v-col
                                      cols="4"
                                      sm="2"
                                    >
                                      {{ session.note || '無備註' }}
                                    </v-col>
                                    <v-col cols="3">
                                      尚需:{{ formatRemainingPlayers(session) }}
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="3"
                              class="d-flex align-center"
                            >
                              <v-btn
                                size="large"
                                block
                                variant="outlined"
                                color="cyan-darken-3"
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
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog
    v-model="enrollDialog.open"
    max-width="400px"
  >
    <v-card class="px-4 py-5">
      <v-card-title>報名場次</v-card-title>
      <v-card-text class="pa-0">
        <v-list-item>
          <v-list-item-title>球場：{{ enrollDialog.session?.v_id.name }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>日期：{{ formatDate(enrollDialog.session?.date) }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>時段：{{ enrollDialog.session?.time }}</v-list-item-title>
        </v-list-item>
        <v-text-field
          v-if="!enrollDialog.maleDisabled"
          v-model="enrollDialog.male"
          label="男生人數"
          class="px-3 pt-2"
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
          class="px-3 pt-2"
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
          class="px-3 pt-2"
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
        <v-btn
          color="red-lighten-1"
          variant="outlined"
          @click="closeEnrollDialog"
        >
          取消
        </v-btn>
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
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useApi } from '@/composables/axios'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/user'
import { definePage } from 'vue-router/auto'

const { api, apiAuth } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()
const user = useUserStore()

// 城市清單
const cities = [
  '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市',
  '基隆市', '新竹市', '嘉義市', '新竹縣', '苗栗縣', '彰化縣',
  '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣',
  '台東縣', '澎湖縣', '金門縣', '連江縣'
]

const needsRefresh = ref(false)
// 存放所有場次資料
const sessions = ref([])
// 存放球場資料
const venues = ref({})
// 添加 venueOptions
const venueOptions = ref([])
// 過濾條件
const filters = ref({
  city: '',
  venueId: '', // 新增 venueId
  date: '',
  netheight: [],
  level: []
})

// 表示是否已進行過濾的狀態
const isFiltered = ref(false)
// 臨時存放篩選結果
const tempFilteredSessions = ref([])

const enrollDialog = ref({
  open: false,
  session: null,
  male: 0,
  female: 0,
  nopreference: 0
})

const openEnrollDialog = (session) => {
  if (isSessionFull(session)) {
    createSnackbar({
      text: '此場次名額已滿',
      snackbarProps: { color: 'warning' }
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

const validateEnrollment = (male, female, nopreference, session) => {
  console.log('Validating enrollment:', { male, female, nopreference, session })

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

const submitEnrollment = async () => {
  if (!user.token) {
    createSnackbar({
      text: '請先登錄',
      snackbarProps: { color: 'error' }
    })
    return
  }

  const male = !enrollDialog.value.maleDisabled ? parseInt(enrollDialog.value.male) || 0 : 0
  const female = !enrollDialog.value.femaleDisabled ? parseInt(enrollDialog.value.female) || 0 : 0
  const nopreference = !enrollDialog.value.nopreferenceDisabled ? parseInt(enrollDialog.value.nopreference) || 0 : 0
  const session = enrollDialog.value.session

  console.log('Enrollment attempt:', { male, female, nopreference, session })

  if (male + female + nopreference === 0) {
    createSnackbar({
      text: '請至少報名一人',
      snackbarProps: { color: 'error' }
    })
    return
  }

  if (!validateEnrollment(male, female, nopreference, session)) {
    console.log('Validation failed')
    createSnackbar({
      text: `報名人數超過可報名人數，當前剩餘: ${formatRemainingPlayers(session)}`,
      snackbarProps: { color: 'error' }
    })
    return
  }

  try {
    console.log('Sending enrollment request')
    const response = await apiAuth.post('/enrollment', {
      s_id: session._id,
      male,
      female,
      nopreference
    })
    console.log('Enrollment response:', response.data)

    // 更新本地的剩餘名額
    const updatedSession = response.data.result.session // 假設後端返回更新後的場次資訊
    const sessionIndex = sessions.value.findIndex(s => s._id === updatedSession._id)
    if (sessionIndex !== -1) {
      sessions.value[sessionIndex] = { ...sessions.value[sessionIndex], ...updatedSession }
    }

    closeEnrollDialog()
    createSnackbar({
      text: '報名成功',
      snackbarProps: { color: 'success' }
    })
    await loadSessions() // 重新加載場次數據
    router.push('/member/enrollment')
  } catch (error) {
    console.error('Enrollment error:', error)
    createSnackbar({
      text: error?.response?.data?.message || '報名失敗',
      snackbarProps: { color: 'error' }
    })
  }
}

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
    console.log('Sending request with params:', params)
    const { data } = await api.get('/session', { params })
    console.log('Received data:', data)
    if (Array.isArray(data.result)) {
      sessions.value = data.result
      const uniqueVenueIds = [...new Set(sessions.value.map(s => s.v_id.$oid))]
      await Promise.all(uniqueVenueIds.map(loadVenue))
    } else {
      createSnackbar({
        text: '接收到的資料格式不正確',
        snackbarProps: { color: 'red' }
      })
    }
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || '無法加載場次資料',
      snackbarProps: { color: 'red' }
    })
  }
}

// 加載球場資料
const loadVenue = async () => {
  try {
    const { data } = await api.get('/venue')
    const venuesData = data.result.data.map(venue => ({
      id: venue._id.$oid || venue._id,
      name: venue.name,
      city: extractCity(venue.address)
    }))

    venues.value = venuesData.reduce((acc, venue) => {
      acc[venue.id] = venue
      return acc
    }, {})

    venueOptions.value = venuesData
    console.log('Venue options:', venueOptions.value)
  } catch (error) {
    console.error('Error loading venues:', error)
    createSnackbar({
      text: error?.response?.data?.message || '無法加載球場資料',
      snackbarProps: { color: 'red' }
    })
  }
}

// 添加 extractCity 函數
const extractCity = (address) => {
  const addressWithoutPostalCode = address.replace(/^\d{3,5}\s*/, '')
  const cityCountyMatch = addressWithoutPostalCode.match(/^(.+?[市縣])/)
  return cityCountyMatch ? cityCountyMatch[1] : '未知地區'
}

// 返回場地名稱
const getVenueName = (v_id) => {
  const id = v_id._id || v_id
  return venues.value[id]?.name || '未知場地'
}

// 返回場地城市
const getVenueCity = (v_id) => {
  const id = v_id._id || v_id
  return venues.value[id]?.city || '未知地區'
}

// 日期格式化
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW')
}

const formatRemainingPlayers = (session) => {
  console.log('Formatting remaining players:', session)
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

// 過濾場次
const applyFilters = async () => {
  isFiltered.value = true
  await loadSessions()
  console.log('Sessions before filtering:', sessions.value)
  console.log('Current filters:', filters.value)

  tempFilteredSessions.value = sessions.value.filter(session => {
    const v_id = session.v_id._id || session.v_id
    console.log('Checking session:', session)
    console.log('Session v_id:', v_id)
    console.log('Filter venueId:', filters.value.venueId)

    if (filters.value.city && getVenueCity(v_id) !== filters.value.city) {
      console.log('City mismatch')
      return false
    }
    if (filters.value.venueId && v_id !== filters.value.venueId) {
      console.log('Venue mismatch')
      return false
    }
    if (filters.value.netheight.length && !filters.value.netheight.includes(session.netheight)) {
      console.log('Net height mismatch')
      return false
    }
    if (filters.value.level.length && !filters.value.level.includes(session.level)) {
      console.log('Level mismatch')
      return false
    }
    return true
  })

  console.log('Filtered sessions:', tempFilteredSessions.value)
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

// 返回已過濾的場次
const filteredSessions = computed(() => {
  return isFiltered.value ? tempFilteredSessions.value : sessions.value
})

const onVenueChange = (value) => {
  console.log('Selected venue:', value)
  console.log('Current filters:', filters.value)
  applyFilters()
}

const isSessionFull = (session) => {
  const remainingMale = session.male - (session.participantMale || 0)
  const remainingFemale = session.female - (session.participantFemale || 0)
  const remainingNoPreference = session.nopreference - (session.participantNoPreference || 0)
  return remainingMale <= 0 && remainingFemale <= 0 && remainingNoPreference <= 0
}

onBeforeUnmount(() => {
  if (router.currentRoute.value.path === '/member/enrollment') {
    needsRefresh.value = true
  }
})

onMounted(async () => {
  if (needsRefresh.value) {
    await loadSessions()
    needsRefresh.value = false
  } else {
    loadSessions()
    loadVenue()
  }
})

definePage({
  meta: {
    title: '場次報名 | VPT',
    login: false,
    admin: false
  }
})
</script>
