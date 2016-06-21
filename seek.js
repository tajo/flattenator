module.exports = configureSeek

var escapeRegexp = require("./escape");
var circular = /\[Circular \((.+)\)\]/

function configureSeek(separator, separatorArrayLeft, separatorArrayRight) {
  separator = separator || '.'
  separatorArrayLeft = separatorArrayLeft || '['
  separatorArrayRight = separatorArrayRight || ']'

  var nestedRe = new RegExp("(" + escapeRegexp(separator) + "|" + escapeRegexp(separatorArrayLeft) + ")")
  var scrub = new RegExp(escapeRegexp(separatorArrayRight), "g")

  return function seek(obj, path) {
    path = path.replace(scrub, "")
    var pathBits = path.split(nestedRe)
    var len = pathBits.length
    var layer = obj
    for (var i = 0; i < len; i += 2) {
      if (layer == null) return undefined
      var key = pathBits[i]
      layer = layer[key]
    }
    return layer
  }
}
