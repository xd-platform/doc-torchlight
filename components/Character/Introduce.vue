<template>
	<ul v-if="info" class="introduce-box">
		<li v-for="(item, i) in info" :key="i">
			<div class="title">{{ item.title }}</div>
			<ul class="skill" v-if="item.list">
				<li
					v-for="(skill, j) in item.list"
					:key="j"
					:class="{ active: skill.name === name }"
      		@click="$emit('handler', skill.name)"
				>
					<div class="icon" :style="{ 'background-image': `url(${skill.icon})` }"></div>
					<div class="name">{{ skill.name }}</div>
				</li>
			</ul>
			<div class="desc" v-if="desc && desc.length != 0">
				<p v-for="(des, j) in desc" :key="j" style="margin-bottom: 8px">{{ des }}</p>
			</div>
			<div class="desc" v-if="item.desc">
				<p v-for="(des, j) in item.desc" :key="j">{{ des }}</p>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
	model: {
    prop: 'name',
    event: 'handler'
  },
	props: {
		info: {
			typeof: Object,
			default: () => {}
		},
    name: {
      typeof: String,
      default: () => ''
    }
	},
	computed: {
		desc() {
			if(this.info && this.info.length != 0) {
				const info = this.info[0]
				if(info && info.length != 0 && info.list && info.list.length != 0) {
					return info.list.find((item) => item.name === this.name)['desc']
				}else {
					return []
				}
			}else {
				return []
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.introduce-box {
	width: 450px;
	li {
		margin-bottom: 30px;
		.title {
			display: inline-block;
			min-width: 120px;
			height: 32px;
			line-height: 32px;
			background-color: #307EFF;
			color: #fff;
			padding: 0 5px;
			text-align: center;
			margin-bottom: 15px;
			font-weight: 700;
		}
		.desc {
			font-size: 14px;
			color: #fff;
			p {
				margin-bottom: 15px;
			}
		}

		.skill {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			margin-top: 35px;
			li {
				width: 100px;
				margin-right: 75px;
				cursor: pointer;
				.icon {
					position: relative;
					width: 75px;
					height: 75px;
					border-radius: 50%;
					background-color: #3a3a3a;
					margin: 0 auto;
					
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
					&::before {
						content: '';
						width: 101px;
						height: 101px;
						@include imgBg('default.png', 'default_2x.png');
						position: absolute;
						top: -13px;
						left: -13px;
						transition: all ease-in-out 200ms;
					}
					&::after {
						content: '';
						width: 102px;
						height: 107px;
						@include imgBg('active.png', 'active_2x.png');
						position: absolute;
						top: -19px;
				    left: -13px;
						opacity: 0;
						transition: all ease-in-out 200ms;
					}
				}
				.name {
					width: 130%;
			    position: relative;
			    left: 50%;
			    transform: translate3d(-50%, 0, 0);
					font-weight: bolder;
					color: #fff;
					text-align: center;
					margin-top: 28px;
					font-size: 18px;
					transition: all ease-in-out 200ms;
				}

				&.active {
					.icon {
						&::before {
							opacity: 0;
						}
						&::after {
							opacity: 1;
						}
					}
					.name {
						color: #FFC130;
					}
				}
			}
		}
	}
}

@media screen and (max-width: 828px) {
	.introduce-box {
		width: 100%;
		li {
			margin-bottom: vw(38px);
			.title {
				min-width: vw(150px);
				height: vw(56px);
				line-height: vw(54px);
				padding: 0 vw(20px);
				margin-bottom: vw(30px);
				font-size: vw(32px);
			}
			.desc {
				font-size: vw(24px);
				p {
					margin-bottom: vw(10px);
				}
			}

			.skill {
				margin-top: vw(50px);
				li {
					width: vw(160px);
					margin-right: vw(115px);
					.icon {
						width: vw(120px);
						height: vw(120px);
						&::before {
							content: '';
							width: vw(160px);
							height: vw(160px);
							top: vw(-20px);
							left: vw(-20px);
						}
						&::after {
							width: vw(163px);
							height: vw(170px);
							top: vw(-30px);
					    left: vw(-20px);
						}
					}
					.name {
						font-size: vw(28px);
						margin-top: vw(50px);
					}
				}
			}
		}
	}
}
</style>