<template>
  <LayoutWrapper :class="subNav">
    <swiper
      v-show="device === 'pc'"
      class="swiper-content"
      ref="mySwiper"
      :options="swiperOptions"
    >
      <swiper-slide v-for="(hero, i) in characterConfig" :key="i">
        <div
          class="cover"
          :name="hero.id"
          :style="getRetina(hero.theme.cover, hero.theme.cover_2x)"
        >
          <div class="name">
            {{ $t(`${hero.name}_name`) || `$${hero.name}_name` }}
          </div>
        </div>
        <nuxt-link
          :to="`/${subNav}/detail?id=${hero.id}`"
          target="_blank"
        ></nuxt-link>
      </swiper-slide>
      <!-- 分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <ul class="hero-list">
      <li
        v-for="(hero, i) in characterConfig"
        :key="i"
        :name="hero.id"
        :style="getRetina(hero.theme.coverMobile)"
      >
        <div class="name">
          {{ $t(`${hero.name}_name`) || `$${hero.name}_name` }}
        </div>
        <nuxt-link
          :to="`/${subNav}/detail?id=${hero.id}`"
          target="_blank"
        ></nuxt-link>
      </li>
    </ul>
  </LayoutWrapper>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      subNav: "character",
      swiperOptions: {
        loop: true,
        autoplay: false,
        slidesPerView: 3,
        // slidesPerGroup: 3,
        mousewheel: true,
        lazy: {
          loadPrevNext: true,
        },
        grabCursor: true, // 触摸滑动
        pagination: {
          // 分页
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getRetina"]),
    ...mapState(["lang", "devicePixelRatio", "characterConfig", "device"]),
  },
  methods: {
    handlePrev() {
      this.$refs.mySwiper.$swiper.slidePrev();
    },
    handleNext() {
      this.$refs.mySwiper.$swiper.slideNext();
    },
  },
};
</script>

<style lang="scss" scoped>
.character {
  width: 1536px !important;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  margin: 0 !important;
  .hero-list {
    display: none;
  }
  .swiper-content {
    width: 100%;
    height: 760px;
    margin: -20px auto 0;
    padding-top: 20px;
    .swiper-slide {
      width: 512px;
      height: 645px;
      transition: all ease-in-out 200ms;
      &:hover {
        transform: translate3d(0, -20px, 0);
      }
      a {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .cover {
      position: absolute;
      width: 100%;
      height: 100%;
      bottom: 0;
      left: 0;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      cursor: pointer;
      .name {
        position: absolute;
        bottom: 16px;
        left: 35px;
        width: 340px;
        height: 60px;
        color: #111;
        font-size: 40px;
        font-weight: 700;
        font-style: italic;
      }
    }
    .swiper-pagination {
      :deep(.swiper-pagination-bullet) {
        width: 15px;
        height: 15px;
        background-color: transparent;
        border-radius: 0;
        opacity: 1;
        margin: 0 12px;
        background-color: #557bad;
        transform: skewX(-10deg);
      }
      :deep(.swiper-pagination-bullet-active) {
        width: 54.5px;
        background-color: #ffc300;
      }
    }
  }
}

@media screen and (max-width: 828px) {
  .character {
    width: 100% !important;
    left: 0;
    transform: none;
    .hero-list {
      display: block;
      width: vw(795px);
      margin-left: vw(40px);
      padding-bottom: vw(100px);
      li {
        position: relative;
        width: vw(795px);
        height: vw(377px);
        margin-bottom: vw(20px);

        background-position: 0 center;
        background-repeat: no-repeat;
        background-size: contain;

        .name {
          position: absolute;
          height: vw(65px);
          bottom: vw(30px);
          left: vw(48px);
          font-size: vw(50px);
          font-weight: 700;
          font-style: italic;
          color: #111;
        }

        a {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>