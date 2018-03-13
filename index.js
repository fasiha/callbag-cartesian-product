const flatten = require('callbag-flatten');
const map = require('callbag-map');

function cartesian(cOrder, ...args) {
  // cOrder is either a boolean or a callbag, in either case, if its falsey, then we want Fortran order
  if (!cOrder) {
    return args.reduceRight(
        (bag, b) => flatten(map(outer => map(inner => [inner].concat(outer))(b))(bag)), map(x => [x])(args.pop()));
  }
  // Next, is it a boolean? (In which case it must be true)
  if (typeof cOrder === 'boolean') {
    return args.slice(1).reduce(
        (bag, b) => flatten(map(outer => map(inner => outer.concat(inner))(b))(bag)), map(x => [x])(args[0]));
  }
  // Or is it a callbag, in which case we assume a default of C ordering
  return args.reduce(
      (bag, b) => flatten(map(outer => map(inner => outer.concat(inner))(b))(bag)), map(x => [x])(cOrder));
}

module.exports = { cartesian };