const flatten = require('callbag-flatten');
const map = require('callbag-map');
// const fromIter = require('callbag-from-iter');

function cartesian(...args) {
  let bag = map(x => [x])(args[0]);
  for (let i = 1; i < args.length; i++) {
    bag = flatten(map(outer => map(inner => outer.concat(inner))(args[i]))(bag));
  }
  return bag;
}
function cartesianF(...args) { return map(arr => arr.reverse())(cartesian(...args.slice().reverse())); }

// function cartesianIter(...args) { return cartesian(...args.map(fromIter)); }

module.exports = {
  cartesian,
  cartesianF,
  // cartesianIter,
};