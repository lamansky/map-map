# map-map

Applies a callback to each key-value pair of a Map or Object. The original Map or Object is not modified; a copy is returned.

## Installation

```bash
npm install map-map --save
```

## Usage Example

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
