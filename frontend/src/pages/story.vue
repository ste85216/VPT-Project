<template>
  <div id="story-bg">
    <section class="lottie-container">
      <div
        ref="animationRef"
        class="animation"
      />
    </section>
    <section class="top-container">
      <div
        ref="topTitleLeft"
        class="top-title"
      >
        <img
          src="/src/assets/VPT_logo_text.png"
          class="logo-animate"
        >
      </div>
      <div
        ref="topTitleRight"
        class="top-title-2"
      >
        <p>Volleyball Player of Taiwan</p>
      </div>
    </section>
    <section class="gradient" />

    <section class="website-content">
      <div
        ref="endLottieRef"
        class="end-lottie"
      />

      <v-row class="section-row">
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center align-center"
        >
          <v-row no-gutters>
            <v-col>
              <v-row>
                <v-col>
                  <h1
                    data-aos="fade-right"
                    data-aos-delay="200"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in"
                  >
                    排球不僅是一項運動
                  </h1>

                  <p
                    data-aos="fade-up"
                    data-aos-delay="250"
                    data-aos-duration="1500"
                    class="mb-12 mt-sm-8"
                  >
                    它象徵著團結、協作與無限的可能性。一開始創辦這個品牌的初衷，<br>是希望能打造一個不僅僅是販賣排球用具的品牌，<br>而是一個能讓所有喜愛打排球的人更容易、更自由的聚在一起的平台。
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center align-center"
        >
          <v-img
            data-aos="fade-left"
            data-aos-delay="500"
            data-aos-duration="2000"
            data-aos-easing="ease-in"
            src="/src/assets/排球企聯01.jpg"
            cover
          />
        </v-col>
      </v-row>
      <v-row
        class="d-flex flex-sm-row-reverse section-row"
        no-gutters
      >
        <v-col
          cols="12"
          md="6"
          class="ps-sm-12 d-flex flex-column justify-center"
        >
          <h1
            data-aos="fade-left"
            data-aos-delay="500"
            data-aos-duration="1500"
            data-aos-easing="ease-in"
            data-aos-offset="500"
          >
            飛得更高
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="550"
            data-aos-duration="1500"
            data-aos-offset="500"
            class="mb-12 mt-sm-8"
          >
            在首頁最上方的兩行標語之一，代表著穿著裝備的重要性。我們在經過無數次拜訪各家工廠後，細選出品質優良的廠商。VPT的每一件產品也都經歷了嚴苛的測試與無數次的改進，為的就是讓你能夠在球場上發揮出最佳水平，甚至更好!
          </p>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-img
            data-aos="fade-right"
            data-aos-delay="700"
            data-aos-duration="1500"
            data-aos-easing="ease-in"
            data-aos-offset="500"
            src="/src/assets/工廠.jpg"
            cover
          />
        </v-col>
      </v-row>
      <v-row
        class="section-row"
      >
        <v-col
          cols="12"
          md="6"
          class="ps-sm-12 d-flex flex-column justify-center"
        >
          <h1
            data-aos="fade-right"
            data-aos-delay="750"
            data-aos-duration="1500"
            data-aos-easing="ease-in"
            data-aos-offset="500"
          >
            一同翱翔
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="550"
            data-aos-duration="1500"
            data-aos-offset="500"
            class="mb-12 mt-sm-8 pe-sm-8"
          >
            無論是臨時想要找場地，還是想找志同道合的隊友一起打場酣暢淋漓的比賽，使用VPT的刊登報名系統是你最佳的選擇! 我們不僅能幫想打球的人快速連結到合適場地，也能讓臨時缺人的場主刊登場次、及時補齊人數。來吧，一同翱翔在球場上吧!
          </p>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-img
            data-aos="fade-left"
            data-aos-delay="500"
            data-aos-duration="2000"
            data-aos-easing="ease-in"
            data-aos-offset="500"
            src="/src/assets/男排嘶吼.jpg"
            cover
          />
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { definePage } from 'vue-router/auto'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import lottie from 'lottie-web'
import volleyballAnimate from '../assets/volleyball.mp4.lottie.json'
import 'animate.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

