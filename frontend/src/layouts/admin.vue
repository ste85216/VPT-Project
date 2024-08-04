<template>
  <v-app-bar
    height="100"
    fixed
    class="v-toolbar"
  >
    <v-container
      class="d-flex align-center pa-0"
      style="max-width: 1400px;"
    >
      <v-btn
        to="/admin"
        class="logo-btn ps-0"
        text="VPT 管理者後台"
        variant="plain"
        :ripple="false"
      />
    </v-container>
  </v-app-bar>
  <v-container
    class="d-flex align-center "
    style="height:100%;max-width: 1400px;;"
  >
    <v-row style="flex-wrap: nowrap;">
      <v-col
        class="left-navigation"
        style="min-width:200px ;max-width: 240px;"
      >
        <v-list>
          <v-list-item
            :prepend-avatar="avatar"
            :title="user.account"
          />
        </v-list>
        <v-divider />
        <v-list class="h-80 overflow-hidden">
          <v-row class="h-100 d-flex flex-column justify-space-between">
            <v-col>
              <v-list-item
                v-for="items in navItems"
                :key="items.to"
                class="mt-5 v-list-title"
                :to="items.to"
                :prepend-icon="items.icon"
              >
                {{ items.text }}
              </v-list-item>
            </v-col>
            <v-divider class="mt-5" />
            <v-col class="custom-col">
              <v-list-item
                v-for="items in navItems2"
                :key="items.to"
                :to="items.to"
                :prepend-icon="items.icon"
                @click="items.click"
              >
                {{ items.text }}
              </v-list-item>
            </v-col>
          </v-row>
        </v-list>
      </v-col>
      <v-col
        class="main pa-0 ps-6 pe-6"
        style="min-width: 780px;"
      >
        <router-view />
      </v-col>
    </v-row>
    <div id="robot">
      <Vue3Spline
        :scene="{
          url: 'https://prod.spline.design/W8p-HzHioYCMLszD/scene.splinecode',
        }"
      />
    </div>
  </v-container>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import { Vue3Spline } from 'vue3-spline'

const user = useUserStore()
const createSnackbar = useSnackbar()

const logout = async () => {
  await user.logout()
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'success'
    }
  })
}

const navItems = [
  { to: '/admin/administrator', text: '管理者', icon: ' mdi-account-cog' },
  { to: '/admin/member', text: '會員管理', icon: 'mdi-account-details' },
  { to: '/admin/product', text: '商品管理', icon: 'mdi-shopping' },
  { to: '/admin/order', text: '訂單管理', icon: 'mdi-list-box' },
  { to: '/admin/website', text: '網站管理', icon: 'mdi-web' }

]

const navItems2 = [
  { to: '/', text: '前端首頁', icon: 'mdi-home-outline' },
  { to: '/', text: '登出', icon: 'mdi-account-arrow-right', click: logout }
]

const avatar = computed(() => {
  return `https://api.multiavatar.com/${user.account}.png`
})
</script>

<style lang="scss" scoped>
  @import '/src/styles/settings.scss';
  .left-navigation {
    border: 1px solid rgba(0,0,0,0.2);
  }
  .main {
    border: 1px solid rgba(0,0,0,0.2);
    border-left: none;
  }
  .logo-btn {
    height: 80px;
    opacity: 1;
    font-size: 28px;
    font-weight: 500;
    // color: transparent
  }
  .v-toolbar {
    background: #020d2a;
    color: #fff;
  }

  .v-list-item {
    font-size: 14px;
    color: $third-color;
  }

  .custom-col {
    margin-top: 95%;
  }

  #robot {
  width: 20%;
  height: 30%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: transparent;
  pointer-events: none;
}
</style>
