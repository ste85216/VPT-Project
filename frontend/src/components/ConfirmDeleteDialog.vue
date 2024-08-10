<template>
  <v-dialog
    v-model="isOpen"
    :max-width="width"
  >
    <v-card class="pt-5  pa-4">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :color="cancelColor"
          text
          @click="cancel"
        >
          {{ cancelText }}
        </v-btn>
        <v-btn
          :color="confirmColor"
          text
          @click="confirm"
        >
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: '確認'
  },
  message: {
    type: String,
    default: '您確定要執行此操作嗎？'
  },
  confirmText: {
    type: String,
    default: '確認'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmColor: {
    type: String,
    default: 'red-darken-3'
  },
  cancelColor: {
    type: String,
    default: 'blue-grey'
  },
  width: {
    type: String,
    default: '320px'
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const isOpen = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  isOpen.value = newValue
})

watch(isOpen, (newValue) => {
  emit('update:modelValue', newValue)
})

const confirm = () => {
  emit('confirm')
  isOpen.value = false
}

const cancel = () => {
  emit('cancel')
  isOpen.value = false
}
</script>
