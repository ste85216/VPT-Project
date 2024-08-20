<template>
  <!-- sm以下 -->
  <v-footer
    v-if="!lgAndUp"
    class="bg-blue-grey-darken-3 py-10 ps-sm-16"
  >
    <v-row
      no-gutters
      class="justify-space-between ps-4"
    >
      <v-col
        cols="4"
        sm="3"
        class="text-left"
      >
        <router-link to="/">
          <v-img
            src="/src/assets/VPT_LOGO.png"
            height="70"
            width="85"
          />
        </router-link>
        <v-col
          cols="12"
          class="pa-0 mt-1 mt-sm-2"
        >
          <router-link
            to="#"
            class="icon-link"
          >
            <v-icon
              icon="mdi-facebook"
              size="small"
            />
          </router-link>

          <router-link
            to="#"
            class="icon-link ps-1 ps-sm-2"
          >
            <v-icon
              icon="mdi-instagram"
              size="small"
            />
          </router-link>

          <router-link
            to="#"
            class="icon-link ps-1 ps-sm-2"
          >
            <v-icon
              icon="mdi-twitter"
              size="small"
            />
          </router-link>

          <router-link
            to="#"
            class="icon-link ps-1 ps-sm-2"
          >
            <v-icon
              icon="mdi-youtube"
              size="small"
            />
          </router-link>
        </v-col>
      </v-col>
      <v-col
        cols="6"
        sm="3"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
            class="text-link-title pt-2"
          >
            神裝加持
          </v-col>
          <v-col cols="12">
            <v-row no-gutters="">
              <v-col
                cols="12"
                class="ps-1 ps-sm-0"
              >
                <router-link
                  class="text-link"
                  to="/products"
                >
                  所有商品
                </router-link>
              </v-col>
              <v-col
                cols="12"
                class="ps-1 ps-sm-0"
              >
                <router-link
                  class="text-link"
                  to="#"
                >
                  熱銷商品
                </router-link>
              </v-col>
              <v-col
                cols="12"
                class="ps-1 ps-sm-0"
              >
                <router-link
                  class="text-link"
                  to="#"
                >
                  新品上市
                </router-link>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="6"
        sm="3"
        class="mt-12 mt-sm-0 ps-3 ps-sm-0"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
            class="text-link-title pt-2"
          >
            我想打球
          </v-col>
          <v-col cols="12">
            <v-row no-gutters>
              <v-col
                cols="12"
                class="ps-1 ps-sm-0"
              >
                <router-link
                  class="text-link"
                  to="/signup"
                >
                  場次報名
                </router-link>
              </v-col>
              <v-col
                cols="12"
                class="ps-1 ps-sm-0"
              >
                <router-link
                  class="text-link"
                  to="/venues"
                >
                  球場資訊
                </router-link>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="6"
        sm="3"
        class="mt-12 mt-sm-0"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
            class="text-link-title pt-2"
          >
            請求支援
          </v-col>
          <v-col
            cols="12"
            class="ps-1 ps-sm-0"
          >
            <router-link
              class="text-link"
              to="/contact"
            >
              聯絡我們
            </router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>

  <!-- lg以上 -->
  <v-footer
    v-if="lgAndUp"
    class="pa-0 bg-blue-grey-darken-3 justify-center"
    height="280"
  >
    <v-container
      class="ma-0"
      style="max-width: 1200px;"
    >
      <v-row class="d-flex justify-space-between">
        <v-col
          cols="12"
          sm="2"
        >
          <v-row>
            <v-col cols="10">
              <v-row>
                <v-col
                  cols="10"
                  class="px-0"
                >
                  <h4 class="text-end pe-2">
                    神裝加持
                  </h4>
                </v-col>
                <v-col
                  cols="1"
                  class="px-0"
                >
                  <v-icon
                    icon="mdi-sword"
                    size="small"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              class="d-flex flex-column justify-center"
            >
              <v-btn
                variant="plain"
                to="/products"
                :active="false"
                :ripple="false"
                class="opacity-100"
              >
                所有商品
              </v-btn>
              <v-btn
                variant="plain"
                to="#"
                :active="false"
                :ripple="false"
                class="opacity-100"
              >
                熱銷商品
              </v-btn>
              <v-btn
                variant="plain"
                to="#"
                :active="false"
                :ripple="false"
                class="opacity-100"
              >
                新品上市
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          sm="2"
        >
          <v-row>
            <v-col cols="10">
              <v-row>
                <v-col
                  cols="10"
                  class="px-0"
                >
                  <h4 class="text-end pe-2">
                    我想打球
                  </h4>
                </v-col>
                <v-col
                  cols="1"
                  class="px-0"
                >
                  <v-icon
                    icon="mdi-hand-back-right-outline"
                    size="small"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              class="d-flex flex-column justify-center"
            >
              <v-btn
                variant="plain"
                to="/signup"
                :active="false"
                :ripple="false"
                class="opacity-100"
              >
                場次報名
              </v-btn>
              <v-btn
                variant="plain"
                to="/venues"
                :active="false"
                :ripple="false"
                class="opacity-100"
              >
                球場資訊
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          sm="2"
        >
          <v-row>
            <v-col cols="10">
              <v-row>
                <v-col
                  cols="10"
                  class="px-0"
                >
                  <h4 class="text-end pe-2">
                    請求支援
                  </h4>
                </v-col>
                <v-col
                  cols="1"
                  class="px-0"
                >
                  <v-icon
                    icon="mdi-shield-half-full"
                    size="small"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              class="d-flex justify-center"
            >
              <v-btn
                variant="plain"
                to="/contact"
                :active="false"
                :ripple="false"
                class="opacity-100"
              >
                聯絡我們
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          sm="2"
        >
          <v-row>
            <v-col cols="10">
              <v-row>
                <v-col
                  cols="10"
                  class="px-0"
                >
                  <h4 class="text-end pe-2">
                    關注VPT
                  </h4>
                </v-col>
                <v-col
                  cols="1"
                  class="px-0"
                >
                  <v-icon
                    icon="mdi-heart-plus-outline"
                    size="small"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
            >
              <v-row no-gutters>
                <v-col cols="2" />
                <v-col
                  cols="2"
                  class="me-1 ms-1"
                >
                  <v-btn
                    variant="plain"
                    :ripple="false"
                    class="opacity-100"
                    :active="false"
                  >
                    <v-icon
                      icon="mdi-instagram"
                      size="x-large"
                    />
                  </v-btn>
                </v-col>
                <v-col
                  cols="2"
                  class="me-1"
                >
                  <v-btn
                    variant="plain"
                    :ripple="false"
                    class="opacity-100"
                    :active="false"
                  >
                    <v-icon
                      icon="mdi-facebook"
                      size="x-large"
                    />
                  </v-btn>
                </v-col>
                <v-col
                  cols="2"
                  class="me-1"
                >
                  <v-btn
                    variant="plain"
                    :ripple="false"
                    class="opacity-100"
                    :active="false"
                  >
                    <v-icon
                      icon="mdi-twitter"
                      size="x-large"
                    />
                  </v-btn>
                </v-col>
                <v-col
                  cols="2"
                  class="me-1"
                >
                  <v-btn
                    variant="plain"
                    :ripple="false"
                    class="opacity-100"
                    :active="false"
                  >
                    <v-icon
                      icon="mdi-youtube"
                      size="x-large"
                    />
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          sm="3"
          class="d-flex justify-center"
        >
          <v-btn
            variant="plain"
            class="opacity-100"
            :active="false"
            :ripple="false"
            to="/"
          >
            <v-img
              src="/src/assets/VPT_LOGO_1.png"
              width="120"
            />
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { lgAndUp } = useDisplay()
</script>

<style lang="scss" scoped>
.v-btn {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 400;
  text-transform: none;
  padding: 0;
  margin: 0;
  &:hover {
    color: #64FFDA;
  }
}

.icon-link {
  color: #fff;
  font-size: 1rem;
  &:hover {
    color: #64FFDA;
  }
}

.text-link-title {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.text-link {
  text-decoration: none;
  color: #ffffffab;
  font-size: 12px;
  padding-right: 50px;
  &:hover {
    color: #64FFDA;
  }
}
</style>
