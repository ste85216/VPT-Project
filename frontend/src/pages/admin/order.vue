<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '訂單管理 | VPT',
    login: true,
    admin: true
  }
})
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
