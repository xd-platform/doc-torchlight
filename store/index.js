
import LOCALES from '@/assets/js/locales';
import API from '@/assets/js/api';
import Vue from 'vue';

export const state = () => ({
  lang: '',
  LOCALES: LOCALES,
	API: API,
  device: 'PC',
  // 缓存用
  inventory: {},
  affix: {},
  talent: {}
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
  }
}

export const actions = {
  async getMenu({state, commit}, nav) {
    console.log(state[nav])
    let response = []
    if(state[nav]['menu'] && state[nav]['menu'].length != 0) {
      response = state[nav]['menu']
    }else {
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
    }

    const o = { nav: nav, cacheId: 'menu', content: response || [] }
    commit('SETCACHE', o)

    return response;
  },
  async getList({state, commit}, payload) {
    console.log(state[payload.nav])
    let response = []
    if(
      state[payload.nav][payload.id] &&
      state[payload.nav][payload.id].length != 0
    ) {
      response = state[payload.nav][payload.id]
    }else {
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
    }

    const o = { nav: payload.nav, cacheId: payload.id, content: response || [] }
    commit('SETCACHE', o)

    return response;
  }
}