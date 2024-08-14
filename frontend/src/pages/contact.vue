<template>
  <div
    id="waves-container"
    class="text-center"
  >
    <h2 class="contact-title">
      聯絡我們
    </h2>
    <div class="wave wave1" />
    <div class="wave wave2" />
    <div class="wave wave3" />
    <div class="wave wave4" />
  </div>
  <v-container
    class="mt-6 text-center"
    style="max-width: 1200px; height: calc(100% - 70px); top: 70px;"
  >
    <v-row>
      <v-col cols="12">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-space-between"
            >
              <v-card
                width="550"
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
              cols="12"
              class="d-flex justify-space-between"
            >
              <v-card
                width="550"
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
#waves-container {
  position: relative;
  width: 100%;
  height: 15vh;
  // background: #039199e9;
  background: #26A69A;
  overflow: hidden;
  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 85px;
    background: url(/src/assets/wave.png);
    background-size: 1000px 100px;
  }
  .wave1 {
    animation: animate 30s linear infinite;
    z-index: 1000;
    opacity: 1;
    animation-delay: 0s;
    bottom: 0;
  }
  .wave2 {
    animation: animate2 15s linear infinite;
    z-index: 999;
    opacity: 0.5;
    animation-delay: -5s;
    bottom: 5px;
  }
  .wave3 {
    animation: animate 30s linear infinite;
    z-index: 998;
    opacity: 0.2;
    animation-delay: -2s;
    bottom: 8px;
  }
  .wave4 {
    animation: animate2 5s linear infinite;
    z-index: 997;
    opacity: 0.7;
    animation-delay: -5s;
    bottom: 12px;
  }
  @keyframes animate {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 1000px;
    }
  }
  @keyframes animate2 {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: -1000px;
    }
  }
}

.contact-title {
  font-size: 24px;
  color: #fff;
  font-weight: 500;
  line-height: px;
}
.custom-card {
  border-radius: 10px;
  padding: 20px 0;
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

@include sm {
  #waves-container {
    height: 30vh;
  }
  .wave {
    height: 100px;
  }
  .wave2 {
    animation: animate2 15s linear infinite;
    z-index: 999;
    opacity: 0.5;
    animation-delay: -5s;
    bottom: 10px;
  }
  .wave3 {
    animation: animate 30s linear infinite;
    z-index: 998;
    opacity: 0.2;
    animation-delay: -2s;
    bottom: 15px;
  }
  .wave4 {
    animation: animate2 5s linear infinite;
    z-index: 997;
    opacity: 0.7;
    animation-delay: -5s;
    bottom: 25px;
  }
  .contact-title {
    font-size: 32px;
    line-height: 180px;
  }

}
</style>
