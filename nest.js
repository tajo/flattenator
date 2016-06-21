module.exports = configureNest

var seek = require("./seek")
var escapeRegexp = require("./escape");

var circular = /\[Circular \((.+)\)\]/

function configureNest(separator, separatorArrayLeft, separatorArrayRight) {
  separator = separator || '.'
  separatorArrayLeft = separatorArrayLeft || '['
  separatorArrayRight = separatorArrayRight || ']'

  var nestedRe = new RegExp("(" + escapeRegexp(separator) + "|" + escapeRegexp(separatorArrayLeft) + ")")
  var scrub = new RegExp(escapeRegexp(separatorArrayRight), "g")

  return function nest(obj) {
    var key,
        i,
        nested = {}

    var keys = Object.keys(obj)
    var len = keys.length
    for (i = 0; i < len; i++) {
      key = keys[i]

      if (typeof obj[key] == "string" && circular.test(obj[key])) {
        var ref = circular.exec(obj[key])[1]
        if (ref == "this")
          obj[key] = nested
        else
          obj[key] = seek(separator, separatorArrayLeft, separatorArrayRight)(nested, ref)
      }
      insert(nested, key, obj[key])
    }

    return nested
  }

  function insert(target, path, value) {
    path = path.replace(scrub, "")

    var pathBits = path.split(nestedRe)
    var parent = target
    var len = pathBits.length
    for (var i = 0; i < len; i += 2) {
      var key = pathBits[i]
      var type = pathBits[i + 1]

      if (type == null && key) parent[key] = value
      if (type == separator && parent[key] == null) parent[key] = {}
      if (type == separatorArrayLeft && parent[key] == null) parent[key] = []

      parent = parent[key]
    }
  }
}