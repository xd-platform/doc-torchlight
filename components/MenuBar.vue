<template>
	<div :class="`menu-level${level}`" v-if="menu && menu.length != 0">
	  <ul class="menu-box">
	    <li
	      v-for="(item, key) in menu"
	      :key="key"
	      :id="item.id"
	      :class="{ active: item.id == id }"
	      @click="$emit('handler', item.id)"
	    >{{ item.content }}</li>
	  </ul>
	</div>
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
.menu-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  li {
    position: relative;
    display: flex;
    cursor: pointer;
    white-space: nowrap;
  }
}

.menu-level1 {
	.menu-box {
	  padding-bottom: 11px;
	  border-bottom: 1px solid #557BAD;
	  margin-bottom: 25px;
	  li {
			min-width: 80px;
	    justify-content: center;
	    height: 49px;
	    padding: 0 10px;
	    background-color: #111;
	    color: #fff;
	    font-size: 16px;
	    font-weight: bold;
	    margin-right: 10px;
	    align-items: center;
	    &.active {
	      background-color: #FFC130;
	      color: #111;
	    }
	  }
	}
}

.menu-level2 {
	.menu-box {
	  margin-bottom: 16px;
	  li {
	    height: 30px;
	    margin-right: 28px;
	    color: #fff;
	    font-size: 16px;
	    align-items: flex-start;
	    &::before {
	      content: '';
	      width: 67.6%;
	      height: 3px;
	      background-color: transparent;
	      position: absolute;
	      bottom: 0;
	      left: 50%;
	      margin-left: -33.8%;
	    }
	    &.active {
	      color: #FFC130;
	      &::before {
	        background-color: #FFC130;
	      }
	    }
	  }
	}
}
.menu-level3 {
	.menu-box {
	  margin-bottom: 16px;
	  li {
	    height: 32px;
	    padding: 0 11px;
	    background-color: #222;
	    color: #666;
	    font-size: 14px;
	    margin: 0 5px 5px 0;
	    align-items: center;
	    border: 1px solid #444;
	    &.active {
	      border: 1px solid #FFC130;
	      color: #FFC130;
	      z-index: 1;
	    }
	  }
	}
}
.menu-level4 {
	.menu-box {
	  margin-bottom: 16px;
	  li {
	    height: 32px;
	    padding: 0 7px;
	    background-color: #222;
	    color: #666;
	    font-size: 14px;
	    margin-right: 8px;
	    align-items: center;
	    border-radius: 5px;
	    &.active {
	      background-color: #307EFF;
	      color: #fff;
	    }
	  }
	}
}

@media screen and (max-width: 828px) {
	.menu-level1 {
		overflow-x: scroll;
		overflow-y: hidden;
		@include hideScrollBar;
		.menu-box {
			width: fit-content;
			min-width: 100%;
			flex-wrap: nowrap;
			padding-bottom: vw(12px);
			margin-bottom: vw(20px);
	  	border-bottom: vw(2px) solid #557BAD;
			justify-content: center;
			li {
				min-width: vw(100px);
				height: vw(68px);
				padding: 0 vw(20px);
				font-size: vw(28px);
				margin: 0 vw(7px) vw(14px);
				&:first-child {
					margin-left: vw(20px);
				}
				&:last-child {
					margin-right: vw(20px);
				}
			}
		}
	}

	.menu-level2 {
		overflow-x: scroll;
		overflow-y: hidden;
		@include hideScrollBar;
		.menu-box {
			width: fit-content;
			min-width: 100%;
			flex-wrap: nowrap;
			font-weight: 600;
			margin: 0 vw(22px) vw(30px) 0;
			li {
				height: vw(55px);
				margin: 0 vw(19px);
				font-size: vw(28px);
				&::before {
					height: vw(6px);
				}
			}
		}
	}

	.menu-level3 {
		width: vw(750px);
		margin: 0 auto;
		.menu-box {
		  margin-bottom: vw(30px);
			li {
				height: vw(56px);
				padding: 0 vw(30px);
				font-size: vw(24px);
				margin: 0 vw(10px) vw(10px) 0;
	   		border: vw(2px) solid #444;
				&.active {
	      	border: vw(2px) solid #FFC130;	
				}
			}
		}
	}
}

</style>