<template>
  <v-container id="login-register">
    <v-container class="wrapper ps-8 pe-8">
      <v-row>
        <v-col cols="12">
          <div class="title text-center">
            登入
          </div>
        </v-col>
        <v-col cols="12">
          <v-form>
            <v-text-field
              v-model="account.value.value"
              :error-messages="account.errorMessage.value"
              label="帳號"
              variant="outlined"
              density="compact"
              min-length="4"
              maxlength="20"
              clearable
            />
            <v-text-field
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
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
                  <a href="">立即加入會員</a>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="wrapper ps-8 pe-8">
      <v-row>
        <v-col cols="12">
          <div class="title text-center">
            註冊
          </div>
        </v-col>
        <v-col cols="12">
          <v-form>
            <v-text-field
              v-model="account.value.value"
              :error-messages="account.errorMessage.value"
              label="帳號"
              variant="outlined"
              density="compact"
              min-length="4"
              maxlength="20"
              clearable
            />
            <v-text-field
              class="mt-1"
              label="email"
              type="email"
              variant="outlined"
              density="compact"
              min-length="4"
              maxlength="20"
              clearable
            />
            <v-text-field
              class="mt-1"
              label="手機號碼"
              type="email"
              variant="outlined"
              density="compact"
              min-length="4"
              maxlength="20"
              clearable
            />
            <v-text-field
              class="mt-1"
              label="生日"
              type="date"
              variant="outlined"
              density="compact"
              min-length="4"
              maxlength="20"
              clearable
            />
            <v-text-field
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              class="mt-1"
              label="密碼"
              type="password"
              variant="outlined"
              density="compact"
              min-length="4"
              maxlength="20"
              clearable
            />
            <v-text-field
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              class="mt-1"
              label="再次確認密碼"
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
            >
              註冊
            </v-btn>
            <v-container class="signup mt-4">
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
                  <a href="">立即登入</a>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import validator from 'validator'
import { useForm, useField, validate } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  account: yup
    .string()
    .required('請輸入帳號')
    .min(4, '帳號至少需輸入4個字')
    .max(20, '帳號長度不得超過20個字')
    .test(
      'isAlphanumeric', '帳號只能輸入英數字',
      (value) => {
        return validator.isAlphanumeric(value)
      }
    ),
  password: yup
    .string()
    .required('請輸入密碼')
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

const account = useField('account')
const password = useField('password')
</script>

<style lang="scss">
.v-main {
  background: url('/src/assets/sand.jpg') no-repeat center center fixed;
  background-size: cover;
}
#login-register {
  width: 400px;
  height: auto;
  overflow: hidden;
  display: flex;
  justify-content: center;

}
.wrapper {
  width: 400px;
  margin: 0 auto;
  background: rgba(255,255,255,0.5);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(20px);
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
    font-size: 14px;/* 垂直置中 */
    a {
      font-size: 14px;
      margin-left: 5px;
      line-height: 12px;/* 添加間距 */
    }
  }
}
</style>
