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
3. Optional: `options`: Object argument which is forwarded to [`entries-array`](https://github.com/lamansky/entries-array), a dependency of this module.

### Return Value

A copy of `map` which has had `mapper` applied to each of its key-value pairs.

## Example

```javascript
const mapMap = require('map-map')

let map = new Map([['key', 'value']])
map = mapMap(map, (key, value, index) => [key + '_mapped', value + '_mapped'])
map.get('key_mapped') // 'value_mapped'
```

Works on Objects too:

```javascript
const mapMap = require('map-map')

let obj = {key: 'value'}
obj = mapMap(obj, (key, value, index) => [key + '_mapped', value + '_mapped'])
obj.key_mapped // 'value_mapped'
```

## Version Migration Guide

Here are backward-incompatible changes you need to know about.

### 3.2.0 ⇒ Master

* To reduce overhead, support for the bind operator has been removed.
