import languages from './languages';

const i18nOptions = {
  locales: Object.keys(languages),
  defaultLocale: 'en',
  strategy: 'no_prefix',
  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      // zh	中文
      'zh-cn': require('../locales/zh_CN.json'),
      'zh-tw': require('../locales/zh_TW.json'),
      'zh-hk': require('../locales/zh_TW.json'), // 兼容香港地区
      //英文
      en: require('../locales/en_WW.json'),
      // fi_FI fi 芬兰语(芬兰)
      // fi: require('../locales/fi_FI.json'),
      // da_DK da 丹麦语(丹麦)
      // da: require('../locales/da_DK.json'),
      // he_IL he 希伯来语(以色列)
      // he: require('../locales/he_IL.json'),
      // ko_KR ko 韩文(韩国)
      ko: require('../locales/ko_KR.json'),
      // ja_JP ja 日语(日本)
      ja: require('../locales/ja_JP.json'),
      // nl_NL nl 荷兰语(荷兰)
      // nl: require('../locales/nl_NL.json'),
      // pt_PT pt 葡萄牙语(葡萄牙)
      pt: require('../locales/pt_PT.json'),
      // fr_FR fr 法语(法国)
      fr: require('../locales/fr_FR.json'),
      // es_ES es 西班牙语(西班牙)
      es: require('../locales/es_ES.json'),
      // de_DE de 德语(德国)
      de: require('../locales/de_DE.json'),
      // ru_RU ru 俄语(俄罗斯)
      ru: require('../locales/ru_RU.json'),
      // it_IT it 意大利语(意大利)
      // it: require('../locales/it_IT.json'),
      // el_GR el 希腊语(希腊)
      // el: require('../locales/el_GR.json'),
      // no_NO  挪威语(挪威)  nb-NO *
      // nb: require('../locales/no_NO.json'),
      // hu_HU hu 匈牙利语(匈牙利)
      // hu: require('../locales/hu_HU.json'),
      // tr_TR tr 土耳其语(土耳其)
      // tr: require('../locales/tr_TR.json'),
      // cs_CZ cs 捷克语(捷克共和国)
      // cs: require('../locales/cs_CZ.json'),
      // sl_SL sl 斯洛文尼亚语 sl-SI *
      // sl: require('../locales/sl_SL.json'),
      // pl_PL pl 波兰语(波兰)
      // pl: require('../locales/pl_PL.json'),
      // sv_SE sv 瑞典语(瑞典)
      // sv: require('../locales/sv_SE.json'),
      // 越南语
      vi: require('../locales/vi.json'),
      // 泰语
      th: require('../locales/th.json'),
      // 印尼语
      id: require('../locales/id.json'),
      // 阿拉伯语
      // ar: require('../locales/ar.json'),
    }
  }
}


export default i18nOptions;
