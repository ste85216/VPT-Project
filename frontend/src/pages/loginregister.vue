<template>
  <div
    id="background"
    class="d-flex justify-center align-center"
  >
    <v-container
      id="login-register"
      class="d-flex justify-center align-center"
    >
      <v-container
        class="login wrapper d-flex align-center justify-center ps-8 pe-8"
        style="height: 400px; margin-right: 20px;"
      >
        <v-row>
          <v-col cols="12">
            <div class="title text-center">
              登入
            </div>
          </v-col>
          <v-col cols="12">
            <v-form
              :disabled="isLoginSubmitting"
              @submit.prevent="loginSubmit"
            >
              <v-text-field
                v-model="Laccount.value.value"
                :error-messages="Laccount.errorMessage.value"
                label="帳號"
                variant="outlined"
                density="compact"
                min-length="4"
                maxlength="20"
                clearable
              />
              <v-text-field
                v-model="Lpassword.value.value"
                :error-messages="Lpassword.errorMessage.value"
                class="mt-4"
                label="密碼"
                type="password"
                variant="outlined"
                density="compact"
                min-length="4"
                maxlength="20"
                clearable
              />
              <v-container class=" pa-0">
                <a
                  class="forget"
                  href=""
                >忘記密碼?</a>
              </v-container>
              <v-btn
                class="mt-4"
                type="submit"
                block
                :loading="isLoginSubmitting"
              >
                登入
              </v-btn>
              <v-container class="signup mt-4">
                <v-row class="d-flex justify-end ">
                  <v-col
                    cols="auto"
                    class="pa-0"
                  >
                    還沒有VPT帳號?
                  </v-col>
                  <v-col
                    cols="auto"
                    class="pa-0"
                  >
                    <div
                      id="showRegister"
                      class="ms-3 link"
                      @click="showRegister"
                    >
                      立即加入會員
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
      <v-container
        class="register wrapper ps-8 pe-8 pt-8"
        style="height: 750px;"
      >
        <v-row>
          <v-col cols="12">
            <div class="title text-center">
              立即註冊
            </div>
          </v-col>
          <v-col cols="12">
            <v-form
              :disabled="isRegisterSubmitting"
              @submit.prevent="registerSubmit"
            >
              <v-text-field
                v-model="Raccount.value.value"
                :error-messages="Raccount.errorMessage.value"
                label="帳號"
                variant="outlined"
                density="compact"
                min-length="4"
                maxlength="20"
                clearable
              />
              <v-text-field
                v-model="name.value.value"
                :error-messages="name.errorMessage.value"
                class="mt-2"
                label="姓名"
                type="text"
                variant="outlined"
                density="compact"
                min-length="4"
                maxlength="20"
                clearable
              />
              <v-text-field
                v-model="nickname.value.value"
                :error-messages="nickname.errorMessage.value"
                class="mt-2"
                label="暱稱"
                type="text"
                variant="outlined"
                density="compact"
                min-length="4"
                maxlength="20"
                clearable
              />
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                class="mt-2"
                label="email"
                type="email"
                variant="outlined"
                density="compact"
                min-length="4"
                maxlength="20"
                clearable
              />
              <v-text-field
                v-model="phone.value.value"
                :error-messages="phone.errorMessage.value"
                class="mt-2"
                label="手機號碼"
                type="text"
                variant="outlined"
                density="compact"
                min-length="10"
                maxlength="10"
                clearable
              />
              <v-text-field
                v-model="birthday.value.value"
                :error-messages="birthday.errorMessage.value"
                class="mt-2"
                label="生日"
                type="date"
                variant="outlined"
                density="compact"
                min-length="4"
                maxlength="20"
                clearable
              />
              <v-text-field
                v-model="Rpassword.value.value"
                :error-messages="Rpassword.errorMessage.value"
                class="mt-2"
                label="密碼"
                type="password"
                variant="outlined"
                density="compact"
                min-length="4"
                maxlength="20"
                clearable
              />
              <v-text-field
                v-model="passwordConfirm.value.value"
                :error-messages="passwordConfirm.errorMessage.value"
                class="mt-2"
                label="確認密碼"
                type="password"
                variant="outlined"
                density="compact"
                min-length="4"
                maxlength="20"
                clearable
              />
              <v-btn
                class="mt-4"
                type="submit"
                block
                :loading="isRegisterSubmitting"
              >
                註冊
              </v-btn>
              <v-container class="signup mt-4 mb-4">
                <v-row class="d-flex justify-end ">
                  <v-col
                    cols="auto"
                    class="pa-0"
                  >
                    已經有VPT帳號?
                  </v-col>
                  <v-col
                    cols="auto"
                    class="pa-0"
                  >
                    <div
                      id="showLogin"
                      class="ms-3 link"
                      @click="showLogin"
                    >
                      登入
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script setup>
import validator from 'validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { definePage } from 'vue-router/auto'
import { useUserStore } from '@/stores/user'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

definePage({
  meta: {
    title: '登入註冊 | VPT' // 這裡的 title 會被設定到 <title> 標籤
  }
})

const { api } = useApi()
const router = useRouter()
const user = useUserStore()
const createSnackbar = useSnackbar()

