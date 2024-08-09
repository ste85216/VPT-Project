<template>
  <v-container
    fluid
    style="max-width: 1200px;margin-top: 32px;"
  >
    <v-row>
      <v-col
        cols="12"
      >
        <v-row>
          <v-col
            cols="12"
            class="ps-5 pb-10"
          >
            <h2>零打報名系統</h2>
          </v-col>
          <v-col
            cols="12"
            sm="3"
            class="py-0 px-4"
          >
            <v-form>
              <v-card
                class="pa-4 card-search"
                elevation="4"
              >
                <v-row no-gutters>
                  <v-col
                    cols="12"
                  >
                    <h4 class="title-search py-4">
                      搜尋篩選
                    </h4>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <div class="region">
                      地區: <v-select
                        variant="outlined"
                        density="compact"
                        :items="cities"
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
                        filter
                        color="primary"
                        variant="outlined"
                      >
                        <v-chip label>
                          男網
                        </v-chip>
                        <v-chip label>
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
                        filter
                        color="primary"
                        column
                        variant="outlined"
                      >
                        <v-chip label>
                          C
                        </v-chip>
                        <v-chip label>
                          B
                        </v-chip>
                        <v-chip label>
                          B+
                        </v-chip>
                        <v-chip label>
                          A以上
                        </v-chip>
                        <v-chip label>
                          新手友善
                        </v-chip>
                      </v-chip-group>
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    class="my-4"
                  >
                    <v-btn
                      block
                      color="primary"
                      class="mt-4"
                    >
                      搜尋
                    </v-btn>
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
              <v-col
                cols="12"
                sm="4"
                class="ps-2"
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
              <v-divider />
              <v-col cols="12">
                <v-row>
                  <v-col cols="12">
                    <h3 class="title-session">
                      場次清單
                    </h3>
                  </v-col>
                  <v-col>
                    <v-expansion-panels>
                      <v-expansion-panel>
                        <v-expansion-panel-title>
                          <v-row class="text-center">
                            <v-col cols="12">
                              <v-row
                                align="center"
                                justify="center"
                              >
                                <v-col>會原編號</v-col>
                                <v-col>地區</v-col>
                                <v-col>球場</v-col>
                                <v-col>日期</v-col>
                                <v-col cols="2">
                                  時段
                                </v-col>
                                <v-col>網高</v-col>
                                <v-col>程度</v-col>
                              </v-row>
                            </v-col>
                            <v-col class="pe-sm-6">
                              <v-divider />
                            </v-col>
                            <v-col cols="12">
                              <v-row style="line-height: 32px;">
                                <v-col>A0000001</v-col>
                                <v-col>新北市</v-col>
                                <v-col>NVA</v-col>
                                <v-col>2024/08/08</v-col>
                                <v-col cols="2">
                                  12:00-15:00
                                </v-col>
                                <v-col>女網</v-col>
                                <v-col>B</v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-row>
                            <v-col cols="12">
                              <v-row>
                                <v-col
                                  cols="2"
                                >
                                  報名狀態
                                </v-col>
                                <v-col cols="2">
                                  價錢
                                </v-col>
                                <v-col cols="2">
                                  備註
                                </v-col>
                                <v-col />
                              </v-row>
                            </v-col>
                            <v-col cols="12">
                              <v-row>
                                <v-col cols="2">
                                  尚需:2男
                                </v-col>
                                <v-col cols="2">
                                  $280/人
                                </v-col>
                                <v-col cols="2">
                                  開冷氣多加$20/人
                                </v-col>
                                <v-col />
                                <v-col cols="2">
                                  <v-btn>我要報名</v-btn>
                                </v-col>
                              </v-row>
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
</template>

<script setup>
import { definePage } from 'vue-router/auto'

const cities = [
  '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市',
  '基隆市', '新竹市', '嘉義市', '新竹縣', '苗栗縣', '彰化縣',
  '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣',
  '台東縣', '澎湖縣', '金門縣', '連江縣'
]

definePage({
  meta: {
    title: '場次報名 | VPT'
  }
})

</script>
