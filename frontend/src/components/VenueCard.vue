<template>
  <v-card

    class="custom-card"
  >
    <v-row>
      <v-col cols="6">
        <v-img
          src="/src/assets/3D排球機器人.webp"
          width="300"
          height="300"
          cover
        />
      </v-col>
      <v-col cols="6">
        <v-card-title style="color: #1b2d3f;">
          3D排球機器人
        </v-card-title>
        <v-card-text class="d-flex flex-column justify-space-between mt-2">
          <div class="info-text">
            <v-icon color="#555">
              mdi-clock-outline
            </v-icon> 營業時間 :<br> 12:00 - 22:00
          </div>
          <div class="info-text">
            <v-icon color="#555">
              mdi-phone
            </v-icon> 電話 :<br> 02-1234-5678
          </div>
          <div class="info-text">
            <v-icon color="#555">
              mdi-map
            </v-icon> 地址 : <br> 台北市大安區忠孝東路四段 200 號
          </div>
          <v-btn
            elevation="0"
            :active="false"
            variant="text"
            class="opacity-100 map-btn"
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

<style lang="scss" scoped>
.custom-card {
  margin: 0;
  padding: 20px 24px;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
  .v-card__title {
    font-size: 24px;
    font-weight: 700;
    padding: 0;
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
</style>
