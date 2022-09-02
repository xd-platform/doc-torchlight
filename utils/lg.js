// 判断是否为有效数据
const datavalidator = function (o) {
  if(o || o === '' || o === 0) {
    return true;
  }else {
    return false
  }
}

// 取不到值时的处理 + 取到的值为'' 0 空状态的处理
const dataHandler = function (_data, callback) {
  if(!_data) {
    // 当_data为0或''或null时，优先callback数据
    if(datavalidator(callback)) {
      if(typeof callback === 'function') {
        return callback();
      } else {
        return callback;
      }
    }
    return _data
  }
  return _data
}


export default function lg(origin, keys, callback) {
  let data = origin;
  
  const arrKeys = keys.split('.');
  for(const key of arrKeys) {
    if(datavalidator(data[key])) {
      data = data[key]
    }else {
      data = null;
      break
    }
  }
  data = dataHandler(data, callback);
  return data;
};
