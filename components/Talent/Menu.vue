<template>
  <ul class="talent-menu">
    <li
      v-for="(item, key) in menu"
      :key="key"
      :id="item.Id"
      :class="{ active: item.Id == id }"
      @click="$emit('handler', item.Id)"
    >
      <div class="icon" :style="{ 'background-image': `url(${item.Icon})` }"></div>
      <div class="name">{{ item.Name }}</div>
    </li>
  </ul>
</template>


<script>
export default {
  model: {
    prop: 'id',
    event: 'handler'
  },
  props: {
    level: {
      typeof: String,
      default: () => '1'
    },
    menu: {
      typeof: Array,
      default: () => []
    },
    id: {
      typeof: String,
      default: () => ''
    }
  }
}
</script>

<style lang="scss" scoped>
.talent-menu {
  width: 100%;
  height: 234px;
  background-color: #222;
  display: flex;
  justify-content: space-around;
  li {
    width: 118px;
    height: 100%;
    cursor: pointer;
    .icon {
      position: relative;
      width: 118px;
      height: 118px;
      border: 4px solid #2B2A2A;
      border-radius: 50%;
      margin-top: 24px;
			background-position: center;
			background-repeat: no-repeat;
			background-size: 75% 75%;
      background-color: #111;
      &::before {
        content: '';
        position: absolute;
        bottom: -23px;
        left: 50%;
        margin-left: -5px;
        border-width: 10px 5px;
        border-color: transparent;
        border-style: solid;
      }
    }
    .name {
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      color: #fff;
      margin-top: 20px;
      font-weight: bold;
    }

    &.active {
      .icon {
        border-color: #FFC130;
        &::before {
          border-color: #FFC130 transparent transparent transparent;
        }
      }
      .name {
        color: #FFC130;
      }
    }
  }
}

@media screen and (max-width: 828px) {
	.talent-menu {
  	width: vw(750px);
		height: vw(227px);
		margin: 0 auto;
  	justify-content: center;
		li {
			position: relative;
			width: vw(100px);
			margin: 0 vw(8px);
			.icon {
				width: vw(100px);
				height: vw(100px);
      	border: vw(4px) solid #2B2A2A;
				margin-top: vw(30px);
	      &::before {
	        bottom: vw(-30px);
	        margin-left: vw(-8px);
	        border-width: vw(14px) vw(8px);
	      }
			}
			.name {
				position: absolute;
				left: 50%;
				transform: translate3d(-50%, 0, 0);
				width: vw(150px);
				text-align: center;
				font-size: vw(28px);
				line-height: vw(28px);
				margin-top: vw(28px);
				opacity: 0;
			}

			&.active {
				.name {
					opacity: 1;
					transition: all ease-in-out 200ms;
				}
			}
		}
	}
}
</style>