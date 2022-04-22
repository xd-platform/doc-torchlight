<template>
  <LayoutWrapper class="character-detail">
		<MenuBar level="1" :menu="menuLevel1" v-model="id_level1"></MenuBar>
		<client-only>
			<div v-show="id_level1 === 'introduction'" class="introduction-content">
				<div v-if="intro && intro.introduce" class="content-des">
					<CharacterName :info="intro"></CharacterName>
					<CharacterIntroduce :info="intro.introduce" style="margin-top: 40px;"></CharacterIntroduce>
				</div>
				<div class="content-detail">
					<div
						v-if="intro && intro.theme"
						class="role"
						:style="{...getRetina(intro.theme.introBg, intro.theme.introBg_2x), 'transform': `scale(${scale})`}"
					></div>
				</div>
			</div>
			<div v-show="id_level1 === 'characteristic'" class="characteristic-content">
				<div class="content-des">
					<CharacterIntroduce v-model="sub_CH_name" :info="advanced"></CharacterIntroduce>
				</div>
				<div class="content-detail">
					<div
						v-if="intro && intro.theme"
						class="role"
						:style="{...getRetina(intro.theme.CHBg, intro.theme.CHBg_2x), 'transform': `scale(${scale})`}"
					>
						<CharacterFeature
							v-if="sub_CH && sub_CH.SkillList"
							class="feature"
							:name="sub_CH_name"
							:info="sub_CH.SkillList"
						></CharacterFeature>
					</div>
				</div>
			</div>
		</client-only>
	</LayoutWrapper>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
	data() {
		return {
			id: '',
			id_level1: 'introduction',
			CH: [],
			advanced: [],
			sub_CH_name: '',
			clientHeight: 0,
			scale: 1
		}
	},
	computed: {
    ...mapGetters(["getLocale", "getCharacterConfig", "getRetina", "getLocale"]),
		...mapState(["lang", "API"]),
		menuLevel1() {
			return [
				{ id: 'introduction', content: this.getLocale('character.introduction') },
				{ id: 'characteristic', content: this.getLocale('character.characteristic') },
			]
		},
		sub_CH() {
			if(this.CH && this.CH.length != 0 && this.sub_CH_name) {
				return this.CH.find((item) => item.Name === this.sub_CH_name)
			}else {
				return {}
			}
		},
		intro() {
			if(this.id) {
				return this.getCharacterConfig(this.id)
			}else {
				return {}
			}
		}
	},
	watch: {
		lang() {
			this.init()
		}
	},
  beforeMount() {
		this.init()
		
		window.onresize = this.handleResize
		this.handleResize()
  },
  methods: {
		init() {
    	this.id = $nuxt.$route.query.id;
    	this.getDetail(this.id);
		},
		handleResize() {
			const clientHeight = document.documentElement.clientHeight
			if(clientHeight !== this.clientHeight) {
				this.clientHeight = clientHeight
				if(this.clientHeight > 1080) {
					this.scale = this.clientHeight / 1080
				}else {
					this.scale = 1
				}
			}
		},
    getDetail(id) {
      this.$axios
        .get(this.API['character']['detail'], {
          params: {
            Language: this.lang,
            HeroId: id,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data) {
            this.CH = res.data;
						if(this.CH && this.CH.length != 0) {
							this.sub_CH_name = this.CH[0].Name

							// 进阶特性
							this.advanced = []
							const _advanced = {
								title: this.getLocale("character.advanced"),
								list: []
							}
							this.CH.forEach(item => {
								const obj = {
									name: item.Name,
									icon: item.Icon,
									desc: item.TotalContent.replaceAll('\\n', '\n').split('\n')
								}
								_advanced.list.push(obj)
							});
							this.advanced.push(_advanced)
						}
          }
        });
    },
  },
}
</script>

<style lang="scss" scoped>
.introduction-content,
.characteristic-content {
	display: flex;
	justify-content: flex-start;
	.content-des {
		width: 560px;
	}
	.content-detail {
		flex: 1;
		position: relative;
		.role {
			position: absolute;
	    top: -196px;
	    left: -165px;
			width: 879px;
			height: 1080px;
			background-position: center;
			background-repeat: no-repeat;
			background-size: contain;

			transform-origin: 10% 4%;
		}
	}
}

.characteristic-content {
	.content-detail {
		position: relative;
		.feature {
			position: absolute;
			bottom: 40px;
			left: 205px;
		}
	}
}
</style>