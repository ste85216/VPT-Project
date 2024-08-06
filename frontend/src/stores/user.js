// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole.js'
import { useApi } from '@/composables/axios'

export const useUserStore = defineStore('user', () => {
  const { api, apiAuth } = useApi()

  const token = ref('')
  const account = ref('')
  const role = ref(UserRole.USER)
  const cart = ref([]) // 確保購物車初始值為數組
  const avatar = ref('') // 確保頭像初始值為空
  const name = ref('') // 確保名稱初始值為空
  const userId = ref('') // 確保ID初始值為空

  const isLogin = computed(() => token.value.length > 0)
  const isAdmin = computed(() => role.value === UserRole.ADMIN)

  // 計算購物車中的總數量
  const cartQuantity = computed(() => {
    return Array.isArray(cart.value) ? cart.value.reduce((total, item) => total + item.quantity, 0) : 0
  })

  const login = async (values) => {
    try {
      const { data } = await api.post('/user/login', {
        account: values.Laccount,
        password: values.Lpassword
      })
      token.value = data.result.token
      account.value = data.result.account
      role.value = data.result.role
      avatar.value = data.result.avatar // 更新頭像
      cart.value = data.result.cart || [] // 確保賦值時是數組
      return '登入成功'
    } catch (error) {
      console.log(error)
      return error?.response?.data?.message || '登入失敗，請稍後再試'
    }
  }

  const profile = async () => {
    if (!isLogin.value) return

    try {
      const { data } = await apiAuth.get('/user/profile')
      account.value = data.result.account
      role.value = data.result.role
      avatar.value = data.result.avatar // 確保更新用戶的頭像URL
      cart.value = data.result.cart || [] // 確保賦值時是數組
      console.log(avatar.value) // 確認 avatar 的值
      name.value = data.result.name // 添加名稱
      userId.value = data.result.userId // 添加ID
    } catch (error) {
      token.value = ''
      account.value = ''
      role.value = UserRole.USER
      avatar.value = '' // 重置頭像URL
      cart.value = [] // 確保重置時是數組
      name.value = '' // 重置名稱
      userId.value = '' // 重置ID
    }
  }

  const logout = async () => {
    try {
      await apiAuth.delete('/user/logout')
    } catch (error) {
      console.log(error)
    }
    token.value = ''
    account.value = ''
    role.value = UserRole.USER
    avatar.value = '' // 重置頭像URL
    cart.value = [] // 確保重置時是數組
    userId.value = '' // 重置ID
    window.location.reload()
  }

  const loadCart = async () => {
    if (!isLogin.value) return

    try {
      const { data } = await apiAuth.get('/user/cart')
      cart.value = data.result || [] // 確保賦值時是數組
    } catch (error) {
      console.log(error)
      cart.value = [] // 確保重置時是數組
    }
  }

  const addCart = async (product, quantity, colors, sizes) => {
    try {
      const { data } = await apiAuth.patch('/user/cart', { p_id: product, quantity, colors, sizes })
      cart.value = data.result || [] // 確保賦值時是數組
      return {
        color: 'green',
        text: '成功'
      }
    } catch (error) {
      return {
        color: 'red',
        text: error?.response?.data?.message || '發生錯誤，請稍後再試'
      }
    }
  }

  const checkout = async () => {
    try {
      await apiAuth.post('/order')
      cart.value = []
      return {
        color: 'green',
        text: '成功'
      }
    } catch (error) {
      return {
        color: 'red',
        text: error?.response?.data?.message || '發生錯誤，請稍後再試'
      }
    }
  }

  return {
    token,
    account,
    role,
    avatar,
    name,
    userId,
    cart,
    cartQuantity,
    isLogin,
    isAdmin,
    login,
    profile,
    logout,
    addCart,
    loadCart,
    checkout
  }
}, {
  persist: {
    key: 'shop',
    paths: ['token']
  }
})
