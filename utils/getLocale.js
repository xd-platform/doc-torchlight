function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
      }
  }
  return '';
}

const regionTargetLangMap = {
  //国家：语言
  CN: 'zh-cn', // 中国大陆
  HK: 'zh-tw', // 中国香港
  TW: 'zh-tw', // 中国台湾
  US: 'en',
  KR: 'ko', // ko	朝鲜语
  JP :'ja', // ja	日语
  TH :'th', // th	泰语
  ID :'id', // id	印度尼西亚语 // Bahasa Indonesia
  VN :'vi', // vi	越南语
  RU :'ru', // ru	俄语
  PT :'pt', // pt	葡萄牙语
  FR :'fr', // fr	法语
  ES :'es', // es	西班牙语
  DE :'de', // de	德语
};

function getRegion() {
  let _region = getCookie('xd-region');
  let inTW = 'torchlight.starforce.tw'.indexOf(window.location.host) > -1;
  if(inTW) {
    _region = 'TW'
  }
  
  return _region
}

function getLocale() {
  let REGION = getRegion();
  let locale = 'en';
  
  if(REGION) {
    locale = regionTargetLangMap[REGION];
  }

  return locale;
}

export {
  getCookie,
  regionTargetLangMap,
  getRegion,
  getLocale
};