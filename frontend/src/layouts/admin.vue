<template>
  <v-app-bar
    height="60"
    fixed
  >
    <v-container
      class="d-flex align-center pa-0 ps-10"
      style="max-width: 100%;"
    >
      <v-btn to="/">
        <img
          src="../assets/VPT_logo_text.png"
          style="height: 40px;"
        >
      </v-btn>
      <v-toolbar-title class="text-center">
        後台管理
      </v-toolbar-title>
    </v-container>
  </v-app-bar>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item
        :prepend-avatar="avatar"
        :title="user.account"
      />
    </v-list>
    <v-divider></v-divider>
    <v-list class="">
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        class="mt-3"
        :to="item.to"
        :title="item.text"
        :prepend-icon="item.icon"
      />
    </v-list>
  </v-navigation-drawer>

  <router-view />
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