gsap.registerPlugin(ScrollTrigger)

definePage({
  meta: {
    title: '品牌故事 | VPT'
  }
})

const animationRef = ref()
const endLottieRef = ref()
const topTitleLeft = ref()
const topTitleRight = ref()

onMounted(() => {
  if (animationRef.value) {
    LottieScrollTrigger({
      trigger: animationRef.value,
      start: 'top center',
      endTrigger: endLottieRef.value,
      end: `bottom center+=${animationRef.value.offsetHeight}`,
      renderer: 'svg',
      target: animationRef.value,
      path: volleyballAnimate,
      scrub: 1
    })
  }

  // 步驟 1: 設置初始狀態
  // 將左邊標題移到畫面上方看不見的位置
  // 添加檢查
  console.log('topTitleLeft ref:', topTitleLeft.value)
  console.log('topTitleRight ref:', topTitleRight.value)

  // 確保元素存在後再設置動畫
  if (topTitleLeft.value && topTitleRight.value) {
    // 設置初始狀態
    gsap.set(topTitleLeft.value, { y: '-100%', opacity: 0 })
    gsap.set(topTitleRight.value, { y: '100%', opacity: 0 })

    // 左邊標題動畫
    gsap.to(topTitleLeft.value, {
      y: 0,
      opacity: 1,
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.top-title',
        start: '20% top ', // 調整觸發點
        end: 'center bottom',
        scrub: 4,
        // markers: true,
        onEnter: () => console.log('Left title animation started'),
        onEnterBack: () => console.log('Left title animation started (reverse)'),
        onLeave: () => console.log('Left title animation completed'),
        onLeaveBack: () => console.log('Left title animation completed (reverse)')
      }
    })

    // 步驟 3: 創建右邊標題的動畫
    gsap.to(topTitleRight.value, {
      y: 0, // 移動到原本的位置
      opacity: 1, // 完全顯示
      duration: 2, // 動畫持續 1.5 秒
      ease: 'power2.inOut', // 使用緩出效果
      scrollTrigger: {
        trigger: '.top-title-2', // 使用 top-container 作為觸發元素
        start: 'center 20%', // 當 top-container 的中心到達視窗中心時開始
        end: 'bottom center', // 當 top-container 的底部到達視窗中心時結束
        scrub: 4 // 平滑滾動效果
        // markers: true // 顯示標記，方便調試
      }
    })
  }
})

function LottieScrollTrigger (vars) {
  try {
    const playhead = { frame: 0 }
    const target = gsap.utils.toArray(vars.target)[0]
    const speeds = { slow: '+=2000', medium: '+=1000', fast: '+=500' }
    const st = {
      trigger: '.trigger',
      end: speeds[vars.speed] || '+=1000',
      scrub: 1
      // markers: true
    }

    const ctx = gsap.context && gsap.context()
    const animation = lottie.loadAnimation({
      container: target,
      renderer: vars.renderer || 'svg',
      loop: false,
      autoplay: false,
      animationData: vars.path,
      rendererSettings: vars.rendererSettings || {
        preserveAspectRatio: 'xMidYMid slice'
      }
    })
    for (const p in vars) {
      st[p] = vars[p]
    }

    animation.addEventListener('DOMLoaded', function () {
      const createTween = function () {
        animation.frameTween = gsap.to(playhead, {
          frame: animation.totalFrames - 1,
          ease: 'none',
          onUpdate: () => animation.goToAndStop(playhead.frame, true),
          scrollTrigger: st
        })
        return () => animation.destroy && animation.destroy()
      }
      ctx && ctx.add ? ctx.add(createTween) : createTween()
    })

    return animation
  } catch (error) {
    console.error('Error in LottieScrollTrigger:', error)
    console.log('vars:', vars) // 輸出傳入的參數，以便調試
  }
}

</script>

