const assert = require('assert')
const Builder = require('../lib/builder')
const builder = new Builder()

describe('test builder.js', function () {
  describe('test buildObject()', function () {
    it('test normal', function () {
      const obj = { name: 'xiaobai', age: 12, isVip: true }
      const xml = 
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root>
  <name>xiaobai</name>
  <age>12</age>
  <isVip>true</isVip>
</root>`
      assert.equal(builder.buildObject(obj), xml)
    })
    it('if has object and array', function () {
      const obj = {
        users: [
          {
            name: 'xiaobai',
            age: 11,
            hobby: ['football', 'basketball']
          },
          {
            name: 'xiaohong',
            age: 12,
            hobby: ['badminton']
          }
        ]
      }
      const xml = 
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root>
  <users>
    <name>xiaobai</name>
    <age>11</age>
    <hobby>football</hobby>
    <hobby>basketball</hobby>
  </users>
  <users>
    <name>xiaohong</name>
    <age>12</age>
    <hobby>badminton</hobby>
  </users>
</root>`
      assert.equal(builder.buildObject(obj), xml)
    })
  })
  describe('test _getDeclaration()', function () {
    it('if config xmldec', function () {
      const options = {
        xmldec: {
          version: '1.1',
          encoding: 'utf-8',
          standalone: false
        }
      }
      const builder = new Builder(options)
      assert.equal(builder._getDeclaration(), `<?xml version="${options.xmldec.version}" encoding="${options.xmldec.encoding}" standalone="${options.xmldec.standalone ? 'yes' : 'no'}"?>\n`)
    })
    it('if headless is true', function () {
      const builder = new Builder({ headless: true })
      assert.equal(builder._getDeclaration(), '')
    })
  })
  describe('test _wrapCdata()', function () {
    it('if cdata was true', function () {
      const builder = new Builder({ cdata: true })
      assert.equal(builder._wrapCdata('<'), '<![CDATA[<]]>')
      assert.equal(builder._wrapCdata('&'), '<![CDATA[&]]>')
      assert.equal(builder._wrapCdata('<&>]]>&&>'), '<![CDATA[<&>]]&gt;&&>]]>')
    })
  })
  describe('test _getEntityReference()', function () {
    it('test normal', function () {
      const builder = new Builder()
      const str = '<a>b&c\'d"e'
      assert.equal(builder._getEntityReference(str), '&lt;a&gt;b&amp;c&apos;d&quot;e')
    })
  })
})