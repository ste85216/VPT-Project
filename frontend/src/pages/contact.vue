<template>
  <div
    id="waves-container"
    class="text-center"
  >
    <h2 class="contact-title">
      聯絡我們
    </h2>
    <div class="wave wave1" />
    <div class="wave wave2" />
    <div class="wave wave3" />
    <div class="wave wave4" />
  </div>
  <v-container
    class="text-center mb-16"
    style="max-width: 600px; "
  >
    <v-row>
      <v-col cols="12">
        <v-sheet class="body-text">
          感謝您對VPT的支持，如果您有任何問題或建議，<br>歡迎隨時留下您的寶貴意見，我們將會盡快回覆您。
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-form
          :disabled="isSubmitting"
          class="d-flex justify-center"
          @submit.prevent="submit"
        >
          <v-card
            class="custom-card py-0"
            elevation="0"
          >
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col
                      cols="12"
                      class="text-left pb-0 pt-0"
                    >
                      姓名:
                    </v-col>
                    <v-col class="py-0 pt-2">
                      <v-text-field
                        v-model="name.value.value"
                        :error-messages="name.errorMessage.value"
                        density="compact"
                        variant="outlined"
                        class="custom-input"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col
                      cols="12"
                      class="text-left pb-0 pt-0"
                    >
                      email:
                    </v-col>
                    <v-col class="py-0 pt-2">
                      <v-text-field
                        v-model="email.value.value"
                        :error-messages="email.errorMessage.value"
                        density="compact"
                        variant="outlined"
                        class="custom-input"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col
                      cols="12"
                      class="text-left pb-0 pt-0"
                    >
                      信件主旨:
                    </v-col>
                    <v-col class="py-0 pt-2">
                      <v-text-field
                        v-model="subject.value.value"
                        :error-messages="subject.errorMessage.value"
                        density="compact"
                        variant="outlined"
                        class="custom-input"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col
                      cols="12"
                      class="text-left pb-0 pt-0"
                    >
                      內容:
                    </v-col>
                    <v-col class="py-0 pt-2">
                      <v-textarea
                        v-model="content.value.value"
                        :error-messages="content.errorMessage.value"
                        density="compact"
                        variant="outlined"
                        no-resize
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    v-if="smAndUp"
                    type="submit"
                    variant="outlined"
                    color="teal-lighten-1"
                    :loading="isSubmitting"
                  >
                    送出
                  </v-btn>
                  <v-btn
                    v-if="!smAndUp"
                    type="submit"
                    variant="outlined"
                    color="teal-lighten-1"
                    size="small"
                    :loading="isSubmitting"
                  >
                    送出
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { useDisplay } from 'vuetify'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import validator from 'validator'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

definePage({
  meta: {
    title: '聯絡我們 | VPT'
  }
})

const { api } = useApi()
const { smAndUp } = useDisplay()
const createSnackbar = useSnackbar()

const schema = yup.object({
  name: yup
    .string()
    .required('請輸入您的大名'),
  email: yup
    .string()
    .required('請輸入您的電子信箱')
    .test(
      'isEmail', '請輸入正確的信箱格式',
      (value) => {
        return validator.isEmail(value)
      }
    ),
  subject: yup
    .string()
    .required('請輸入信件主旨'),
  content: yup
    .string()
    .required('請輸入內容')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema
})

const name = useField('name')
const email = useField('email')
const subject = useField('subject')
const content = useField('content')

const submit = handleSubmit(async (values) => {
  try {
    await api.post('/contact', {
      name: values.name,
      email: values.email,
      subject: values.subject,
      content: values.content
    })
    createSnackbar({
      text: '已將您的訊息送出，我們將會盡快回覆您',
      snackbarProps: {
        color: 'teal-darken-1'
      }
    })
    resetForm()
  } catch (error) {
    // 錯誤處理
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red-lighten-1'
      }
    })
  }
})
</script>

<style lang="scss" scoped>
@import "/src/styles/settings.scss";
#waves-container {
  position: relative;
  width: 100%;
  height: 18vh;
  // background: #039199e9;
  background: transparent;
  overflow: hidden;
  border: none;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 95%;
    background: #26A69A;
    z-index: -1;
  }
  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 85px;
    background: url(/src/assets/wave.png);
    background-size: 1000px 100px;
  }
  .wave1 {
    animation: animate 30s linear infinite;
    z-index: 1000;
    opacity: 1;
    animation-delay: 0s;
    bottom: 0px;
  }
  .wave2 {
    animation: animate2 15s linear infinite;
    z-index: 999;
    opacity: 0.5;
    animation-delay: -5s;
    bottom: 5px;
  }
  .wave3 {
    animation: animate 30s linear infinite;
    z-index: 998;
    opacity: 0.2;
    animation-delay: -2s;
    bottom: 8px;
  }
  .wave4 {
    animation: animate2 5s linear infinite;
    z-index: 997;
    opacity: 0.7;
    animation-delay: -5s;
    bottom: 12px;
  }
  @keyframes animate {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 1000px;
    }
  }
  @keyframes animate2 {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: -1000px;
    }
  }
}

.body-text {
  font-size: 14px;
  color: #333;
}

.contact-title {
  font-size: 24px;
  color: #fff;
  font-weight: 500;
  line-height: px;
}

.custom-card {
  max-width: 800px;
  border-radius: 10px;
  padding: 20px 0;
  .custom-input {
    :deep(.v-field__input){
    padding: 0 0 10px 8px;
    height: 32px !important;
    }
    :deep(.v-field__field) {
    height: 32px;
    font-size: 14px;
    }
  }
  .v-textarea {
    :deep(.v-field__field) {
    font-size: 14px;
    }
  }
}

@include sm {
  #waves-container {
    height: 25vh;
  }
  .wave {
    height: 100px;
  }
  .wave2 {
    animation: animate2 15s linear infinite;
    z-index: 999;
    opacity: 0.5;
    animation-delay: -5s;
    bottom: 10px;
  }
  .wave3 {
    animation: animate 30s linear infinite;
    z-index: 998;
    opacity: 0.2;
    animation-delay: -2s;
    bottom: 15px;
  }
  .wave4 {
    animation: animate2 5s linear infinite;
    z-index: 997;
    opacity: 0.7;
    animation-delay: -5s;
    bottom: 25px;
  }

  .contact-title {
    font-size: 32px;
    line-height: 180px;
  }

  .body-text {
  font-size: 15px;
  color: #333;
  }

  .custom-card {
  max-width: 800px;
  border-radius: 10px;
  padding: 20px 0;
  .custom-input {
    :deep(.v-field__input){
    padding: 0 0 10px 8px;
    height: 32px !important;
    }
    :deep(.v-field__field) {
    height: 32px;
    font-size: 14px;
    }
  }
  .v-textarea {
    :deep(.v-field__field) {
    font-size: 14px;
    }
  }
  }
}
</style>
