<template>
  <v-navigation-drawer
    v-if="!mdAndUp"
    v-model="drawer"
    class="custom-drawer overflow-hidden border-0"
    temporary
    style="color:#263238"
  >
    <!-- 這邊等等要寫v-if -->
    <div class="drawer-content">
      <v-row>
        <v-col
          cols="12"
          class="pb-1"
        >
          <v-list
            v-if="isLogin && !user.isAdmin"
            class="pa-0"
            density="compact"
          >
            <div style="background-image: url(/src/assets/drawer_bg2.webp); background-size:380px 250px; background-position: bottom left">
              <v-list-item class="px-6 pa-4">
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="12"
                    style="height: 80px;"
                  >
                    <v-img
                      :src="user.avatar"
                      class="rounded-circle elevation-4"
                      height="60"
                      width="60"
                      cover
                    />
                  </v-col>
                  <v-col
                    cols="3"
                    class="d-flex align-center justify-center"
                  >
                    <p class="p1 enhanced-text">
                      嗨 !
                    </p>
                  </v-col>
                  <v-col
                    cols="7"
                  >
                    <h4 class="drawer-name enhanced-text">
                      {{ user.name }}
                    </h4>
                  </v-col>
                </v-row>
              </v-list-item>
            </div>
            <v-list-group
              v-model="isMemberCenterOpen"
              class="mt-2"
            >
              <template #activator="{props}">
                <v-list-item
                  v-bind="props"
                  class="custom-list-item"
                  prepend-icon="mdi-account"
                  style="font-size: 15px;"
                >
                  會員中心
                </v-list-item>
              </template>
              <v-list-item
                v-for="memberNavitem in memberNavItems"
                :key="memberNavitem.to"
                :to="memberNavitem.to"
                :prepend-icon="memberNavitem.icon"
                :active="false"
                class="mt-2"
                style="font-size: 14px;"
              >
                {{ memberNavitem.text }}
              </v-list-item>
            </v-list-group>
          </v-list>
          <v-list
            v-if="isLogin && user.isAdmin"
            class="pa-0"
            density="compact"
          >
            <div style="background-image: url(/src/assets/drawer_bg_admin.webp); background-size:380px 250px; background-position: bottom left">
              <v-list-item class="px-6 pa-4">
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="7"
                  >
                    <h4 class="drawer-name-admin">
                      管理者{{ user.account }}
                    </h4>
                  </v-col>
                </v-row>
              </v-list-item>
            </div>
          </v-list>
          <v-list
            v-if="!isLogin && !user.isAdmin"
            class="pa-0"
          >
            <div
              class="text-white d-flex align-center justify-center"
              style="font-size: 16px; line-height: 32px; font-weight: 600; letter-spacing: 2px; height: 120px;
              background-image: url(/src/assets/men.jpg);background-size: cover; text-shadow: 0 0 10px rgba(0,0,0,1);"
            >
              今天是個適合加入<br>VPT的好日子呢!
            </div>
          </v-list>
        </v-col>
        <v-divider v-if="isLogin && !user.isAdmin" />
        <v-col
          cols="12"
          class="py-0"
        >
          <v-list
            density="compact"
          >
            <v-list-group
              v-model="isProductOpen"
            >
              <template #activator="{props}">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-volleyball"
                  style="font-size: 15px; pointer-events: auto;"
                  density="compact"
                >
                  <router-link
                    to="/products"
                    class="product-link"
                  >
                    所有商品
                  </router-link>
                </v-list-item>
              </template>
              <v-list-item
                v-for="productNavitem in productNavItems"
                :key="productNavitem.to"
                :to="productNavitem.to"
                :active="false"
                style="font-size: 14px;"
              >
                <span>&nbsp;&nbsp;&nbsp;</span>{{ productNavitem.title }}
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-col>
        <v-divider />
        <v-col
          cols="12"
          class="pa-0"
        >
          <v-list class="ps-1">
            <template
              v-for="item in drawerItems"
              :key="item.to"
            >
              <v-list-item
                v-if="item.show"
                class="mt-2 px-7"
                :prepend-icon="item.icon"
                :to="item.to"
                :active="false"
                style="font-size: 15px;"
              >
                {{ item.text }}
                <template #append>
                  <v-badge
                    v-if="item.to === '/cart' && cartQuantity > 0"
                    color="red"
                    :content="cartQuantity"
                    floating
                  />
                </template>
              </v-list-item>
            </template>
            <v-divider class="mt-4" />
            <v-list-item
              v-if="isLogin && user.isAdmin"
              class="mt-3 px-7"
              prepend-icon="mdi-cog"
              style="font-size: 15px;"
              to="/admin/product"
            >
              進入後台
            </v-list-item>
            <v-list-item
              v-if="!isLogin"
              class="mt-3 px-7"
              to="/loginregister"
              prepend-icon="mdi-account-plus"
              style="font-size: 15px;"
            >
              註冊/登入
            </v-list-item>
            <v-list-item
              v-if="isLogin"
              class="mt-3 px-7"
              prepend-icon="mdi-account-arrow-right"
              style="font-size: 15px;"
              @click="logout"
            >
              登出
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </div>
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

      <template v-if="!mdAndUp">
        <v-btn
          v-if="isLogin && !user.isAdmin"
          size="x-small"
          to="/cart"
          variant="plain"
          class="opacity-100"
          :ripple="false"
          style="height: 24px;"
        >
          <CartIcon />
          <v-badge
            v-if="isLogin && cartQuantity > 0"
            color="warning"
            offset-y="-12"
            :content="cartQuantity"
          />
        </v-btn>
        <v-app-bar-nav-icon
          class="me-1 pe-0"
          @click="drawer = true"
        />
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
          v-if="isLogin && !user.isAdmin"
          class="highlight"
          prepend-icon="mdi-cart"
          to="/cart"
          :active="false"
        >
          購物車
          <v-badge
            v-if="isLogin && cartQuantity > 0"
            class="custom-badge"
            color="warning"
            :content="cartQuantity"
            floating
          />
        </v-btn>
        <v-btn
          v-if="isLogin && user.isAdmin"
          class="highlight"
          prepend-icon="mdi-cog"
          to="/admin/product"
        >
          進入後台
        </v-btn>
        <v-btn
          v-if="isLogin && user.isAdmin"
          class="highlight"
          prepend-icon="mdi-account-arrow-right"
          @click="logout"
        >
          登出
        </v-btn>
        <v-menu v-if="isLogin && !user.isAdmin">
          <template #activator="{props}">
            <v-btn
              v-if="isLogin"
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
import CartIcon from '@/components/CartIcon.vue'
import { storeToRefs } from 'pinia'

