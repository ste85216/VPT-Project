<template>
  <v-container
    class="mt-8 mb-12"
    style="max-width: 1200px;"
    fluid
  >
    <h2>球場資訊</h2>
    <v-row class="mt-4">
      <div
        class="ps-4"
        style="color: #333; font-size: 16px; font-weight: 500;"
      >
        地區 :
      </div>
    </v-row>
    <v-row>
      <v-col
        cols="5"
        md="3"
      >
        <v-select
          v-model="selectedCity"
          :items="cities"
          variant="outlined"
          density="compact"
          :clearable="!!selectedCity"
          @update:model-value="onCityChange"
          @click:clear="clearCity"
        />
      </v-col>
      <v-spacer />
      <v-col
        cols="5"
        md="3"
      >
        <v-text-field
          v-model="searchQuery"
          label="搜尋"
          append-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          clearable
          @input="debounceSearch"
          @click:clear="clearSearch"
        />
      </v-col>
    </v-row>
    <v-row
      v-if="isLoading"
      justify="center"
      align="center"
      style="height: 200px;"
    >
      <v-col
        cols="12"
        class="text-center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        />
      </v-col>
    </v-row>
    <template v-else>
      <v-row
        v-if="venues.length > 0"
        class="mb-4 "
      >
        <v-col
          v-for="venue in venues"
          :key="venue._id"
          cols="12"
          md="6"
        >
          <VenueCard v-bind="venue" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          cols="12"
          class="text-center"
        >
          <p>沒有找到相關球場</p>
        </v-col>
      </v-row>
      <v-row v-if="pages > 1">
        <v-col cols="12">
          <v-pagination
            v-model="page"
            :length="pages"
            rounded="circle"
            density="compact"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            :total-visible="8"
            color="teal-darken-1"
            @update:model-value="onPageChange"
          />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref, watch } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import VenueCard from '@/components/VenueCard.vue'

definePage({
  meta: {
    title: '球場資訊 | VPT'
  }
})

const { api } = useApi()
const createSnackbar = useSnackbar()

const searchQuery = ref('')
const selectedCity = ref('')
const venues = ref([])
const isLoading = ref(true) // 初始設置為 true

const page = ref(1)
const pages = ref(1)
const ITEMS_PER_PAGE = 10

const cities = [
  '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市',
  '基隆市', '新竹市', '嘉義市', '新竹縣', '苗栗縣', '彰化縣',
  '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣',
  '台東縣', '澎湖縣', '金門縣', '連江縣'
]

const loadVenues = async () => {
  isLoading.value = true
  try {
    const { data } = await api.get('/venue', {
      params: {
        itemsPerPage: ITEMS_PER_PAGE,
        page: page.value,
        search: searchQuery.value,
        city: selectedCity.value
      }
    })
    pages.value = Math.ceil(data.result.total / ITEMS_PER_PAGE)
    venues.value = data.result.data
  } catch (error) {
    console.error('載入球場資訊時發生錯誤:', error)
    createSnackbar({
      text: error?.response?.data?.message || '載入球場資訊時發生錯誤',
      snackbarProps: {
        color: 'error'
      }
    })
    venues.value = []
    pages.value = 1
  } finally {
    isLoading.value = false
  }
}

const debounceSearch = (() => {
  let timer
  return () => {
    isLoading.value = true // 開始搜索時設置 loading
    clearTimeout(timer)
    timer = setTimeout(() => {
      page.value = 1
      loadVenues()
    }, 300)
  }
})()

const clearSearch = () => {
  searchQuery.value = ''
  page.value = 1
  loadVenues()
}

const onCityChange = () => {
  page.value = 1
  loadVenues()
}

const clearCity = () => {
  selectedCity.value = ''
  page.value = 1
  loadVenues()
}

const onPageChange = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  loadVenues()
}

watch(searchQuery, (newValue) => {
  if (newValue === '') {
    page.value = 1
    loadVenues()
  }
})

watch(selectedCity, (newValue) => {
  if (newValue === null) {
    page.value = 1
    loadVenues()
  }
})

// 初始加載
loadVenues()
</script>
