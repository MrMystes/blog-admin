const alps = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const uuid = () => {
  let s = []
  for (let i = 0; i < 7; i++) {
    s[i] = alps.substr(Math.floor(Math.random() * 62), 1)
  }
  return s.join('')
}

function getType(src) {
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (src instanceof Element) {
    return 'element';
  }
  return map[Object.prototype.toString.call(src)];
}

export const deepCopy = (src) => {
  let dst
  let type = getType(src)
  if (type === 'array') {
    dst = []
    for (var i = 0; i < src.length; i++) {
      dst.push(deepCopy(src[i]));
    }


  } else if (type === 'object') {
    dst = {}
    for (var key in src) {
      dst[key] = deepCopy(src[key]);
    }
  } else {
    //不再具有下一层次
    return src;
  }
  return dst;
}

export const Message = function(msg){
  let now = new Date()
  this.uniqueId = msg.uniqueId || uuid()
  this.title = msg.title || ''
  this.content = msg.content || ''
  this.description = msg.description || ''
  this.tag = msg.tag || ''
  this.createAt = msg.createAt || String(now.getTime())
  this.lastUpdate = msg.lastUpdate || String(now.getTime())
  this.readCount = msg.readCount || 0
  this.status = msg.status || 1
}


