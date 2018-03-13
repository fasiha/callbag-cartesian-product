const flatten = require('callbag-flatten');
const map = require('callbag-map');

function cartesian(fOrder, ...args) {
  if (!fOrder) {
    return args.reduce(
        (bag, b) => flatten(map(outer => map(inner => outer.concat(inner))(b))(bag)), map(x => [x])(args.shift()));
  }
  if (fOrder !== true) { args.unshift(fOrder); }
  return args.reduceRight(
      (bag, b) => flatten(map(outer => map(inner => [inner].concat(outer))(b))(bag)), map(x => [x])(args.pop()));
}

module.exports = cartesian;