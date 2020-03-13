const XMLParserError = function (message, code) {
  this.message = message
  this.code = code || -1
  this.name = 'XMLParserError'
  Error.captureStackTrace(this, XMLParserError)
}

XMLParserError.prototype = Object.create(Error.prototype, {
  constructor: XMLParserError
})

module.exports = {
  XMLParserError: XMLParserError
}