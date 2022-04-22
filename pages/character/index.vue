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
				>
					<div class="name">{{ hero.name }}</div>
				</div>
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
				slidesPerView: 3,
        mousewheel: true,
        lazy: {
          loadPrevNext: true,
        },
        grabCursor: true, // 触摸滑动
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
	width: 1536px !important;
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