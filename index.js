'use strict'

const isArrayOfLength = require('is-array-of-length')
const construct = require('construct-map')
const entries = require('entries-array')
const isInstanceOf = require('is-instance-of')

function checkEntry (e) {
  if (!isArrayOfLength(e, 2)) throw new TypeError('Expected map callback to return a two-entry array (key and value)')
  return e
}

function getRecursionDecider (r, map) {
  if (!r) return () => false
  if (typeof r === 'function') return r
  if (r === true) return x => x.constructor === map.constructor
  return x => isInstanceOf(x, r)
}

module.exports = function mapMap (map, mapper, {recursive, ...options} = {}) {
  const r = getRecursionDecider(recursive, map)
  const loop = c => construct(c, entries(c, options).map(
    ([k, v], i) => r(v, k, i) ? [k, loop(v)] : checkEntry(mapper(k, v, i))
  ))
  return loop(map)
}