const showRegister = () => {
  const login = document.querySelector('.login')
  const register = document.querySelector('.register')
  const loginRegister = document.querySelector('#login-register')
  loginRegister.style.height = '800px'
  login.style.transform = 'translateX(-420px)'
  register.style.transform = 'translateX(-420px)'
  resetLoginForm()
}

const showLogin = () => {
  const login = document.querySelector('.login')
  const register = document.querySelector('.register')
  const loginRegister = document.querySelector('#login-register')
  loginRegister.style.height = '440px'
  login.style.transform = 'translateX(0)'
  register.style.transform = 'translateX(0)'
  resetRegisterForm()
}
const loginSchema = yup.object({
  Laccount: yup
    .string()
    .required('請輸入帳號')
    .min(4, '帳號長度不符')
    .max(20, '帳號長度不符')
    .test(
      'isAlphanumeric', '帳號只能輸入英數字',
      (value) => {
        return validator.isAlphanumeric(value)
      }
    ),
  Lpassword: yup
    .string()
    .required('請輸入密碼')
})

const registerSchema = yup.object({
  Raccount: yup
    .string()
    .required('請輸入帳號')
    .min(4, '帳號至少需輸入8個字')
    .max(20, '帳號長度不得超過20個字')
    .test(
      'isAlphanumeric', '帳號只能輸入英數字',
      (value) => {
        return validator.isAlphanumeric(value)
      }
    ),
  Rpassword: yup
    .string()
    .required('請輸入密碼')
    .min(8, '密碼至少需輸入8個字'),
  passwordConfirm: yup
    .string()
    .required('請再次輸入密碼')
    .oneOf([yup.ref('Rpassword')], '密碼不一致'),
  name: yup
    .string()
    .required('請輸入姓名'),
  nickname: yup
    .string()
    .required('請輸入暱稱'),
  email: yup
    .string()
    .required('請輸入信箱')
    .test(
      'isEmail', '請輸入正確的信箱格式',
      (value) => {
        return validator.isEmail(value)
      }
    ),
  phone: yup
    .string()
    .required('請輸入手機號碼')
    .min(10, '請輸入10碼手機號碼')
    .test(
      'isMobilePhone', '請輸入正確的手機號碼格式',
      (value) => {
        return validator.isMobilePhone(value)
      }
    ),
  birthday: yup
    .string()
    .required('請輸入生日')
    .test(
      'isDate', '請輸入正確的日期格式',
      (value) => {
        return validator.isDate(value)
      }
    )
})

const { handleSubmit: handleRegisterSubmit, isSubmitting: isRegisterSubmitting, resetForm: resetRegisterForm } = useForm({
  validationSchema: registerSchema
})

const Raccount = useField('Raccount')
const Rpassword = useField('Rpassword')
const passwordConfirm = useField('passwordConfirm')
const name = useField('name')
const nickname = useField('nickname')
const email = useField('email')
const phone = useField('phone')
const birthday = useField('birthday')

const { handleSubmit: handleLoginSubmit, isSubmitting: isLoginSubmitting, resetForm: resetLoginForm } = useForm({
  validationSchema: loginSchema
})

const Laccount = useField('Laccount')
const Lpassword = useField('Lpassword')

const registerSubmit = handleRegisterSubmit(async (values) => {
  const onRegisterSuccess = () => {
  // 註冊成功後的其他邏輯
    setTimeout(() => {
      window.location.reload()
    }, 1500) // 延遲 2 秒
  }
  try {
    await api.post('/user', {
      account: values.Raccount,
      password: values.Rpassword,
      name: values.name,
      nickname: values.nickname,
      email: values.email,
      phone: values.phone,
      birthday: values.birthday
    })
    createSnackbar({
      text: '註冊成功',
      snackbarProps: {
        color: 'green'
      }
    })
    onRegisterSuccess()
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})

const loginSubmit = handleLoginSubmit(async (values) => {
  const result = await user.login(values)
  if (result === '登入成功') {
    createSnackbar({
      text: result,
      snackbarProps: {
        color: 'green'
      }
    })
    router.push('/')
  } else {
    createSnackbar({
      text: result,
      snackbarProps: {
        color: 'red'
      }
    })
  }
})

</script>

<style lang="scss">
@import '/src/styles/settings.scss';

// html, body {
//       overflow-y: hidden;
//     }

#background {
  width: 100%;
  height: calc(100vh - 99px);
  position: absolute;
  top: 99px;
  background: url('/src/assets/sea2-court.jpg') no-repeat center center;
  background-size: cover;
}

.link {
  cursor: pointer;
  color: $third-color;
  &:hover {
    text-decoration: underline;
  }
}

#login-register {
  width: 400px;
  height: 440px;
  background: rgba(255,255,255,0.5);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  padding: 0;
  overflow: hidden;
  transition: ease 0.2s;
}

.login {
  a {
    text-decoration: none;
    color: $third-color;
  }
}

.wrapper {
  position: relative;
  left: 210px;
  transition: 0.18s ease;
  .v-btn{
  background-color: $primary-color;
  color:white
  }
  .v-text-field {
    width: 335px;
  }
  .title {
    font-size: 20px;
    font-weight: 500;
    color: #333;
  }
  .forget {
    color: #333;
    font-size: 12px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .signup {
    display: flex;
    align-items: center;
    font-size: 14px;
    a {
      font-size: 14px;
      margin-left: 8px;
      line-height: 12px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
