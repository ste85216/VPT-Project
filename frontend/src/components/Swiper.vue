<template>
  <swiper 
  :navigation="{
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }" 
  :pagination="{
        el: '.swiper-pagination',
        clickable: true,
      }"
  :autoplay="{
    delay: 2500,
    disableOnInteraction: false
  }" 
  :loop="true" 
  :modules="modules" 
  class="mySwiper">
    <swiper-slide v-for="(image,index) in images" :key="index">
      <v-img :src="image"></v-img>
    </swiper-slide>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
  </swiper>
</template>

<script setup>
  import socks from '../assets/排球襪.webp'
  import socks2 from '../assets/排球襪2.webp'
  import people from '../assets/人物圖.webp'

  const images = [
    socks,
    socks2,
    people
  ]
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  

  // Import Swiper styles
  import 'swiper/css/bundle';

  import 'swiper/css/navigation';
  import 'swiper/css/pagination';


  // import required modules
  import { Autoplay, Navigation, Pagination } from 'swiper/modules';

  const modules = [ Autoplay, Navigation, Pagination ]



</script>

<style lang="scss" scoped>
  @import '../styles/settings.scss';
  .v-img {
    width: 100%;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 60px;
    height: 60px;
    color: white;
    background-color: #256fbb;
    border-radius: 50%;
    transition: 0.8s;
    display: none;
  }
  .swiper-button-next::after,
  .swiper-button-prev::after {
  font-size: 18px; /* 縮小箭頭大小 */
  font-weight: 900; 
  }
  .swiper-button-prev::after {
    position: absolute;
    left: 23px;
  }
  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background: #edc453;
  }
  :deep(.swiper-pagination-bullet) {
  width: 12px; /* 改變點點的寬度 */
  height: 8px; /* 改變點點的高度 */
  background-color: #edc453; /* 改變點點的背景顏色 */
  opacity: 1; /* 讓點點不透明 */
  border-radius: 23rem;
  }
  :deep(.swiper-pagination-bullet-active) {
  width: 50px; /* 改變點點的寬度 */
  height: 8px; /* 改變點點的高度 */
  background-color: #256fbb; /* 改變點點的背景顏色 */
  opacity: 1; /* 讓點點不透明 */
  border-radius: 23rem;
  transition: 0.35s;
  -webkit-transition: 0.35s ease-in-out;
  transform-origin: left;
  }

  @include md {
    .swiper-button-next,
    .swiper-button-prev {
      display: flex;
    }
    :deep(.swiper-pagination-bullet) {
      width: 16px;
      
    }
    :deep(.swiper-pagination-bullet-active) {
      width: 80px
    }
  }

  @include xl {
    :deep(.swiper-pagination-bullet) {
      width: 20px;
    }
    :deep(.swiper-pagination-bullet-active) {
      width: 120px
    }
  }
</style>
