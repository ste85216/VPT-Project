<template>
  <v-card
    class="custom-card d-flex flex-column"
    width="100%"
  >
    <v-row
      class="flex-grow-1"
    >
      <v-col
        cols="12"
        sm="6"
      >
        <v-img
          :src="props.images[0]"
          width="100%"
          class="venue-img"
          cover
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-card-text
          class="d-flex flex-column justify-space-between h-100 py-0"
        >
          <v-card-title class="px-0 text-blue-grey-darken-3">
            {{ props.name }}  <!-- 綁定球場名稱 -->
          </v-card-title>
          <div class="info-text">
            <v-icon color="#555">
              mdi-clock-outline
            </v-icon> 營業時間 : {{ props.time }}
          </div>
          <div class="info-text">
            <v-icon color="#555">
              mdi-phone
            </v-icon> 電話 : {{ props.phone }}  <!-- 綁定電話 -->
          </div>
          <div class="info-text">
            <v-icon color="#555">
              mdi-map
            </v-icon> 地址 : {{ props.address }}  <!-- 綁定地址 -->
          </div>
          <v-btn
            elevation="0"
            :active="false"
            variant="text"
            class="opacity-100 map-btn"
            :href="props.mapLink"
            target="_blank"
          >
            <v-icon
              size="x-large"
              color="#039199"
              class="me-2"
            >
              mdi-map-marker-radius-outline
            </v-icon>
            Google Map
          </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
const props = defineProps(['name', 'address', 'phone', 'images', 'time', 'mapLink'])
</script>

<style lang="scss" scoped>
@import "/src/styles/settings.scss";
.custom-card {
  margin: 0;
  padding: 28px 28px ;
  border-radius: 20px;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
  .v-card-title {
    font-size: 18px;
    font-weight: 600;
  }
  .info-text {
    font-size: 13px;
    margin-bottom: 16px;
  }
  .map-btn {
    border: 1px solid #039199;
    color: #039199;
    font-size: 12px;
    font-weight: 500;
    padding: 0;
  }
  .venue-img {
    height: 200px;
  }
  @include sm {
    .venue-img {
    height: 300px;
  }
  }
  @include md {
    .custom-card {
    margin: 0;
    padding: 32px 20px 20px 32px;
    border-radius: 20px;
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
    }
    .v-card-title {
    font-size: 20px;
    }
    .venue-img {
      height: 300px;
    }
    .info-text {
    font-size: 15px;
    margin-bottom: 16px;
    }
    .map-btn {
    border: 1px solid #039199;
    color: #039199;
    font-size: 14px;
    font-weight: 500;
    padding: 0;
    }
  }
}
</style>
