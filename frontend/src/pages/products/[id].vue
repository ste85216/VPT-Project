<template>
  <v-container>
    <v-row>
      <v-col
        class="pa-0 pt-5 pb-4"
        cols="12"
        sm="6"
      >
        <v-img
          :src="product.images[0]"
          class="rounded-xl elevation-6 product-img"
          cover
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="ps-0 ps-sm-10"
      >
        <v-col>
          <h2>{{ product.name }}</h2>
          <v-sheet class="custom-subtitle mt-2">
            {{ product.description }}
          </v-sheet>
        </v-col>
        <v-col>
          <h3>尺寸</h3>
          <v-chip-group
            v-model="selectedSize"
            class="pa-0"
            column
            filter
          >
            <v-chip
              v-for="(size, index) in product.sizes"
              :key="index"
              :value="size"
              size="large"
              color="teal-lighten-1"
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
            filter
          >
            <v-chip
              v-for="(color, index) in product.colors"
              :key="index"
              :value="color"
              size="large"
              color="teal-lighten-1"
            >
              {{ color }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col class="mb-0 mb-sm-16">
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
              block
              variant="outlined"
              @click="addToCart"
            >
              <div class="d-flex align-center pe-1">
                <CartIcon
                  :size="20"
                />
              </div>
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
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/axios'
import { definePage } from 'vue-router/auto'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import CartIcon from '@/components/CartIcon.vue'

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

    // 發送商品分類信息到父組件
    emit('update:category', product.value.category)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red-lighten-1'
      }
    })
  }
}

onMounted(() => {
  load()
})

// 定義 emits
const emit = defineEmits(['update:category'])

const changeQuantity = (amount) => {
  quantity.value = Math.max(1, quantity.value + amount)
}

const addToCart = async () => {
  if (!user.isLogin) {
    createSnackbar({
      text: '請先登入',
      snackbarProps: {
        color: 'red-lighten-1'
      }
    })
    router.push('/loginregister')
    return
  }

  if (!selectedSize.value || !selectedColor.value) {
    createSnackbar({
      text: '請選擇尺寸和顏色',
      snackbarProps: {
        color: 'red-lighten-1'
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
        color: 'teal-darken-1'
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
        color: 'red-lighten-1'
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

.product-img {
  width: 100%;
  height: 100%;
}

h3 {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 12px;
}
.custom-subtitle {
  font-size: 14px;
  font-weight: 400;
  @include sm {
    font-size: 15px;
  }
  @include md {
    font-size: 16px;
  }
}
.addCart-btn {
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s;
  color: #00897B;
  &:hover {
    background-color: #26A69A;
    color: #f6f6f6;
  }
}
</style>
