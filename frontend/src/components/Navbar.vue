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
        v-if="user.isLogin"
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
  >
    <v-container
      class="d-flex align-center pa-0"
      style="max-width: 1200px;"
    >
      <v-btn
        to="/"
        color="#fff"
        :active="false"
        :ripple="false"
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
            <v-badge
              v-if="item.to === '/cart' && user.cartQuantity > 0"
              color="red"
              :content="user.cartQuantity"
              floating
            />
          </v-btn>
        </template>
        <v-btn
          v-if="user.isLogin && user.isAdmin"
          class="highlight"
          prepend-icon="mdi-cog"
          to="/admin/product"
        >
          進入後台
        </v-btn>
        <v-btn
          v-if="user.isLogin"
          class="highlight"
          prepend-icon="mdi-account-arrow-right"
          @click="logout"
        >
          登出
        </v-btn>
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

console.log(user.cartQuantity)

const currentPath = route.path

const isOnProductsPage = computed(() => currentPath.includes('/products'))

const drawer = ref(false)

const navItems = computed(() => [
  { to: '/story', text: '品牌故事', icon: 'mdi-book-open', show: user.isLogin || !user.isLogin, class: 'customBtn' },
  { to: '/products', text: '所有商品', icon: 'mdi-volleyball', show: user.isLogin || !user.isLogin, class: 'customBtn' },
  { to: '/signup', text: '場次報名', icon: 'mdi-pen', show: user.isLogin || !user.isLogin, class: 'customBtn' },
  { to: '/venues', text: '球場資訊', icon: 'mdi-information', show: user.isLogin || !user.isLogin, class: 'customBtn' },
  { to: '/contact', text: '聯絡我們', icon: 'mdi-phone', show: user.isLogin || !user.isLogin, class: 'customBtn' },
  { to: '/loginregister', text: '登入/註冊', icon: 'mdi-account-plus', show: !user.isLogin, class: 'highlight' },
  { to: '/cart', text: '購物車', icon: 'mdi-cart', show: user.isLogin, class: 'customBtn' }
])

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
    font-family: "";
  }
  #nav_logo {
    height: 70px;
    color: transparent;
  }

  .highlight {
    border: 2px solid rgba(0,0,0,0.2);
    margin-left: 20px;
    &:hover {
      background-color: rgba(0,0,0,0.1);
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
      background-color: $primary-color;
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
</style>
