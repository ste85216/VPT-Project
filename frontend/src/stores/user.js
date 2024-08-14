import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole.js'
import { useApi } from '@/composables/axios'

export const useUserStore = defineStore('user', () => {
  const { api, apiAuth } = useApi()

  const token = ref('')
  const account = ref('')
  const role = ref(UserRole.USER)
  const cart = ref([])
  const avatar = ref('')
  const name = ref('')
  const userId = ref('')
  const address = ref('')
  const phone = ref('')
  const email = ref('')
  const birthday = ref('')
  const nickname = ref('')
  const note = ref('')

  const isLogin = computed(() => token.value.length > 0)
  const isAdmin = computed(() => role.value === UserRole.ADMIN)

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
      avatar.value = data.result.avatar
      cart.value = data.result.cart || []
      await loadCart() // 登入後立即載入最新的購物車數據
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
      avatar.value = data.result.avatar
      cart.value = data.result.cart || []
      name.value = data.result.name
      userId.value = data.result.userId
      address.value = data.result.address
      phone.value = data.result.phone
      email.value = data.result.email
      birthday.value = data.result.birthday
      nickname.value = data.result.nickname
    } catch (error) {
      console.log(error)
      token.value = ''
      account.value = ''
      role.value = UserRole.USER
      avatar.value = ''
      cart.value = []
      name.value = ''
      userId.value = ''
      address.value = ''
      phone.value = ''
      email.value = ''
      birthday.value = ''
      nickname.value = ''
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
    avatar.value = ''
    cart.value = []
    userId.value = ''
    window.location.reload()
  }

  const loadCart = async () => {
    if (!isLogin.value) return

    try {
      const { data } = await apiAuth.get('/user/cart')
      cart.value = data.result || []
    } catch (error) {
      console.log(error)
      cart.value = []
    }
  }

  const addCart = async (product, quantity, colors, sizes) => {
    try {
      const { data } = await apiAuth.patch('/user/cart', { p_id: product, quantity, colors, sizes })
      cart.value = data.result || []
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

  const checkout = async (note) => {
    try {
      await apiAuth.post('/order', { note })
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

  const updateProfile = async (profile) => {
    try {
      const { data } = await apiAuth.patch('/user/profile', profile)
      account.value = data.result.account
      role.value = data.result.role
      avatar.value = data.result.avatar
      cart.value = data.result.cart || []
      name.value = data.result.name
      userId.value = data.result.userId
      address.value = data.result.address
      phone.value = data.result.phone
      email.value = data.result.email
      birthday.value = data.result.birthday
      nickname.value = data.result.nickname

      // 返回更新後的數據以便在 Vue 組件中使用
      return data.result
    } catch (error) {
      console.log(error)
    }
  }

  return {
    token,
    account,
    role,
    avatar,
    name,
    nickname,
    userId,
    address,
    phone,
    email,
    birthday,
    cart,
    cartQuantity,
    isLogin,
    isAdmin,
    note,
    updateProfile,
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
