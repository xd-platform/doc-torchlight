<template>
  <LayoutCell :title="title">
		<div class="inner">
			<!-- 网格线 -->
			<div
				v-if="info.SubDetailList && info.SubDetailList.length != 0"
				class="line-box"
				:class="`num-${info.SubDetailList.length}`"
			>
				<div class="row" v-for="i in 4" :key="i" :name="i">
					<div class="line" v-for="i in 2" :key="i" :name="i"></div>
				</div>
			</div>
			<!-- 天赋点 -->
			<div class="talent-item">
				<div class="info">
					<div class="logo">
						<div class="icon" :style="{ 'background-image': `url(${info.Icon})` }"></div>
					</div>
					<div class="desc">
						<div class="name">{{ info.Name }}</div>
						<div class="content" v-html="htmlContent"></div>
					</div>
				</div>
				<ul v-if="info.SubDetailList && info.SubDetailList.length != 0" class="talent-child" name="1">
					<Poptip
						trigger="hover"
						placement="right-start"
						padding="0px 0px"
						content="content"
						v-for="(item ,i) in info.SubDetailList.slice(0, 3)"
						:key="i"
					>
						<li>
							<div class="icon" :style="{ 'background-image': `url(${item.Icon})` }"></div>
							<div class="name">{{ item.Name }}</div>
						</li>
						<div class="tip" slot="content">
							<div class="title">{{ item.Name }}</div>
							<div class="des">{{ item.Content }}</div>
						</div>
					</Poptip>
				</ul>
				<ul v-if="info.SubDetailList && info.SubDetailList.length != 0" class="talent-child" name="2">
					<Poptip
						trigger="hover"
						placement="right-start"
						padding="0px 0px"
						content="content"
						v-for="(item ,i) in info.SubDetailList.slice(3, 6)"
						:key="i"
					>
						<li>
							<div class="icon" :style="{ 'background-image': `url(${item.Icon})` }"></div>
							<div class="name">{{ item.Name }}</div>
						</li>
						<div class="tip" slot="content">
							<div class="title">{{ item.Name }}</div>
							<div class="des">{{ item.Content }}</div>
						</div>
					</Poptip>
				</ul>
			</div>
		</div>
	</LayoutCell>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
	computed: {
		htmlContent() {
			let content = this.$props.info.Content;
			if(content) {
				return content.replaceAll('\\n', '\n');
			}else {
				return ''
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.inner {
	width: 100%;
	height: 100%;
	position: relative;
}
.talent-item {
	position: relative;
	height: 416px;
  padding: 23px 38px;
	display: flex;
	justify-content: flex-start;
	.info {
		width: 147px;
		.logo {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 83px;
			height: 83px;
			background-image: url('@/assets/imgs/talent_logo.png');
			background-position: center;
			background-repeat: no-repeat;
			background-size: contain;
			@media (-webkit-min-device-pixel-ratio: 2) {
				background-image: url('@/assets/imgs/talent_logo_2x.png');
			}

			>.icon {
				width: 50px;
				height: 50px;
				background-position: center;
				background-repeat: no-repeat;
				background-size: contain;
			}
		}
		.desc {
			margin-top: 20px;
			.name {
				font-size: 20px;
				color: #FFC130;
				font-weight: bold;
			}
			.content {
				white-space: pre-wrap;
				font-size: 12px;
				color: #999;
				line-height: 18px;
				margin-top: 10px;
			}
		}
	}
	.talent-child {
		width: 68px;
		position: relative;
		margin-top: 10px;
		>div {
			position: absolute;
			&:nth-child(1) {
				top: 0;
			}
			&:nth-child(2) {
				top: 119px;
			}
			&:nth-child(3) {
				top: 238px;
			}
		}

		li {
			cursor: pointer;
			>.icon {
				width: 68px;
				height: 68px;
				background-color: #111;
				border: 4px solid #111;
				border-radius: 50%;
				transition: all ease-in-out 200ms;
			}
			>.name {
				font-size: 14px;
				color: #999;
				width: 68px;
				line-height: 15px;
				text-align: center;
				margin-top: 8px;
			}

			&:hover {
				>.icon {
					border-color: #FFC130;
				}
			}
		}

		&[name="1"] {
			margin-left: 100px;
		}
		&[name="2"] {
			margin-left: 117px;
		}

		.tip {
			width: 294px;
			padding: 20px 15px 30px;
			background-color: #111;
			border-radius: 0 20px;
			.title {
				width: 100%;
				border-bottom: 1px solid #333;
				color: #FFC130;
				padding: 0 8px 15px;
				font-size: 18px;
				font-weight: bold;
			}
			.des {
				color: #fff;
				margin-top: 16px;
				white-space: initial;
				padding: 0 8px;
			}
		}
	}
}


.line-box {
	position: absolute;
	top: 68px;
	left: 100px;
	width: 385px;
	height: 240px;

	display: flex;
	.row {
		display: flex;
		flex-direction: column;
		&[name="1"] { width: 134px; }
		&[name="2"] { width: 85px; }
		&[name="3"] { width: 85px; }
		&[name="4"] { flex: 1; }
		.line {
			&[name="1"] { height: 122px; }
			&[name="2"] { flex: 1; }
		}
	}

	&.num-1 {
		.row {
			&[name="1"],
			&[name="2"] {
				.line[name="1"] { border-top: 2px solid #666; }
			}
		}
	}
	&.num-2 {
		.row {
			&[name="1"] {
				.line[name="1"] { border-top: 2px solid #666; }
			}
			&[name="2"] {
				.line[name="1"] { border: 2px solid #666; border-right: none;}
			}
		}
	}
	&.num-3 {
		.row {
			&[name="1"] {
				.line[name="1"] { border-top: 2px solid #666; }
			}
			&[name="2"] {
				.line { 
					&[name="1"] { border: 2px solid #666; border-right: none;}
					&[name="2"] { border-left: 2px solid #666; border-bottom: 2px solid #666;}
				}
			}
		}
	}
	&.num-4 {
		.row {
			&[name="1"] {
				.line[name="1"] { border-top: 2px solid #666; }
			}
			&[name="2"] {
				.line { 
					&[name="1"] { border: 2px solid #666; border-right: none;}
					&[name="2"] { border-left: 2px solid #666; border-bottom: 2px solid #666;}
				}
			}
			&[name="3"] {
				.line[name="1"] { border: 2px solid #666; border-left: none; }
			}
			&[name="4"] {
				.line[name="1"] { border-top: 2px solid #666; }
			}
		}
	}
	&.num-5 {
		.row {
			&[name="1"] {
				.line[name="1"] { border-top: 2px solid #666; }
			}
			&[name="2"] {
				.line { 
					&[name="1"] { border: 2px solid #666; border-right: none;}
					&[name="2"] { border-left: 2px solid #666; border-bottom: 2px solid #666;}
				}
			}
			&[name="3"] {
				.line {
					&[name="1"] { border: 2px solid #666; border-left: none; }
					&[name="2"] { border-right: 2px solid #666; border-bottom: 2px solid #666; }
				}
			}
			&[name="4"] {
				.line[name="1"] { border-top: 2px solid #666; border-bottom: 2px solid #666; }
			}
		}
	}
	&.num-6 {
		.row {
			&[name="1"] {
				.line[name="1"] { border-top: 2px solid #666; }
			}
			&[name="2"] {
				.line { 
					&[name="1"] { border: 2px solid #666; border-right: none;}
					&[name="2"] { border-left: 2px solid #666; border-bottom: 2px solid #666;}
				}
			}
			&[name="3"] {
				.line {
					&[name="1"] { border: 2px solid #666; border-left: none; }
					&[name="2"] { border-right: 2px solid #666; border-bottom: 2px solid #666; }
				}
			}
			&[name="4"] {
				.line {
					&[name="1"] { border-top: 2px solid #666; border-bottom: 2px solid #666; }
					&[name="2"] { border-bottom: 2px solid #666; }
				}
			}
		}
	}
}
</style>