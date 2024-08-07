<template>
  <v-container>
    <v-row>
      <v-col
        class="pa-0 pt-5"
        cols="6"
      >
        <v-img
          :src="product.images[0]"
          height="500"
          class="rounded-xl elevation-6"
          cover
        />
      </v-col>
      <v-col
        cols="6"
        class="ps-16"
      >
        <v-col>
          <h2>{{ product.name }}</h2>
          <v-sheet>{{ product.description }}</v-sheet>
        </v-col>
        <v-col>
          <h3>尺寸</h3>
          <v-chip-group
            v-model="selectedSize"
            class="pa-0"
            column
          >
            <v-chip
              v-for="(size, index) in product.sizes"
              :key="index"
              :value="size"
            >
              {{ size }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col>
          <h3>顏色</h3>
          <v-chip-group
            v-model="selectedColor"
            class="pa-0"
            column
          >
            <v-chip
              v-for="(color, index) in product.colors"
              :key="index"
              :value="color"
            >
              {{ color }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col class="mb-12">
          <h3>數量</h3>
          <v-btn
            size="x-small"
            icon
            variant="text"
            color="red"
            @click="changeQuantity(-1)"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <span class="px-5">{{ quantity }}</span>
          <v-btn
            size="x-small"
            icon
            variant="text"
            color="#039199"
            @click="changeQuantity(1)"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col class="py-0">
          <v-card-actions
            class="pa-0 "
            justify="center"
          >
            <v-btn
              class="addCart-btn"
              prepend-icon="mdi-cart"
              width="100%"
              @click="addToCart"
            >
              加入購物車
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-col>
    </v-row>
    <v-col cols="12" />
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/axios'
import { definePage } from 'vue-router/auto'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/user'

definePage({
  meta: {
    title: '商品詳情 | VPT',
    login: false,
    admin: false
  }
})

const { apiAuth } = useApi()
const route = useRoute()
const createSnackbar = useSnackbar()
const user = useUserStore()

const product = ref({
  _id: '',
  name: '',
  price: 0,
  images: [],
  sell: true,
  description: '',
  category: '',
  colors: [],
  sizes: []
})

const selectedSize = ref('')
const selectedColor = ref('')
const quantity = ref(1)

const load = async () => {
  try {
    const { data } = await apiAuth.get(`/product/${route.params.id}`)
    product.value = data.result

    // 將顏色和尺寸字符串轉換為陣列（如果必要）
    if (typeof product.value.colors === 'string') {
      product.value.colors = product.value.colors.split(',')
    }
    if (typeof product.value.sizes === 'string') {
      product.value.sizes = product.value.sizes.split(',')
    }

    document.title = `${product.value.name} | VPT`
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}

const changeQuantity = (amount) => {
  quantity.value = Math.max(1, quantity.value + amount)
}

const addToCart = async () => {
  if (!user.isLogin) {
    createSnackbar({
      text: '請先登入',
      snackbarProps: {
        color: 'red'
      }
    })
    return
  }

  if (!selectedSize.value || !selectedColor.value) {
    createSnackbar({
      text: '請選擇尺寸和顏色',
      snackbarProps: {
        color: 'red'
      }
    })
    return
  }

  const newItem = {
    p_id: product.value._id,
    colors: selectedColor.value,
    sizes: selectedSize.value,
    quantity: quantity.value
  }

  try {
    const { data } = await apiAuth.patch('/user/cart', newItem)
    createSnackbar({
      text: '商品已加入購物車',
      snackbarProps: {
        color: 'green'
      }
    })
    if (data.result && Array.isArray(data.result.cart)) {
      user.cart = [...data.result.cart] // 確保賦值新引用，觸發更新
    } else {
      console.error('購物車數據結構錯誤', data.result.cart)
    }
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}

load()

// 監聽購物車變化，確保 V-Badge 更新
watch(() => user.cart, (newCart) => {
  user.cart = newCart
})
</script>

<route lang="yaml">
  meta:
    layout: productdefault
</route>

<style lang="scss" scoped>
@import "@/styles/settings.scss";
h3 {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 12px;
}
.addCart-btn {
  color: $primary-color;
  background: #03919910;
  font-size: 14px;
  border: 1px solid $primary-color;
  font-weight: 500;
  transition: 0.2s;
  &:hover {
    background-color: $primary-color;
    color: #f6f6f6;
  }
}
</style>
