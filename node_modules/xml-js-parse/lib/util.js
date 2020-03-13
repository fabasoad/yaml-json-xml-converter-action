const util = {}

util.getDefault = function (value, defaultValue) {
  if (value !== undefined && value !== null) {
    return value
  } else {
    return defaultValue
  }
}

module.exports = util