const { mdAndUp } = useDisplay()
const user = useUserStore()
const route = useRoute()
const createSnackbar = useSnackbar()
const { cartQuantity, isLogin } = storeToRefs(user)

const currentPath = computed(() => route.path)
const isOnProductsPage = computed(() => currentPath.value.includes('/products'))

const drawer = ref(false)
const isMemberCenterOpen = ref(false)
const isProductOpen = ref(true)

const navItems = computed(() => [
  { to: '/story', text: '品牌故事', icon: 'mdi-book-open', show: true, class: 'customBtn' },
  { to: '/signup', text: '場次報名', icon: 'mdi-pen', show: true, class: 'customBtn' },
  { to: '/venues', text: '球場資訊', icon: 'mdi-information-outline', show: true, class: 'customBtn' },
  { to: '/products', text: '所有商品', icon: 'mdi-shopping', show: true, class: 'customBtn' },
  { to: '/contact', text: '聯絡我們', icon: 'mdi-phone', show: true, class: 'customBtn' },
  { to: '/loginregister', text: '登入/註冊', icon: 'mdi-account-plus', show: !isLogin.value, class: 'highlight' }
])

const drawerItems = [
  { to: '/story', text: '品牌故事', icon: 'mdi-book-open', show: true, class: 'customBtn' },
  { to: '/signup', text: '場次報名', icon: 'mdi-pen', show: true, class: 'customBtn' },
  { to: '/venues', text: '球場資訊', icon: 'mdi-information-outline', show: true, class: 'customBtn' },
  { to: '/contact', text: '聯絡我們', icon: 'mdi-phone', show: true, class: 'customBtn' }
]

const memberNavItems = [
  { to: '/member/profile', text: '個人資料管理', icon: ' mdi-account-cog' },
  { to: '/member/order', text: '訂單管理', icon: 'mdi-list-box' },
  { to: '/member/enrollment', text: '報名紀錄', icon: 'mdi-volleyball ' },
  { to: '/member/post', text: '刊登場次', icon: 'mdi-post' }
]

const productNavItems = [
  { title: '球衣', to: '/products/shirts' },
  { title: '球褲', to: '/products/pants' },
  { title: '排球', to: '/products/balls' },
  { title: '球鞋', to: '/products/shoes' },
  { title: '球襪', to: '/products/socks' },
  { title: '護具', to: '/products/protection' },
  { title: '其他', to: '/products/others' }
]

const logout = async () => {
  await user.logout()
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'teal-darken-1'
    }
  })
}

const loadUserData = async () => {
  if (isLogin.value) {
    try {
      await Promise.all([user.profile(), user.loadCart()])
    } catch (error) {
      console.error('加載用戶數據失敗', error)
      createSnackbar({
        text: '加載用戶數據失敗，請稍後再試',
        snackbarProps: {
          color: 'error'
        }
      })
    }
  }
}

// 監聽登入狀態和路由變化
watch([isLogin, currentPath], async ([newIsLogin]) => {
  if (newIsLogin) {
    await loadUserData()
  }
}, { immediate: true })

// 組件掛載時載入用戶數據
onMounted(loadUserData)
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

  .custom-drawer {
    border-radius: 0 20px 20px 0;
    display: flex;
    flex-direction: column;
  }

  :deep(.v-navigation-drawer__content) {
    flex-grow: 1;
    overflow-y: auto;
    scrollbar-width: none;  /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  .drawer-name {
    font-size: 18px;
    letter-spacing: 4px;
    text-shadow: 0 0 4px rgba(255,255,255,1);
  }
  .drawer-name-admin {
    font-size: 18px;
    letter-spacing: 3px;
    font-weight: 500;
    color: #fff;
    text-shadow: 0 0 4px rgba(0,0,0,1);
  }
  .p1 {
    font-size: 18px;
    letter-spacing: 2px;
  }

  .enhanced-text {
    text-shadow:
      -1px -1px 0 #fff,
      1px -1px 0 #fff,
      -1px  1px 0 #fff,
      1px  1px 0 #fff,
       0    0   5px #fff; /* adds a soft glow */
    font-weight: 700; /* makes the font bolder */
    padding: 2px 4px; /* adds some padding around the text */
    background: rgba(255,255,255,0.5);
    border-radius: 20px; /* rounds the corners of the background */
  }

  .product-link {
    text-decoration: none;
    color: #263238;
  }
</style>
