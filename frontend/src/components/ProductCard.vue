<template>
  <v-hover v-slot="{ isHovering, props: hoverProps }">
    <v-card
      :to="'/products/' + _id"
      class="pa-sm-4 pa-md-6 pb-2 rounded-lg border-sm mx-3 d-flex flex-column"
      elevation="0"
      :ripple="false"
      v-bind="{ ...hoverProps, ...$attrs }"
      width="100%"
    >
      <v-row
        class="flex-grow-1"
        no-gutters
      >
        <v-col class="d-flex">
          <div class="image-container">
            <v-img
              :src="props.images[0]"
              cover
              class="flex-grow-1"
            >
              <v-expand-transition>
                <div
                  v-if="isHovering"
                  class="d-flex bg-teal-darken-1 v-card--reveal"
                >
                  {{ props.description }}
                </div>
              </v-expand-transition>
            </v-img>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card-title class="ps-3 ps-sm-0 pt-5 title">
            {{ props.name }}
          </v-card-title>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card-text class="text-right pe-2 price">
            ${{ props.price }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script setup>
const props = defineProps(['_id', 'category', 'description', 'images', 'name', 'price', 'sell'])
</script>

<style lang="scss" scoped>
@import '/src/styles/settings.scss';

.title {
  font-size: 14px;
  font-weight: 500;
  color: #333;

}

.price {
  font-size: 14px;
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
  height: 100%;
  padding: 12px;
  font-size: 12px;
  font-weight: 600;
  transition: 2s;
}

.image-container {
  width: 100%;
  padding-top: 100%; // 1:1 Aspect Ratio
  position: relative;
  overflow: hidden;
}

.image-container .v-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@include sm {
  .title {
  font-size: 16px;
}

.price {
  font-size: 18px;
}

.v-card--reveal {
  font-size: 18px;
}
}

@include md {
  .title {
  font-size: 18px;
  font-weight: 500;
}

.price {
  font-size: 18px;
}

.v-card--reveal {
  font-size: 20px;
}
}
</style>
