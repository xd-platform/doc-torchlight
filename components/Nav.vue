<template>
  <div class="header">
    <div class="wrapper">
      <div class="nav-box">
        <div class="logo" >
					<div v-show="lang" :class="`icon ${lang}`"></div>
				</div>
        <ul class="nav-list">
          <li 
            v-for="item in navList" 
            :key="item.id"
            :class="{ active: item.id == subNav }"
          >
            <nuxt-link :to="`/${item.id}?lang=${lang}`">{{ item.name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="tools-box">
        <div class="logo" >
					<div v-show="lang" :class="`icon ${lang}`"></div>
				</div>
				<div class="tools">
	        <Poptip
	          :trigger="device === 'pc' ? 'hover' : 'click'"
	          placement="bottom"
	          content="content"
	          v-model="visible"
	        >
	          <div class="icon"></div>
	          <ul class="language" slot="content">
	            <li
	              v-for="(item, i) in language"
	              :key="i"
	              :class="{ active: lang == item.id }"
	              @click="switchLang(item.id)"
	            >{{ item.name }}</li>
	          </ul>
	        </Poptip>
	        <div class="home">
						<a href="https://torchlight.xd.com" target="_blank"></a>
					</div>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
			hideNavList: ['character'],
      subNav: '',
      language: [
        { name: '简体中文', id: 'zh_CN' },
        { name: 'English', id: 'en_WW' },
      ],
      visible: false
    }
  },
  computed: {
    ...mapState(['lang', 'LOCALES', 'device']),
    ...mapGetters(["getLocale"]),
    navList() {
      return [
				{ id: 'character', name: this.getLocale("nav.character") },
				{ id: 'inventory', name: this.getLocale("nav.inventory") },
				// { id: 'skill', name: this.getLocale("nav.skill") },
				{ id: 'affix', name: this.getLocale("nav.affix") },
				{ id: 'talent', name: this.getLocale("nav.talent") },
			]
    },
  },
  watch: {
    '$nuxt.$route.name': {
      handler($name) {
        if($name) {
          this.subNav = $name.split('-')[0];
					this.initTheme()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapMutations(['SETLANG', 'EMPTYSTATE', 'SETSHOWNAV']),
    ...mapActions(['getTheme']),
    switchLang(id) {
      this.visible = false
      this.updateRouteQuery('lang', id);
      this.SETLANG(id)
      this.EMPTYSTATE()

			this.initTheme()
    },
    updateRouteQuery(key, value) {
      let { query } = $nuxt.$route;
      if (query[key] == value) return;
      this.$router.replace({
          query: { ...query, [key]: value },
      });
    },
		async initTheme() {
			if(this.subNav == 'character') {
				await this.getTheme('character')
			}
		}
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 74px;
  background-color: #111;
  font-size: 20px;
  color: #999;
  z-index: 50;
  >.wrapper {
    width: 100%;
    height: 100%;
		padding: 0 79px 0 72px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
		.logo {
			width: 241px;
			height: 72px;
			.icon {
				width: 100%;
				height: 100%;
			}
		}
    .nav-box {
      display: flex;
      height: 100%;
      align-items: center;
      .logo {
        margin-right: 60px;
				.icon {
					&.zh_CN {
						@include imgBg('logo.png', 'logo_2x.png')
					}
					&.en_WW {
						@include imgBg('logoEn.png', 'logoEn_2x.png')
					}
				}
      }
      .nav-list {
        display: flex;
        height: 100%;
        li {
          margin: 0 5px;
          a {
            display: inline-block;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 20px;
            color: #999;
            font-weight: bolder;
          }
          &.active {
            a {
              background-color: #FFC130;
              color: #111;
              transition: all ease-in-out 200ms;
            }
          }
        }
      }
    }
    .tools-box {
	    height: 100%;
			.logo {
				display: none;
			}
			.tools {
	      display: flex;
	      align-items: center;
	      height: 100%;
	      .icon {
	        width: 35px;
	        height: 35px;
	        @include imgBg('local.png', 'local_2x.png');
	        cursor: pointer;
	      }
	      .home {
	        width: 35px;
	        height: 35px;
	        @include imgBg('home.png', 'home_2x.png');
	        cursor: pointer;
	        margin-left: 15px;
					a {
						display: inline-block;
						width: 100%;
						height: 100%;
					}
	      }

	      .language {
	        width: 160px;
	        background-color: #111;
	        padding: 10px 0;
	        li {
	          padding: 10px 0;
	          text-align: center;
	          cursor: pointer;
	          transition: all ease-in-out 200ms;
	          &:hover {
	            background-color: #222;
	          }

	          &.active {
	            color: #fff;
	          }
	        }
	      }
			}
    }
  }
}

@media screen and (max-width: 828px) {
	.header {
		height: vw(196px);
		font-size: vw(32px);
		>.wrapper {
			padding: 0;
			justify-content: flex-start;
			flex-direction: column-reverse;
			.logo {
				width: vw(375px);
				height: vw(127px);
				margin-left: vw(10px);
			}
			.nav-box {
				height: vw(88px);
				overflow-y: hidden;
    		overflow-x: scroll;
				@include hideScrollBar;

				.logo {
					display: none;
				}
				.nav-list {
					li {
						margin: 0 vw(10px);
						a {
							position: relative;
							padding: 0 vw(20px);
							font-weight: 600;
					    &::before {
					      content: '';
					      width: 67.6%;
					      height: vw(3px);
					      background-color: transparent;
					      position: absolute;
					      bottom: 0;
					      left: 50%;
					      margin-left: -33.8%;
					    }
						}
				    &.active {
							a {
								background-color: transparent;
					      color: #FFC130;
					      &::before {
					        background-color: #FFC130;
					      }
							}
				    }
					}
				}
			}
			.tools-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: vw(108px);
				.logo {
					display: block;
					.icon {
						&.zh_CN {
							@include imgBg('logo.png')
						}
						&.en_WW {
							@include imgBg('logoEn.png')
						}
					}
				}
				.tools {
					.icon {
						width: vw(60px);
						height: vw(60px);
					}
					.home {
						width: vw(60px);
						height: vw(60px);
						margin: 0 vw(30px) 0 vw(32px);
					}

					.language {
						width: vw(226px);
						padding: vw(10px) 0;
						li {
							padding: vw(10px) 0;
							font-size: vw(24px);
						}
					}
				}
			}
		}
	}
}

::v-deep .ivu-poptip {
  display: inherit;
}
::v-deep .ivu-poptip-popper {
  margin-top: 5px;
}
</style>