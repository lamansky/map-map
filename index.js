'use strict'

const construct = require('construct-map')
const entries = require('entries-array')
const sbo = require('sbo')

module.exports = sbo((map, mapper, options) => construct(map, entries(map, options).map(([k, v], i) => mapper(k, v, i))))
