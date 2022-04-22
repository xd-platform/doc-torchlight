
import LOCALES from '@/assets/js/locales';
import API from '@/assets/js/api';
import Vue from 'vue';

export const state = () => ({
  lang: '',
  LOCALES: LOCALES,
	API: API,
  device: 'PC',
	env: '',
	loading: true,
  // 缓存用
  inventory: {},
  affix: {},
  talent: {},
	character: {},
	// 角色配置json
	characterConfig: [],
	// 屏幕倍率
	devicePixelRatio: 0
})

export const mutations = {
  SETLANG(state, lang) {
    state.lang = lang
  },
  SETCACHE(state, o) {
    // 数据做缓存处理
    Vue.set(state[o.nav], o.cacheId, o.content)
  },
  EMPTYSTATE(state) {
    state.inventory = {}
    state.affix = {}
    state.talent = {}
  },
	SETDEVICEPIXELRATIO(state, ratio) {
		state.devicePixelRatio = ratio
	},
	SETCHARACTERCONFIG(state, config) {
		state.characterConfig = config
	},
	SETLOADING(state, bool) {
		state.loading = bool
	},
	SETENV(state, e) {
		state.env = e
	}
}

export const getters = {
  getLocale: ({LOCALES, lang}) => (id) => {
    let str = ''
    if(LOCALES[lang]) {
			str = LOCALES[lang]
			const id_list = id.split('.')
			id_list.forEach(item => {
				str = str[item]
			});
    }else {
      str = ''
    }
  
    return str
  },
	getRetina: ({devicePixelRatio}) => (src, src_retina) => {
		if(devicePixelRatio) {
			if(src && src_retina) {
				return { 'background-image': `url(${devicePixelRatio == 1 ? src : src_retina})` }
			}else {
				return { 'background-image': `url(${src})` }
			}
		}else {
			return ''
		}
	},
	getCharacterConfig: ({characterConfig}) => (id) => {
		if(characterConfig && characterConfig.length != 0) {
			return characterConfig.find((info) => info.id === id)
		}else {
			return {}
		}
	}
}

export const actions = {
  async getMenu({state, commit}, nav) {
    console.log(state[nav])
    let response = []
    if(state[nav]['menu'] && state[nav]['menu'].length != 0) {
      response = state[nav]['menu']
    }else {
			commit('SETLOADING', true)
      response = await this.$axios
        .get(state.API[nav]['menu'], {
          params: {
            Language: state.lang,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            const data = res.data;
            if(data) {
              if(
                data.subMenu &&
                (nav == 'inventory' || nav == 'affix')
              ) {
                return data.subMenu;
              }else if(nav == 'talent') {
                return data;
              }
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
			
			commit('SETLOADING', false)
    }

    const o = { nav: nav, cacheId: 'menu', content: response || [] }
    commit('SETCACHE', o)

    return response;
  },
  async getList({state, commit}, payload) {
    let response = []
    if(
      state[payload.nav][payload.id] &&
      state[payload.nav][payload.id].length != 0
    ) {
      response = state[payload.nav][payload.id]
    }else {
			commit('SETLOADING', true)
      response = await this.$axios
        .get(state.API[payload.nav]['list'], {
          params: {
            Language: state.lang,
            ContentList: payload.id,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data) {
            return res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
			
			commit('SETLOADING', false)
    }

    const o = { nav: payload.nav, cacheId: payload.id, content: response || [] }
    commit('SETCACHE', o)

    return response;
  },
	async getTheme({state, commit}, nav) {
		let response = []
		let key = ''
		if(state.lang == 'en_WW') {
			key = 'themeEn'
		}else if(state.lang == 'zh_CN') {
			key = 'theme'
		}

		let envKey = ''
		if(state.env === 'dev') {
			envKey = '_dev'
		}

		if(state[nav][key+envKey] && state[nav][key+envKey].length != 0) {
			commit('SETCHARACTERCONFIG', state[nav][key+envKey])
		}else {
			commit('SETLOADING', true)
			response = await this.$axios
				.get(state.API[nav][key+envKey])
				.then((res) => {
					if(res.status == 200 && res.data) {
						try {
							const jsonData = JSON.parse(JSON.stringify(res.data))
							commit('SETCHARACTERCONFIG', jsonData)
							return jsonData
						} catch(e) {
							console.log(e)
							return []
						}
					}
				})
			
			commit('SETLOADING', false)

			const o = { nav: nav, cacheId: key+envKey, content: response || [] }
			commit('SETCACHE', o)
		}
	}
}