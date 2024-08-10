<template>
  <v-navigation-drawer
    v-if="mobile"
    v-model="drawer"
  >
    <v-list class="ps-1">
      <template
        v-for="item in navItems"
        :key="item.to"
      >
        <v-list-item
          v-if="item.show"
          class="mt-5"
          :prepend-icon="item.icon"
          :to="item.to"
          :title="item.text"
        >
          <template #append>
            <v-badge
              v-if="item.to === '/cart' && user.cartQuantity > 0"
              color="red"
              :content="user.cartQuantity"
              floating
            />
          </template>
        </v-list-item>
      </template>
      <v-list-item
        v-if="user.isLogin && user.isAdmin"
        class="mt-5"
        prepend-icon="mdi-cog"
        to="/admin/product"
      >
        進入後台
      </v-list-item>
      <v-list-item
        v-if="user.isLogin && user.isAdmin"
        class="mt-5"
        prepend-icon="mdi-account-arrow-right"
        title="登出"
        @click="logout"
      />
    </v-list>
  </v-navigation-drawer>
  <v-app-bar
    height="70"
    app
    color="teal-lighten-1"
    elevation="0"
  >
    <v-container
      class="d-flex align-center pa-0"
      style="max-width: 1200px;"
    >
      <v-btn
        to="/"
        :active="false"
        :ripple="false"
        variant="plain"
        class="opacity-100"
        height="50"
      >
        <img
          src="../assets/VPT_logo_text.png"
          height="50"
        >
      </v-btn>
      <v-spacer />
      <template v-if="mobile">
        <v-app-bar-nav-icon @click="drawer = true" />
      </template>
      <template v-else>
        <template
          v-for="item in navItems"
          :key="item.to"
        >
          <v-btn
            v-if="item.show"
            rounded="0"
            :to="item.to"
            :class="[item.class, { 'v-btn--active': item.to === '/products' && isOnProductsPage }]"
            :ripple="false"
            variant="plain"
            style="opacity: 1;"
            color="#333"
          >
            {{ item.text }}
          </v-btn>
        </template>

        <v-btn
          v-if="user.isLogin && !user.isAdmin"
          class="highlight"
          prepend-icon="mdi-cart"
          to="/cart"
          :active="false"
        >
          購物車
          <v-badge
            v-if="user.isLogin && user.cartQuantity > 0"
            class="custom-badge"
            color="warning"
            :content="user.cartQuantity"
            floating
          />
        </v-btn>
        <v-btn
          v-if="user.isLogin && user.isAdmin"
          class="highlight"
          prepend-icon="mdi-cog"
          to="/admin/product"
        >
          進入後台
        </v-btn>
        <v-btn
          v-if="user.isLogin && user.isAdmin"
          class="highlight"
          prepend-icon="mdi-account-arrow-right"
          @click="logout"
        >
          登出
        </v-btn>
        <v-menu v-if="user.isLogin && !user.isAdmin">
          <template #activator="{props}">
            <v-btn
              v-if="user.isLogin"
              class="highlight"
              prepend-icon="mdi-account"
              v-bind="props"
            >
              會員中心
            </v-btn>
          </template>
          <v-card
            align="center"
            class="pa-0 rounded-b-lg"
          >
            <v-btn
              height="50"
              width="50"
              elevation="0"
              variant="plain"
              :active="false"
              :ripple="false"
              class="rounded-circle mt-8 pa-0 opacity-100"
              to="/member/profile"
            >
              <v-img
                :src="user.avatar"
                class="rounded-circle"
                height="50"
                width="50"
                cover
              />
            </v-btn>
            <v-card-title style="font-size: 16px;">
              {{ user.name }}
            </v-card-title>

            <v-divider class="my-3" />
            <v-list>
              <v-list-item
                v-for="item in memberNavItems"
                :key="item.to"
                :to="item.to"
                :prepend-icon="item.icon"
                :active="false"
                class="mb-1 text-left ps-12"
                style=" width: 250px;;font-size: 14px;"
              >
                {{ item.text }}
              </v-list-item>
              <v-list-item>
                <v-btn
                  elevation="0"
                  class="w-100 my-4 logout-btn"
                  @click="logout"
                >
                  登出
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </template>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRoute } from 'vue-router'

const { mobile } = useDisplay()
const user = useUserStore()
const route = useRoute()
const createSnackbar = useSnackbar()

const currentPath = route.path

const isOnProductsPage = computed(() => currentPath.includes('/products'))

const drawer = ref(false)

const navItems = computed(() => [
  { to: '/story', text: '品牌故事', icon: 'mdi-book-open', show: user.isLogin || !user.isLogin, class: 'customBtn' },
  { to: '/products', text: '所有商品', icon: 'mdi-volleyball', show: user.isLogin || !user.isLogin, class: 'customBtn' },
  { to: '/signup', text: '場次報名', icon: 'mdi-pen', show: user.isLogin || !user.isLogin, class: 'customBtn' },
  { to: '/venues', text: '球場資訊', icon: 'mdi-information', show: user.isLogin || !user.isLogin, class: 'customBtn' },
  { to: '/contact', text: '聯絡我們', icon: 'mdi-phone', show: user.isLogin || !user.isLogin, class: 'customBtn' },
  { to: '/loginregister', text: '登入/註冊', icon: 'mdi-account-plus', show: !user.isLogin, class: 'highlight' }
])

const memberNavItems = [
  { to: '/member/profile', text: '個人資料管理', icon: ' mdi-account-cog' },
  { to: '/member/order', text: '訂單管理', icon: 'mdi-list-box' },
  { to: '/member/enrollment', text: '報名紀錄', icon: 'mdi-volleyball ' },
  { to: '/member/post', text: '刊登場次', icon: 'mdi-post' }
]

const logout = async () => {
  await user.logout()
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'success'
    }
  })
}

// 當用戶登入時載入購物車數據
watch(() => user.isLogin, async (isLogin) => {
  if (isLogin) {
    await user.loadCart()
    await user.profile()
  }
})

// 當組件掛載時載入購物車數據（例如在頁面刷新後）
onMounted(async () => {
  if (user.isLogin) {
    await user.loadCart()
  }
})
</script>

<style lang="scss" scoped>
  @import "@/styles/settings.scss";
  * {
    font-family: "Noto sans tc";
  }
  #nav_logo {
    height: 70px;
    color: transparent;
  }

  .v-btn {
    color: #fff !important;
  }

  .highlight {
    border: 2px solid #fff;
    margin-left: 20px;
    &:hover {
      background-color: teal;
    }
  }

  .customBtn {
    box-shadow: none;
    position: relative;
    color: #333;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #fff;
      transform: scaleX(0%);
      transition: 0.6s;
    }
    &:hover::before {
      transform: scaleX(99.9%);
    }
  }
  .v-btn--active {
    &::before {
      transform: scaleX(99.9%);
    }
  }
  .custom-badge {
    position: absolute;
    top: 6px;
    right: 6px;
  }
  .logout-btn {
    background-color: #78909C;
    &:hover {
      background-color: #455A64;
    }
  }
</style>
