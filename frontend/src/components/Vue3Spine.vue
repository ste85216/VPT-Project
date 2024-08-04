<template>
  <Vue3Spline
    :scene="{
      url: 'https://prod.spline.design/VXwvUCucezeKhYSq/scene.splinecode',
    }"
  />
</template>

<script>
import { Vue3Spline } from 'vue3-spline'

export default {
  components: {
    Vue3Spline
  }
}
</script>
