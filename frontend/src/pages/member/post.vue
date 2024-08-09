<template>
  <v-row class="mt-4">
    <v-col cols="12">
      <v-row>
        <v-col
          cols="12"
          sm="3"
        >
          <h3 class="opacity-90 mb-4">
            刊登場次
          </h3>
        </v-col>
        <v-spacer />
        <v-col
          cols="12"
          sm="3"
        >
          <v-btn
            width="100%"
            elevation="0"
            variant="flat"
            class="post-btn"
          >
            刊登場次
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-divider />
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <v-row class="px-4">
            <v-col>
              球場
            </v-col>
            <v-col>
              日期
            </v-col>
            <v-col>
              時段
            </v-col>
            <v-col>
              網高
            </v-col>
            <v-col>
              程度
            </v-col>
            <v-col>
              人數
            </v-col>
            <v-col>
              費用
            </v-col>
            <v-col>
              備註
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-card
        elevation="4"
        class="pa-4"
      >
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col>
                NVA
              </v-col>
              <v-col>
                2024-12-31
              </v-col>
              <v-col>
                09:00-11:00
              </v-col>
              <v-col>
                男網
              </v-col>
              <v-col>
                B+
              </v-col>
              <v-col>
                男:9 女:9 不限:
              </v-col>
              <v-col>
                240/人
              </v-col>
              <v-col>
                開冷氣+20/人
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '刊登場次 | VPT',
    login: true,
    admin: false
  }
})
</script>

<route lang="yaml">
  meta:
    layout: member
</route>

<style lang="scss" scoped>
  .post-btn {
    background-color: #5e7b88;
    color: white;
    &:hover {
      background-color: #303e44;
    }
  }
</style>
