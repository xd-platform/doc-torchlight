
import LOCALES from '@/assets/js/locales';
import API from '@/assets/js/api';

export const state = () => ({
  lang: '',
  LOCALES: LOCALES,
	API: API,
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