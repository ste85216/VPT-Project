<template>
  <div style="width: 100%; height: 100%;background-color: #fafdf7;">
    <v-container
      fluid
      class="pa-0"
      style="max-width: 1180px;"
    >
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              class="pt-5 ps-0"
            >
              <h1 class="title1">
                正因為沒有翅膀<br>所以人們才去尋找<br>飛翔的方法
              </h1>
              <p class="p1 mt-4">
                每一次跳躍都是對夢想的不懈追求 <br>以團結和汗水編織出一片屬於我們的天空
              </p>
              <v-btn
                class="text-none mt-8 bt1"
                color="teal-lighten-1"
                size="x-large"
                variant="flat"
                rounded="0"
                to="/products"
              >
                飛得更高
              </v-btn>
              <v-btn
                class="text-none ml-2 text-teal-lighten-1 mt-8"
                size="x-large"
                variant="flat"
                rounded="0"
                to="/signup"
              >
                一起飛翔
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="pt-0"
            >
              <v-img
                src="../assets/home01.webp"
                class="img1"
                max-height="500px"
                cover
                position="center top"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          class="mt-16"
        >
          <h4 class="text-center text-teal-lighten-1">
            Equipment
          </h4>
          <h1 class="text-center mb-8">
            高手必備
          </h1>
          <v-row justify="space-evenly">
            <v-col
              cols="12"
            >
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                >
                  <v-hover
                    v-slot=" {isHovering, props}"
                  >
                    <v-card
                      :elevation="isHovering ? 12: 2"
                      :class="{'on-hover':isHovering}"
                      v-bind="props"
                      class="card1"
                      to="/products/socks"
                    >
                      <v-img
                        src="/src/assets/products/球襪02.webp"
                        cover
                        height="500px"
                        fill-height
                      >
                        <div class="d-flex flex-row-reverse">
                          <v-btn
                            class="text-none me-2 mt-2"
                            color="teal-lighten-1"
                            size="x-large"
                            variant="flat"
                            rounded="0"
                            elevation="12"
                          >
                            立即裝備
                          </v-btn>
                        </div>
                        <div class="text-white top pa-4">
                          <h1 class="mt-4">
                            VPT機能排球襪
                          </h1>
                          <div>
                            <p class="ma-0 text-body-1 font-weight-bold">
                              $350起
                            </p>
                          </div>
                        </div>
                      </v-img>
                    </v-card>
                  </v-hover>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  class="d-flex flex-column"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                    >
                      <v-hover
                        v-slot=" {isHovering, props}"
                      >
                        <v-card
                          :elevation="isHovering ? 12 : 2"
                          :class="{'on-hover':isHovering}"
                          v-bind="props"
                          class="card1"
                          height="100%"
                          to="/products/balls"
                        >
                          <v-img
                            src="/src/assets/products/排球03.webp"
                            cover
                            height="238"
                          >
                            <div class="d-flex flex-row-reverse">
                              <v-btn
                                class="text-none me-2 mt-2"
                                color="teal-lighten-1"
                                size="x-large"
                                variant="flat"
                                rounded="0"
                                elevation="12"
                              >
                                選對武器
                              </v-btn>
                            </div>
                            <div class="text-white">
                              <h1 class="ms-6 mt-16">
                                VPT排球
                              </h1>
                              <div>
                                <p class="ms-6 text-body-1 font-weight-bold">
                                  $380起
                                </p>
                              </div>
                            </div>
                          </v-img>
                        </v-card>
                      </v-hover>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                    >
                      <v-hover
                        v-slot=" {isHovering, props}"
                      >
                        <v-card
                          :elevation="isHovering ? 12 : 2"
                          :class="{'on-hover':isHovering}"
                          v-bind="props"
                          class="card1"
                          height="100%"
                          to="/products/shoes"
                        >
                          <v-img
                            src="/src/assets/products/球鞋01.webp"
                            height="238"
                            cover
                            class="d-flex "
                          >
                            <div class="d-flex flex-row-reverse">
                              <v-btn
                                class="text-none me-2 mt-2"
                                color="teal-lighten-1"
                                size="x-large"
                                variant="flat"
                                rounded="0"
                                elevation="12"
                              >
                                有如神助
                              </v-btn>
                            </div>
                            <div class="text-white">
                              <h1 class=" ms-6 mt-16">
                                VPT排球鞋
                              </h1>
                              <div>
                                <p class="ms-6 text-body-1 font-weight-bold">
                                  $1500起
                                </p>
                              </div>
                            </div>
                          </v-img>
                        </v-card>
                      </v-hover>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                >
                  <v-hover
                    v-slot=" {isHovering, props}"
                  >
                    <v-card
                      :elevation="isHovering ? 12: 2"
                      :class="{'on-hover':isHovering}"
                      v-bind="props"
                      class="card1"
                      to="/products/shirts"
                    >
                      <v-img
                        src="/src/assets/products/球衣01.webp"
                        cover
                        height="500"
                      >
                        <div class="d-flex flex-row-reverse">
                          <v-btn
                            class="text-none me-2 mt-2"
                            color="teal-lighten-1"
                            size="x-large"
                            variant="flat"
                            rounded="0"
                            elevation="12"
                          >
                            輕盈涼爽
                          </v-btn>
                        </div>
                        <div class="text-white top pa-4">
                          <h1 class="mt-4">
                            VPT透氣排球衣
                          </h1>
                          <div>
                            <p class="ma-0 text-body-1 font-weight-bold">
                              $500起
                            </p>
                          </div>
                        </div>
                      </v-img>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
// import { Vue3Spline } from 'vue3-spline'

definePage({
  meta: {
    title: 'VPT' // 這裡的 title 會被設定到 <title> 標籤
  }
})
</script>

<style lang="scss" scoped>
*{
  font-family: "Noto Sans TC", sans-serif;
}

.title1 {
  color:#1F3347;
  font-size: 48px;
  margin-left: 12px;
  margin-top: 70px;
  line-height: 80px;
}
.p1 {
  color: #1b2d3f90 ;
  margin-left: 12px;
}
.bt1 {
  margin-left: 12px;
}

.v-card.card1 {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out; /* 添加 transform 過渡效果 */

}

.v-card.card1.on-hover {
  opacity: 1; /* 提高 hover 時的透明度 */
  transform: scale(1.05); /* 放大 hover 時的卡片 */
}

.v-card.card1:not(.on-hover) {
  opacity: 0.7; /* 正常狀態的透明度 */
}

.show-btns {
  color: rgba(255,255,255,1) !important;
}

.top {
  margin-top: 300px;
  margin-left: 20px;
}

</style>
