
import LOCALES from '@/assets/js/locales';

export const state = () => ({
  lang: '',
  LOCALES: LOCALES,
  device: 'PC',
})

export const mutations = {
  SETLANG(state, lang) {
    state.lang = lang
  },
}

export const getters = {
  getLocale: ({LOCALES, lang}) => (id) => {
    let str = ''
    if(LOCALES[lang] && LOCALES[lang][id]) {
      str = LOCALES[lang][id]
    }else {
      str = ''
    }
  
    return str
  }
}