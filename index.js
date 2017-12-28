'use strict'

const {entriesArray, reconstruct} = require('m-o')

module.exports = (map, mapper) => reconstruct(map, entriesArray(map).map(([k, v], i) => mapper(k, v, i)))
