<template>
  <LayoutCell :title="title">
    <div class="name-content" :class="type">
      <div :class="`icon-box rare-${info.RateVal}`">
        <div class="icon" :style="{ 'background-image': `url(${info.Icon})` }"></div>
      </div>
      <div class="info">
        <div class="name">{{ info.Name }}</div>
        <div class="des">
          <div class="level" v-if="info.Level">
            <span>{{ info.Level }}</span>
          </div>
          <div class="type" v-if="info.Type">
            <span>{{ info.Type }}</span>
          </div>
        </div>
      </div>
    </div>
  </LayoutCell>
</template>

<script>
export default {
  props: {
    type: {
      typeof: String,
      default: () => ''
    },
    title: {
      type: String,
      default: () => ''
    },
    info: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.name-content {
  display: flex;
  padding: 30px 44px;
  justify-content: flex-start;
  align-items: center;
  .icon-box {
    width: 75px;
    height: 75px;
    border-radius: 0 8px;
    background: #111;
    .icon {
      background-position: center;
      background-repeat: no-repeat;
      background-size: 80% 80%;
      width: 100%;
      height: 100%;
    }
  }
  .info {
    height: 76px;
    margin-left: 28px;
    .name {
      color: #FFC130;
      font-size: 16px;
      font-weight: bolder;
      margin-bottom: 5px;
    }
    .des {
      font-size: 12px;
      color: #BFBFBF;
      display: flex;
      flex-direction: column;
      .level,
      .type {
        span {
          display: inline-block;
          height: 23px;
          line-height: 22px;
          padding: 0 5px;
          border: 1px solid #333;
          border-radius: 0 7px;
        }
      }
      .level {
        margin-bottom: 3px;
      }
    }
  }
}

@media screen and (max-width: 828px) {
	.name-content {
		padding: vw(40px) vw(44px);
		.icon-box {
	    width: vw(150px);
	    height: vw(150px);
	    border-radius: 0 vw(15px);
		}
		.info {
			height: vw(150px);
			margin-left: vw(57px);
			.name {
      	font-size: vw(38px);
				margin-bottom: vw(4px);
			}
			.des {
				font-size: vw(24px);
				.level,
				.type {
					span {
	          height: vw(42px);
	          line-height: vw(40px);
	          padding: 0 vw(11px);
	          border: vw(2px) solid #333;
	          border-radius: 0 vw(10px);
					}
				}
	      .level {
	        margin-bottom: vw(8px);
	      }
			}
		}
	}
}
</style>