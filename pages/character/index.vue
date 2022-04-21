<template>
  <LayoutWrapper :class="subNav">
		 <swiper
		 	class="swiper-content"
      ref="mySwiper"
      :options="swiperOptions"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(hero, i) in characterConfig" :key="i">
				<div
					class="cover"
					:name="hero.id"
					:style="getRetina(hero.theme.cover, hero.theme.cover_2x)"
				></div>
        <nuxt-link
          :to="`/${subNav}/detail?id=${hero.id}&lang=${lang}`"
          target="_blank"
        ></nuxt-link>
      </swiper-slide>
      <!-- 分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
	</LayoutWrapper>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
	data() {
		return {
			subNav: 'character',
      swiperOptions: {
        loop: true,
				autoplay: false,
        // autoplay: {
        //   delay: 5000,
        // },
				slidesPerView: 3,
				// spaceBetween : 100,
        mousewheel: true,
        lazy: {
          loadPrevNext: true,
        },
        grabCursor: true, // 触摸滑动
        // centeredSlides: true,
        pagination: {
          // 分页
          el: '.swiper-pagination',
          clickable: true,
        },
      },
		}
	},
  computed: {
    ...mapGetters(["getRetina"]),
    ...mapState(["lang", "devicePixelRatio", "characterConfig"]),
  },
	methods: {
	  onSlideChange() {
      // 触摸滑动 & autoplay 触发
      // console.log('slide change')
    },
    handlePrev() {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
    handleNext() {
      this.$refs.mySwiper.$swiper.slideNext()
    },

	}
}
</script>

<style lang="scss" scoped>
.character {
  position: relative;
	.swiper-content {
		width: 100%;
		height: 600px;
		margin: 0 auto;
		.swiper-slide {
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
    	bottom: 0;
			left: 50%;
			transform: scale(0.8) translate3d(-61%, 0, 0);
		  background-position: center;
		  background-repeat: no-repeat;
		  background-size: contain;
			cursor: pointer;

			&[name='310'] {
				width: 555px;
				height: 607px;
			}
			&[name='600'] {
				width: 510px;
				height: 636px;
			}
			&[name='900'] {
				width: 520px;
				height: 655px;
			}
		}
		.swiper-pagination {
			::v-deep .swiper-pagination-bullet {
				width: 15px;
				height: 15px;
				background-color: transparent;
				border-radius: 0;
				opacity: 1;
				margin: 0 12px;
				background-color: #557BAD;
				transform: skewX(-10deg);
			}
			::v-deep .swiper-pagination-bullet-active {
				width: 54.5px;
				background-color: #FFC300;
			}
		}
	}
}
</style>