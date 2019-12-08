# map-map

Applies a callback to each key-value pair of a Map, Object, or other collection. The original collection is not modified; a copy is returned.

## Installation

Requires [Node.js](https://nodejs.org/) 7.0.0 or above.

```bash
npm i map-map
```

## API

The module exports a single function.

### Parameters

1. `map` (Array, iterator, Object, Map, Set, string, or Typed Array)
2. `mapper` (function): The callback which receives three arguments (key, value, and index) and which returns a two-element array containing the new key and value.
3. Optional: Object argument:
    * `recursive` (boolean, function, or array): Determines whether `mapper` should be applied to the values of nested maps or to the nested maps themselves.
        * If set to `true`, recursive mapping will be applied to all collections that have the exact same object constructor as `map`.
        * If set to a function, all values will be given to the function, and recursive mapping will be applied to those values for which the function returns `true`.
        * If set to an array of classes or class name strings, recursive mapping will be applied to all objects that descend from those classes.
        * If omitted or if set to a falsey value, recursive mapping will not be applied, and all values will be passed through `mapper` even if they are maps themselves.
    * All other options are forwarded to [`entries-array`](https://github.com/lamansky/entries-array), a dependency of this module.

### Return Value

A copy of `map` which has had `mapper` applied to each of its key-value pairs, and optionally (depending on `recursive`) the key-value pairs of its child collections.

## Examples

### Maps

```javascript
const mapMap = require('map-map')

let map = new Map([['key', 'value']])
map = mapMap(map, (key, value, index) => [key + '_mapped', value + '_mapped'])
map.get('key_mapped') // 'value_mapped'
```

### Objects

```javascript
const mapMap = require('map-map')

let obj = {key: 'value'}
obj = mapMap(obj, (key, value, index) => [key + '_mapped', value + '_mapped'])
obj.key_mapped // 'value_mapped'
```

### Recursive mapping

```javascript
const mapMap = require('map-map')

const obj = {
  a: 1,
  b: [2, 3],
  c: {d: 4},
}

// Mapping function that doubles all numbers
const d = (k, v) => [k, typeof v === 'number' ? v * 2 : v]

// Default behavior, without recursive mapping: only `a` is changed
mapMap(obj, d) // {a: 2, b: [2, 3], c: {d: 4}}

// Recursive mapping enabled for arrays only: numbers in `a` and `b` are changed
mapMap(obj, d, {recursive: [Array]}) // {a: 2, b: [4, 6], c: {d: 4}}

// Recursive mapping enabled for children of the same type as `obj`
// (i.e. other Objects, but not Arrays): numbers in `a` and `c` are changed
mapMap(obj, d, {recursive: true}) // {a: 2, b: [2, 3], c: {d: 8}}

// Recursive mapping enabled for everything descending from Object
// (which includes arrays): all numbers are doubled
mapMap(obj, d, {recursive: [Object]}) // {a: 2, b: [4, 6], c: {d: 8}}
```

## Version Migration Guide

Here are backward-incompatible changes you need to know about.

### 3.2.0 ⇒ Master

* To reduce overhead, support for the bind operator has been removed.
