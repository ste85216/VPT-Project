<template>
  <v-app-bar height="100">
    <v-container class="d-flex align-center">
      <v-btn id="nav_logo" to="/">
        <img src="../assets/VPT_logo_text.png" height="70"></img>
      </v-btn>
      <v-spacer/>
      <template v-if="mobile">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </template>
      <template v-else>
        <v-btn to="/story">品牌故事</v-btn>
        <v-btn to="/products">所有商品</v-btn>
        <v-btn to="/courtsinfo">球場資訊</v-btn>
        <v-btn to="/signup">場次報名</v-btn>
        <v-btn to="/contactus">聯絡我們</v-btn>
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
