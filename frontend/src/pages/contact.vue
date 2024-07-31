<template>
  <div id="background-contact" />
  <v-container
    class="mt-6 text-center"
    style="max-width: 1200px; height: calc(100% - 70px); top: 70px;"
  >
    <v-row>
      <v-col cols="12">
        <h2>聯絡我們</h2>
      </v-col>
      <v-col cols="12">
        <v-container>
          <v-row>
            <v-col
              cols="6"
              class="d-flex justify-center"
            >
              <v-card
                width="350"
                class="text-center border custom-card"
                elevation="4"
                :ripple="false"
                @click="emailAlert"
              >
                <v-card-title class="custom-title">
                  電子信箱
                </v-card-title>
                <v-card-text>
                  <v-img
                    src="/src/assets/icon/Email.png"
                    height="70"
                    class="mb-6 mt-6"
                  />
                  <p>https://tkyhkm.wda.gov.tw</p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="6"
              class="d-flex justify-center"
            >
              <v-card
                width="350"
                class="text-center border custom-card"
                elevation="4"
              >
                <v-card-title class="custom-title">
                  客服專線
                </v-card-title>
                <v-card-text>
                  <v-img
                    src="/src/assets/icon/Phone.png"
                    height="70"
                    class="mt-6"
                  />
                  <v-divider class="mt-5 mb-5" />
                  <p>(02)2901-8274</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '聯絡我們 | VPT'
  }
})

const emailAlert = () => {
  window.alert('感謝您的來信，我們將盡快回覆您！')
}
</script>

<style lang="scss" scoped>
@import "/src/styles/settings.scss";
#background-contact {
  background: $primary-color;
  height: 600px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}

.custom-card {
  border-radius: 24px;
  .custom-title {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  letter-spacing: 4px;
  }
  p {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }

  &:hover {
    background: $third-color;
    .v-img {
      filter: saturate(200%);}
    .custom-title {
      color: #fff;
    }
    p {
      color: #fff;
    };
  }
}
</style>
