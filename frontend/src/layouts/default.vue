<template>
  <v-navigation-drawer v-if="mobile" v-model="drawer">
    <v-list class="ps-1 ">
      <v-list-item class="mt-3" v-for="item in navItems" :key="item.to" :prepend-icon="item.icon" :to="item.to" :title="item.text"></v-list-item>
      <v-list-item class="mt-3" to="/cart" prepend-icon="mdi-cart">購物車</v-list-item>
      <v-list-item class="mt-3" to="/loginregister" prepend-icon="mdi-account">註冊/登入</v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar height="100">
    <v-container class="d-flex align-center">
      <v-btn id="nav_logo" to="/" :active="false"> 
        <img src="../assets/VPT_logo_text.png" height="70"></img>
      </v-btn>
      <v-spacer/>
      <template v-if="mobile">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </template>
      <template v-else>
        <v-btn v-for="item in navItems" :key="item.to" :to="item.to">{{ item.text }}</v-btn>
        <v-btn to="/cart" icon="mdi-cart"></v-btn>
        <v-btn to="/loginregister" icon="mdi-account"></v-btn>
      </template>
    </v-container>
  </v-app-bar>
    <router-view></router-view>

</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay()

const drawer = ref(false)

const navItems = [
  { to: '/story', text: '品牌故事', icon: 'mdi-book-open' },
  { to: '/products', text: '所有商品', icon: 'mdi-volleyball' },
  { to: '/signup', text: '場次報名', icon: 'mdi-pen' },
  { to: '/venues', text: '球場資訊', icon: 'mdi-information' },
  { to: '/contact', text: '聯絡我們', icon: 'mdi-phone' },
]
</script>

<style lang="scss" scoped>
  * {
    font-family: "";
  }
  #nav_logo {
    height: 70px;
    color: transparent;
  }
</style>
