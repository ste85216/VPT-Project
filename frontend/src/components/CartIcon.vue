<!-- CartIcon.vue -->
<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(2, 3)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 1C0 0.447715 0.447715 0 1 0H3C3.45887 0 3.85885 0.312297 3.97014 0.757464L4.65578 3.5H17.875C18.1972 3.5 18.4997 3.65526 18.6875 3.91708C18.8754 4.17889 18.9255 4.51517 18.8223 4.8204L15.9473 13.3204C15.8099 13.7266 15.4288 14 15 14H5.5C5.02012 14 4.6079 13.6591 4.51779 13.1878L2.89805 4.71532L2.21922 2H1C0.447715 2 0 1.55228 0 1ZM5.08429 5.5L6.32693 12H14.2826L16.4811 5.5H5.08429Z"
        :fill="props.color"
      />
      <path
        d="M7 15.5C7 16.3284 6.32843 17 5.5 17C4.67157 17 4 16.3284 4 15.5C4 14.6716 4.67157 14 5.5 14C6.32843 14 7 14.6716 7 15.5Z"
        :fill="props.color"
      />
      <path
        d="M15 15.5C15 16.3284 14.3284 17 13.5 17C12.6716 17 12 16.3284 12 15.5C12 14.6716 12.6716 14 13.5 14C14.3284 14 15 14.6716 15 15.5Z"
        :fill="props.color"
      />
    </g>
  </svg>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  size: {
    type: [Number, String],
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})
</script>
