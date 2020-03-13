const util = require('./util')
const XMLParserError = require('./error').XMLParserError

const Parser = function (options) {
  options = options || {}
  this.explicitArray = util.getDefault(options.explicitArray, true)
  this.trim = util.getDefault(options.trim, false)
  this.normalize = util.getDefault(options.normalize, false)
  this.normalizeTags = util.getDefault(options.normalizeTags, false)
  this.ignoreAttrs = util.getDefault(options.ignoreAttrs, false)
  this.attrkey = util.getDefault(options.attrkey, '$')
  this.charkey = util.getDefault(options.charkey, '_')
}

const proto = Parser.prototype

proto.matchTag = function (xml) {
  if (typeof xml !== 'string') {
    throw new XMLParserError('matchTag() parameter must be a string')
  }
  const reg = /<(\S+?)((?:\s|\S)+?)??>((?:\s|\S)*?)<\/\1>/g
  let matches = null
  const result = []
  const cdata = this.matchCDATA(xml)
  while (matches = reg.exec(xml)) {
    if (cdata.indexOf(matches[0]) < 0) {
      result.push({
        tag: matches[1],
        attributes: this.matchAttributes(matches[2] || ''),
        content: matches[3] || ''
      })
    }
  }
  if (result.length > 0) {
    return result
  } else if (cdata) {
    return this.format(cdata)
  } else {
    return this.format(xml, 'tag')
  }
}

proto.matchAttributes = function (str) {
  if (this.ignoreAttrs) {
    return null
  }
  if (typeof str !== 'string') {
    throw new XMLParserError('matchAttributes() parameter must be a string')
  }
  const reg = /(\S+)=(['"])(.*?)\2/g
  const result = {}
  let matches = null
  let hasAttr = false
  while (matches = reg.exec(str)) {
    if (!result[matches[1]]) {
      hasAttr = true
      result[matches[1]] = matches[3]
    }
  }
  return hasAttr ? result : null
}

proto.formatAttributes = function (content, attributes) {
  if (!attributes) {
    return content
  }
  const result = {}
  result[this.attrkey] = attributes
  result[this.charkey] = content
  return result
}

proto.format = function (str, type) {
  if (type === 'tag') {
    if (this.normalizeTags) {
      str = str.toLowerCase()
    }
  } else if (type === 'node' || !type) {
    if (this.trim) {
      str = str.trim()
    }
    if (this.normalize) {
      str = str.replace(/\s+/g, '')
    }
  }
  return str
}

proto.matchCDATA = function (xml) {
  const reg = /<\!\[CDATA\[((?:\s|\S)*?)\]\]>/
  const matches = xml.match(reg)
  if (!matches) {
    return ''
  }
  return matches[1]
}

proto.parseString = function (xml) {
  const obj = {}
  const result = this.matchTag(xml)
  const iteration = function (item) {
    let value = this.formatAttributes(this.parseString(item.content), item.attributes)
    if (obj[item.tag] instanceof Array) {
      obj[item.tag].push(value)
    } else if (this.explicitArray) {
      obj[item.tag] = [value]
    } else {
      if (obj[item.tag]) {
        obj[item.tag] = [obj[item.tag], value]
      } else {
        obj[item.tag] = value
      }
    }
  }
  if (result instanceof Array) {
    result.forEach(iteration.bind(this))
  } else if (typeof result === 'string') {
    return result
  }
  return obj
}

module.exports = Parser