<style lang="scss" scoped>
@import '/src/styles/settings.scss';
  // .logo-animate {
  //   animation: bounceInLeft; /* referring directly to the animation's @keyframe declaration */
  //   animation-duration: 2s;
  // }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #story-bg {
    background-color: #000;
    height: 600vh;
    width: 100%;
    font-family: "PP Neue Montreal";
    overflow: hidden;
  }

  .logo-animate {
    width: 300px;
  }

  .top-container {
    width: 100%;
    height: 150vh;
    .top-title {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
    .top-title-2 {
    width: 100%;
    position: fixed;
    text-align: center;
    top: 55%;

  }
  p {
      font-size: 32px;
      font-weight: 550;
      text-shadow:
        0 0 20px #fff,
        0 0 30px #fff,
        0 0 40px #fff;
      font-family: 'Bebas Neue';
      letter-spacing: 2px;
    }
  }

  h1 {
    margin: 0.25em 0;
    font-size: 40px;
    font-weight: 500;
    letter-spacing: -0.02em;
    margin-bottom: 32px;
  }

  p {
    font-size: 18px;
    font-weight: 400;
    line-height: 175%;
  }

  .section-row {
      margin-bottom: 120px;
    }

  .lottie-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
  }

  .lottie-container {
    .animation{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    filter: saturate(2);
    }

  }

  .animation:after {
    content: "";
    background: url(/src/assets/noise.jpg) ;
    width: 200%;
    height: 200%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.1;
    animation: animationGrain 8s steps(10) infinite;
  }

  .gradient {
    width: 100vw;
    height: 200vh;
    position: relative;
    background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
    z-index: 1;
  }

  .website-content {
    position: relative;
    width: 100%;
    height: 250vh;
    padding: 10%;
    background: #fff;
    color: #333;
    z-index: 0;
  }

  .end-lottie {
    position: absolute;
    top: 100vh;
    width: 100%;
    height: 1px;
  }

  @keyframes animationGrain {
    0%,
    100% {
      transform: translate(0, 0);
    }
    10% {
      transform: translate(-5%, -10%);
    }
    20% {
      transform: translate(-15%, -20%);
    }
    30% {
      transform: translate(-5%, -10%);
    }
    40% {
      transform: translate(-15%, -20%);
    }
    50% {
      transform: translate(-5%, -10%);
    }
    60% {
      transform: translate(-15%, -20%);
    }
    70% {
      transform: translate(-5%, -10%);
    }
    80% {
      transform: translate(-15%, -20%);
    }
    90% {
      transform: translate(-5%, -10%);
    }
    100% {
      transform: translate(-15%, -20%);
    }
  }

  @include sm {
    .logo-animate {
      width: 500px;
    }
    .top-container {
    width: 100%;
    height: 120vh;
    .top-title {
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    }
    .top-title-2 {
    position: fixed;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);

    }
    p {
        font-size: 68px;
        font-weight: 550;
        text-shadow:
          0 0 20px #fff,
          0 0 30px #fff,
          0 0 40px #fff,
          0 0 50px #fff;
        font-family: 'Bebas Neue';
        letter-spacing: 4px;
      }
    }
    .section-row {
      margin-bottom: 120px;
    }
    h1 {
      margin: 0.25em 0;
      font-size: 48px;
      font-weight: 500;
      letter-spacing: -0.02em;
    }
    p {
      font-size: 18px;
      font-weight: 400;
      line-height: 175%;
    }
    // .v-img {
    //   min-width: 500px;
    // }
  }
  @include lg {
    #story-bg {
      height: 515vh;
    }
    .logo-animate {
      width: 500px;
    }
    .top-container {
    width: 100%;
    height: 120vh;
    .top-title {
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    }
    .top-title-2 {
    position: fixed;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);

    }
    p {
        font-size: 70px;
        font-weight: 550;
        text-shadow:
          0 0 20px #fff,
          0 0 30px #fff,
          0 0 40px #fff,
          0 0 50px #fff;
        font-family: 'Bebas Neue';
        letter-spacing: 4px;
      }
    }
    .section-row {
      margin-bottom: 120px;
    }
    h1 {
      margin: 0.25em 0;
      font-size: 60px;
      font-weight: 500;
      letter-spacing: -0.02em;
    }
    p {
      font-size: 20px;
      font-weight: 400;
      line-height: 175%;
    }
    // .v-img {
    //   min-width: 500px;
    // }
  }
</style>
