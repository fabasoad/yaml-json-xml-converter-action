# xml-js-parse

Parse the xml as a js object or build an xml through a js object.

### Usage

```bash
npm i xml-js-parse -S
```

```javascript
const xmlParser = new require('xml-js-parse').Parser()
const xml = `
<xml>
  <name>xiaobai</name>
</xml>
`
const obj = xmlParser.parseString(xml)
```

### new Parser([options])

- `options` \<Object\> 配置对象
  - `trim` \<boolean\> 去除文本节点头尾的空格。默认为 `false` 。
  - `normalize` \<boolean\> 去除文本节点内的空格。默认为 `false` 。
  - `normalizeTags` \<boolean\> 将所有标签名转成小写字母。默认为 `false` 。
  - `ignoreAttrs` \<boolean\> 忽略属性节点。默认为 `false` 。
  - `attrkey` \<string\> 设置属性节点的字段名。默认为 `$` 。
  - `charkey` \<string\> 设置文本节点的字段名。默认为 `_` 。
  - `explicitArray` \<boolean\> 保存子元素为数组。默认为 `true` 。当设置为 `false` ，只有出现多个相同标签名的子元素时才合并成数组。

### parseString

解析 `xml` 数据为对象。

- `xml` \<string\> 

```javascript
const xmlParser = new Parser({ explicitArray: false })
const xml = `
  <user>
    <name>xiaobai</name>
    <age>12</age>
  </user>
  <user>
    <name>xiaohong</name>
    <age>11</age>
  </user>
  <count>2</count>
`
const result = xmlParser.parseString(xml)
/**
{
  user: [
    {
      name: 'xiaobai',
      age: '12'
    },
    {
      name: 'xiaohong',
      age: '11'
    }
  ],
  count: '2'
}
*/
```

### new Builder([options])

- `options` \<Object\> 配置对象
  - `rootName` \<string\> 根节点名称。默认为 `root` 。
  - `renderOpts` \<Object\> 
    - `pretty` \<boolean\> 使用格式。默认为 `true` 。
    - `indent` \<string\> 缩进。默认为 `'  '` 。
    - `newline` \<string\> 换行。默认 `\n` 。
  - `xmldec` \<Object\> 
    - `version` \<string\> 头信息，版本号。默认 `1.0` 。
    - `encoding` \<string\> 头信息，编码格式。默认 `UTF-8` 。
    - `standalone` \<boolean\> 头信息，独立。默认 `true` 。
  - `headless` \<boolean\> 去除头信息。默认 `false` 。
  - `cdata` \<boolean\> 当文本节点包含非法 `xml` 字符时，用`<![CDATA[……]]>` 包含。默认 `false` 。

### buildObject

- obj \<Object\> 要构建 `xml` 的对象。

```javascript
const xmlBuilder = new Builder()
const obj = { name: 'xiaobai' }
const xml = xmlBuilder.buildObject(obj)
/**
<root>
  <name>xiaobai</name>
</root>
*/
```

