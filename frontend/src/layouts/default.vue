<template>
  <v-navigation-drawer
    v-if="mobile"
    v-model="drawer"
  >
    <v-list class="ps-1 ">
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
              v-if="item.to === '/cart' && user.cart > 0"
              color="error"
              :content="user.cart"
              inline
            />
          </template>
        </v-list-item>
      </template>
      <v-list-item
        v-if="user.isLogin"
        class="mt-5"
        prepend-icon="mdi-account-arrow-right"
        title="登出"
        @click="logout"
      />
    </v-list>
  </v-navigation-drawer>
  <v-app-bar height="100">
    <v-container
      class="d-flex align-center pa-0"
      style="max-width: 1200px;"
    >
      <v-btn
        id="nav_logo"
        to="/"
        :active="false"
      >
        <img
          src="../assets/VPT_logo_text.png"
          height="70"
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
            :class="item.class"
            :ripple="false"
            variant="plain"
            style="opacity: 1;"
            color="#333"
          >
            {{ item.text }}
            <v-badge
              v-if="item.to === '/cart' && user.cart > 0"
              color="red"
              :content="user.cart"
              floating
            />
          </v-btn>
        </template>
        <v-btn
          v-if="user.isLogin"
          class="customBtn"
          prepend-icon="mdi-account-arrow-right"
          @click="logout"
        >
          登出
        </v-btn>
      </template>
    </v-container>
  </v-app-bar>
  <router-view />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'

const { mobile } = useDisplay()
const user = useUserStore()
const createSnackbar = useSnackbar()

const drawer = ref(false)

const navItems = computed(() => {
  return [
    { to: '/story', text: '品牌故事', icon: 'mdi-book-open', show: user.isLogin || !user.isLogin, class: 'customBtn' },
    { to: '/products', text: '所有商品', icon: 'mdi-volleyball', show: user.isLogin || !user.isLogin, class: 'customBtn' },
    { to: '/signup', text: '場次報名', icon: 'mdi-pen', show: user.isLogin || !user.isLogin, class: 'customBtn' },
    { to: '/venues', text: '球場資訊', icon: 'mdi-information', show: user.isLogin || !user.isLogin, class: 'customBtn' },
    { to: '/contact', text: '聯絡我們', icon: 'mdi-phone', show: user.isLogin || !user.isLogin, class: 'customBtn' },
    { to: '/loginregister', text: '登入/註冊', icon: 'mdi-account-plus', show: !user.isLogin, class: 'highlight' },
    { to: '/cart', text: '購物車', icon: 'mdi-cart', show: user.isLogin, class: 'customBtn' },
    { to: '/admin', text: '管理後台', icon: 'mdi-cog', show: user.isLogin && user.isAdmin, class: 'customBtn' }
  ]
})

const logout = async () => {
  await user.logout()
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'success'
    }
  })
}
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
      height: 3px;
      background-color: $primary-color;
      transform: scaleX(0%);
      transform-origin: center;
      transition: 0.6s;
    }
    &:hover::before {
      transform: scaleX(100%);
    }
  }
  .v-btn--active {
    // border: 2px solid $primary-color;
    &::before {
      transform: scaleX(100%);
    }
  }

</style>
