<template>
  <v-hover v-slot="{ isHovering, props: hoverProps }">
    <v-card
      :to="'/products/' + _id"
      min-width="280"
      max-width="280"
      class="pa-6 pb-2 rounded-lg border-sm mx-3"
      elevation="0"
      :ripple="false"
      v-bind="{ ...hoverProps, ...$attrs }"
    >
      <v-img
        :src="props.images[0]"
        cover
        height="250"
        :aspect-ratio="16/9"
      >
        <v-expand-transition>
          <div
            v-if="isHovering"
            class="d-flex transition-fast-in-fast-out bg-teal-darken-1 v-card--reveal"
            style="height: 100%;"
          >
            {{ props.description }}
          </div>
        </v-expand-transition>
      </v-img>

      <v-card-title class="ps-0 pt-5 title">
        {{ props.name }}
      </v-card-title>
      <v-card-text
        class="text-right pe-2 price"
      >
        ${{ props.price }}
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script setup>
const props = defineProps(['_id', 'category', 'description', 'images', 'name', 'price', 'sell'])
</script>

<style lang="scss" scoped>
  @import '/src/styles/settings.scss';
  .title {
    font-size: 18px;
    font-weight: 500;
    color: #333;
  }
  .price {
    font-size: 16px;
    font-weight: 500;
    color: $primary-color;
  }
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
    font-size: 24px;
    font-weight: 600;
  }
</style>
