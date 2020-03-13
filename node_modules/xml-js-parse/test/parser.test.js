const assert = require('assert')
const Parser = require('../index').Parser
const XMLParserError = require('../lib/error').XMLParserError

describe('test parser.js', function () {
  describe('test matchAttributes()', function () {
    const parser = new Parser()
    it('if parameter not a string', function () {
      assert.throws(function () {
        parser.matchAttributes()
      })
    })
    it('if has multiple same name', function () {
      assert.deepEqual(parser.matchAttributes('name=\'xiaobai\' name="xiaoming"'), {
        name: 'xiaobai'
      })
    })
    it('if has not quote', function () {
      assert.deepEqual(parser.matchAttributes('name=xiaobai'), null)
    })
    it('if ignoreAttrs is true', function () {
      const parser = new Parser({ ignoreAttrs: true })
      assert.equal(parser.matchAttributes('name="xiaobai"'), null)
    })
  })
  describe('test formatAttributes()', function () {
    const parser = new Parser()
    it('if attributes is empty', function () {
      assert.equal(parser.formatAttributes('content'), 'content')
    })
    it('if attributes is exists', function () {
      assert.deepEqual(parser.formatAttributes('content', { name: 'xiaobai' }), {
        $: { name: 'xiaobai' },
        _: 'content'
      })
    })
    it('if set attrkey and charkey config', function () {
      const parser = new Parser({ attrkey: 'attributes', charkey: 'value' })
      assert.deepEqual(parser.formatAttributes('content', { name: 'xiaobai' }), {
        attributes: { name: 'xiaobai' },
        value: 'content'
      })
    })
  })
  describe('test parseString()', function () {
    const parser = new Parser({ explicitArray: false })
    it('If you have more than one child element of the same tag name', function () {
      const xml = `
        <xml>
          <test>111</test>
          <test>222</test>
        </xml>
      `
      assert.deepEqual(parser.parseString(xml), { xml: { test: ['111', '222']}})
    })
    it('if you have attributes', function () {
      const xml = `
        <xml name="xiaobai" age="11">
          <test>111</test>
          <test>222</test>
        </xml>
      `
      const result = parser.parseString(xml)
      assert.deepEqual(result, { xml: {
        $: { name: 'xiaobai', age: '11' },
        _: { test: ['111', '222'] }
      }})
    })
    it('if you have more than one attribute of the same key name', function () {
      const xml = `
        <xml name="xiaobai" name="11">
          <test name="xiaohong">111</test>
          <test>222</test>
        </xml>
      `
      const result = parser.parseString(xml)
      assert.deepEqual(result, {
        xml: {
          $: { name: 'xiaobai' },
          _: { test: [{
            $: { name: 'xiaohong' },
            _: '111'
          }, '222'] }
        }
      })
    })
    it('if has quota in childList', function () {
      const xml = '<xml>\'>">"\'></xml>'
      assert.deepEqual(parser.parseString(xml), { xml: '\'>">"\'>'})
    })
  })
})