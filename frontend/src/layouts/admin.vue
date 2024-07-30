<template>
  <v-app-bar
    height="100"
    fixed
    class="v-toolbar"
  >
    <v-container
      class="d-flex align-center pa-0 ps-10"
      style="max-width: 1200px;"
    >
      <v-btn
        to="/"
        class="logo-btn"
      >
        <img
          src="../assets/VPT_LOGO_1.png"
          style="height: 50px;"
        >
      </v-btn>
    </v-container>
  </v-app-bar>
  <v-container style="max-width: 1200px; margin-top: 3%;">
    <v-row style="flex-wrap: nowrap;">
      <v-col style="min-width:200px ;max-width: 260px;">
        <v-list>
          <v-list-item
            :prepend-avatar="avatar"
            :title="user.account"
          />
        </v-list>
        <v-divider />
        <v-list>
          <v-list-item
            v-for="items in navItems"
            :key="items.to"
            class="mt-5 v-list-title"
            :to="items.to"
            :prepend-icon="items.icon"
          >
            {{ items.text }}
          </v-list-item>
        </v-list>
      </v-col>
      <v-col>
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const user = useUserStore()

const navItems = [
  { to: '/admin/administrator', text: '管理者', icon: ' mdi-account-cog' },
  { to: '/admin/member', text: '會員管理', icon: 'mdi-account-details' },
  { to: '/admin/product', text: '商品管理', icon: 'mdi-shopping' },
  { to: '/admin/order', text: '訂單管理', icon: 'mdi-list-box' },
  { to: '/admin/website', text: '網站管理', icon: 'mdi-web' }
]

const avatar = computed(() => {
  return `https://api.multiavatar.com/${user.account}.png`
})
</script>

<style lang="scss" scoped>
  @import '/src/styles/settings.scss';
  .logo-btn {
    color: transparent
  }
  .v-toolbar {
    background: $secondary-color;
  }

  .v-list-item {
    font-size: 14px;
    color: $third-color;
  }
</style>
