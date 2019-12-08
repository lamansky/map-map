'use strict'

const construct = require('construct-map')
const entries = require('entries-array')

module.exports = (map, mapper, options) => construct(map, entries(map, options).map(([k, v], i) => mapper(k, v, i)))
