<template>
	<div class="characteristic-box" v-if="skillInfo && skillInfo.length != 0">
		<ul class="list">
			<li v-for="(row, i) in skillInfo" :key="i">
				<div class="level-box">
					<div class="level">{{ row.level }}</div>
				</div>
				<ol>
					<li
						v-for="(skill, j) in row.skills"
						:key="j"
						:style="{ 'margin-left': `${-24 * j - 11}px` }"
						:class="{ active: skill.CharacterId == id }"
						@click="switchSkill(skill.CharacterId)"
					>
						<div class="icon" :style="{ 'background-image': `url(${skill.Icon})` }"></div>
					</li>
				</ol>
			</li>
		</ul>
		<div class="desc-box" v-if="skill && Object.keys(skill).length != 0">
			<div class="bg"></div>
			<div class="title-box">
				<div class="title">
					<div class="icon-box">
						<div class="icon" :style="{ 'background-image': `url(${skill.Icon})` }"></div>
					</div>
					<div class="name">{{ skill.Name }}</div>
				</div>
			</div>
			<div class="desc">
				<p v-for="(des, i) in skill.DescMax.replaceAll('\\n', '\n').split('\n')" :key="i">{{ des }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		name: {
			typeof: String,
			default: () => ''
		},
		info: {
			default: Array,
			default: () => []
		}
	},
	data() {
		return {
			id: '',
			skillInfo: []
		}
	},
	computed: {
		skill() {
			if(this.id) {
				return this.info.find((item) => item.CharacterId == this.id)
			}else {
				return {}
			}
		}
	},
	created() {
		this.format()
	},
	methods: {
		switchSkill(characterId) {
			this.id = characterId
		},
		format() {
			if(this.info && this.info.length != 0) {
				let _list = []

				this.info.forEach(item => {
					const level = item.Level
					const levelObj = _list.find((el) => el.level == level)
					if(!levelObj) {
						const obj = {
							level: level,
							skills: []
						}
						obj.skills.push(item)
						_list.push(obj)
					}else {
						levelObj.skills.push(item)
					}
				});

				_list = _list.sort(function(a, b){return a['level'] - b['level']})

				if(_list && _list[0] && _list[0].skills && _list[0].skills.length != 0) {
					this.id = _list[0].skills[0].CharacterId
				}

				this.skillInfo = _list
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.characteristic-box {
	width: 453px;
	height: 500px;
	.list {
		display: flex;
		justify-content: center;
		>li {
			margin: 0 10px;
			.level-box {
				position: relative;
				width: 60px;
				margin: 0 auto 11px;
				&::after {
					content: '';
					width: 60px;
					height: 14px;
					background-color: #FFEAC6;
					transform: skewX(-10deg);
					position: absolute;
			    left: 0;
			    bottom: 0;
				}
				.level {
					position: relative;
					width: 100%;
					color: #333;
					font-weight: 600;
					font-size: 24px;
					text-align: center;
					z-index: 1;
				}
			}
			ol {
				width: 74px;
				>li {
					position: relative;
					width: 74px;
					height: 74px;
					transform: skewX(-15deg);
					background-color: #FFC62C;
					margin-bottom: 17px;
					cursor: pointer;
					overflow: hidden;
					transition: all ease-in-out 200ms;
					.icon {
						width: 94px;
						height: 74px;
						background-color: #3a3a3a;
						transform: skewX(15deg);
						margin-left: -10px;

						background-position: center;
						background-repeat: no-repeat;
						background-size: cover;
					}

					&.active {
						box-shadow: 0px 0px 4px 4px #ace3ff
					}
				}
			}
		}
	}
	.desc-box {
		position: absolute;
		bottom: 48px;
		left: -75px;
		width: 450px;
		height: 200px;
		margin-top: 25px;
		.bg {
			position: absolute;
	    top: -20px;
	    left: -38px;
			width: 516px;
			height: 240px;
			@include imgBg('introBgMin.png', 'introBgMin_2x.png');
		}
		.title-box {
			position: relative;
			display: flex;
			justify-content: center;
		}
		.title {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.icon-box {
				width: 50px;
				height: 50px;
				transform: skewX(-15deg);
				background-color: #FFC62C;
				overflow: hidden;
				margin-right: 15px;
				.icon {
					width: 64px;
					height: 50px;
					// width: 94px;
					// height: 74px;
					background-color: #3a3a3a;
					transform: skewX(15deg);
					margin-left: -7px;

					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
				}
			}
			.name {
				font-size: 24px;
				// font-size: 32px;
				color: #111;
				font-weight: 900;
				line-height: 35px;
			}
		}
		.desc {
			position: relative;
			width: 373px;
			height: 135px;
	    overflow-x: hidden;
	    overflow-y: scroll;
			color: #111;
			font-size: 14px;
			margin: 12px 0 0 25px;
			padding-right: 5px;
			white-space: break-spaces;
			line-height: 18px;
			p {
				margin-bottom: 5px;
			}
		}
	}
}

@media screen and (max-width: 828px) {
	.characteristic-box {
		width: 100%;
		height: vw(870px);
		.list {
			>li {
				margin: 0 vw(20px);
				.level-box {
					width: vw(100px);
					margin: 0 auto vw(15px);
					&::after {
						width: vw(100px);
						height: vw(24px);
						transform: skewX(0deg) skewY(-8deg);
					}
					.level {
						font-size: vw(36px);
					}
				}
				ol {
					width: vw(120px);
					>li {
						width: vw(120px);
						height: vw(120px);
						transform: skewX(0deg) skewY(-8deg);
						margin-bottom: vw(18px);
						margin-left: 0 !important;
						.icon {
							width: vw(120px);
							height: vw(140px);
							background-color: #3a3a3a;
							transform: skewX(0deg) skewY(8deg);
							margin-left: 0;
							margin-top: vw(-10px);
						}

						&.active {
							box-shadow: 0px 0px vw(6px) vw(6px) #ace3ff
						}
					}
				}
			}
		}
		.desc-box {
			width: vw(760px);
			height: vw(410px);
			bottom: vw(75px);
			left: 50%;
			margin-left: vw(-380px);
			background-color: #FFDD4B;
			margin-top: 0;
			.bg {
				display: none;
			}
			.title {
				margin: vw(30px) 0 vw(25px);
				.icon-box {
					width: vw(90px);
					height: vw(90px);
					transform: skewX(0deg) skewY(-8deg);
					.icon {
						width: vw(90px);
						height: vw(110px);
						margin-left: 0;
						margin-top: vw(-15px);
						transform: skewX(0deg) skewY(8deg);
					}
				}
			}
			.desc {
				width: vw(673px);
				height: vw(240px);
				margin: 0 auto;
				font-size: vw(24px);
				padding-right: vw(8px);
				line-height: vw(26px);
				p {
					margin-bottom: vw(10px);
				}
			}
		}
	}
}
</style>