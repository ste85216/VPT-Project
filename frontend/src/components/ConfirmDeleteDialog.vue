<template>
  <v-dialog
    v-model="isOpen"
    :max-width="width"
  >
    <v-card class="pt-5 pa-4">
      <v-card-title :class="titleClass">
        {{ title }}
      </v-card-title>
      <v-card-text :class="textClass">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :color="cancelColor"
          :size="cancelSize"
          variant="outlined"
          @click="cancel"
        >
          {{ cancelText }}
        </v-btn>
        <v-btn
          :color="confirmColor"
          :size="confirmSize"
          variant="outlined"
          @click="confirm"
        >
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

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
    default: 'blue-grey-darken-2'
  },
  width: {
    type: String,
    default: '320px'
  },
  confirmSize: {
    type: String,
    default: 'default'
  },
  cancelSize: {
    type: String,
    default: 'default'
  },
  titleSize: {
    type: String,
    default: '1.25rem'
  },
  textSize: {
    type: String,
    default: '1rem'
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const isOpen = ref(props.modelValue)

const titleClass = computed(() => `custom-title text-${props.titleSize}`)
const textClass = computed(() => `custom-text text-${props.textSize}`)

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

<style scoped>
.custom-title {
  font-size: v-bind('props.titleSize');
}
.custom-text {
  font-size: v-bind('props.textSize');
}
</style>
