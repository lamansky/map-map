'use strict'

const assert = require('assert')
const mapMap = require('.')

describe('mapMap()', function () {
  it('should apply a callback to each entry of a Map', function () {
    const map = mapMap(new Map([[1, 1], [2, 2]]), (k, v) => [k + 'm', v + 'm'])
    assert.strictEqual(map.size, 2)
    assert.strictEqual(map.get('1m'), '1m')
    assert.strictEqual(map.get('2m'), '2m')
  })

  it('should apply a callback to each entry of an Object', function () {
    const obj = mapMap({1: 1, 2: 2}, (k, v) => [k + 'm', v + 'm'])
    assert.strictEqual(Object.keys(obj).length, 2)
    assert.strictEqual(obj['1m'], '1m')
    assert.strictEqual(obj['2m'], '2m')
  })

  it('should provide the index as a third argument to the callback', function () {
    const map = mapMap(new Map([['a', 'a'], ['b', 'b']]), (k, v, i) => [k + i, v + i])
    assert.strictEqual(map.size, 2)
    assert.strictEqual(map.get('a0'), 'a0')
    assert.strictEqual(map.get('b1'), 'b1')
  })
})
