flattenator
===========

[![npm version](https://img.shields.io/npm/v/flattenator.svg?style=flat-square)](https://www.npmjs.com/package/flattenator)
[![npm downloads](https://img.shields.io/npm/dm/flattenator.svg?style=flat-square)](https://www.npmjs.com/package/flattenator)
[![Build Status](https://travis-ci.org/tajo/flattenator.svg?branch=master)](https://travis-ci.org/tajo/flattenator)

**This is a fork of [https://github.com/brycebaril/node-flatnest](https://github.com/brycebaril/node-flatnest)**. It provides customizable separators for object keys (default: `.`) and arrays (default: `[` and `]`).


Flatten/Nest Javascript objects.

```javascript

var fn = require("flatnest")

var obj = {
  cat: "meow",
  dog: [{name: "spot"}, {name: "rover"}],
  bird: {type: "parrot", age: 22.3, stats: {weight: 10, height: 15}}
}

var flat = fn.flatten()(obj)

/*
{ cat: 'meow',
  'dog[0].name': 'spot',
  'dog[1].name': 'rover',
  'bird.type': 'parrot',
  'bird.age': 22.3,
  'bird.stats.weight': 10,
  'bird.stats.height': 15 }
 */


var nested = fn.nest()(flat)

/*
{ cat: 'meow',
  dog: [ { name: 'spot' }, { name: 'rover' } ],
  bird:
   { type: 'parrot',
     age: 22.3,
     stats: { weight: 10, height: 15 } } }
 */

// An internal `seek` function is also exposed:

fn.seek()(obj, "bird.stats.height") // 15


```

API
===

#### `flatten([separator], [separatorArrayLeft], [separatorArrayRight])(object)`

**Defaults:**
- separator: `.`
- separatorArrayLeft: `[`
- separatorArrayRight: `]`

Flatten an object to a javascript object with only key: value pairs where values are not complex data types. (e.g. they can be numbers, strings, booleans, but not Objects or Arrays)

Keys are named with paths to where the keys where when nested.

#### `nest([separator], [separatorArrayLeft], [separatorArrayRight])(flatObject)`

**Defaults:**
- separator: `.`
- separatorArrayLeft: `[`
- separatorArrayRight: `]`

Re-form a flattend object into the nested version. It parses the key paths set during flattening and should end up with the original version. This is not always true depending on what data was present and the original key names chosen.

#### `seek([separator], [separatorArrayLeft], [separatorArrayRight])(object, path)`

**Defaults:**
- separator: `.`
- separatorArrayLeft: `[`
- separatorArrayRight: `]`

Use the flattened key syntax (e.g. `aa.bb[0].cc`) to look into a nested object.
