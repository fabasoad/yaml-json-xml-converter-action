const util = require('./util')

const Builder = function (options) {
  options = options || {}
  this.rootName = util.getDefault(options.rootName, 'root')
  const opts = options.renderOpts || {}
  this.pretty = util.getDefault(opts.pretty, true)
  this.indent = util.getDefault(opts.indent, '  ')
  this.newline = util.getDefault(opts.newline, '\n')
  const xmldec = options.xmldec || {}
  xmldec.version = util.getDefault(xmldec.version, '1.0')
  xmldec.encoding = util.getDefault(xmldec.encoding, 'UTF-8')
  xmldec.standalone = util.getDefault(xmldec.standalone, true)
  this.xmldec = xmldec
  this.headless = util.getDefault(options.headless, false)
  this.cdata = util.getDefault(options.cdata, false)
}

const TPL = '{indent}<{tag}>{wrap}{node}{wrap}{indent2}</{tag}>'

const proto = Builder.prototype

proto._build = function (obj, indentCount) {
  indentCount = indentCount || 0
  const arr = []
  const iteration = function (key, value) {
    const obj = {}
    obj[key] = value
    return this._build(obj, indentCount)
  }
  for (let key in obj) {
    let value = ''
    if (obj[key] instanceof Array) {
      value = obj[key].map(iteration.bind(this, key)).join(this.newline)
    } else {
      value = TPL.replace(/\{(\w+)\}/g, (function (all, keyname) {
        if (keyname === 'tag') {
          return key
        } else if (keyname === 'node') {
          if (typeof obj[key] === 'object') {
            return this._build(obj[key], indentCount + 1)
          }
          return this._wrapCdata(obj[key])
        } else if (keyname === 'wrap') {
          if (typeof obj[key] === 'object') {
            return this.newline
          }
          return ''
        } else if (keyname === 'indent') {
          return this._getIndent(indentCount)
        } else if (keyname === 'indent2') {
          if (typeof obj[key] === 'object') {
            return this._getIndent(indentCount)
          }
          return ''
        }
      }).bind(this))
    }
    arr.push(value)
  }
  return arr.join(this.newline)
}

proto._getEntityReference = function (str) {
  const entityMap = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '\'': '&apos;',
    '"': '&quot;'
  }
  return str.replace(/[<>&'"]/g, function (key) {
    return entityMap[key]
  })
}

proto._wrapCdata = function (str) {
  const reg = /[<&]/g
  const tpl = '<![CDATA[{text}]]>'
  if (!this.cdata && !reg.test(str)) {
    return str
  }
  return tpl.replace(/\{(\w+)\}/g, (function (all, key) {
    return str.replace(/\]\]>/g, this._getEntityReference.bind(this))
  }).bind(this))
}

proto._getIndent = function (num) {
  let indent = ''
  for (let i = 0; i < num; i++) {
    indent += this.indent
  }
  return indent
}

proto._getDeclaration = function () {
  if (this.headless) {
    return ''
  }
  const declaration = '<?xml version="{version}" encoding="{encoding}" standalone="{standalone}"?>\n'
  return declaration.replace(/\{(\w+)\}/g, (function (all, key) {
    if (key === 'standalone') {
      return this.xmldec[key] ? 'yes' : 'no'
    } else {
      return this.xmldec[key]
    }
  }).bind(this))
}

proto.buildObject = function (obj) {
  const newObj = {}
  newObj[this.rootName] = obj
  return this._getDeclaration() + this._build(newObj)
}

module.exports = Builder