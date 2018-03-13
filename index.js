const flatten = require('callbag-flatten');
const map = require('callbag-map');
// const fromIter = require('callbag-from-iter');

function cartesian(cOrder, ...args) {
  let bag, startAt = 0;
  if (typeof cOrder === 'boolean') {
    if (!cOrder) { return map(arr => arr.reverse())(cartesian(true, ...args.reverse())); }
    bag = map(x => [x])(args[0]);
    startAt = 1;
  } else {
    bag = map(x => [x])(cOrder);
    startAt = 0;
  }
  for (let i = startAt; i < args.length; i++) {
    bag = flatten(map(outer => map(inner => outer.concat(inner))(args[i]))(bag));
  }
  return bag;
}

// function cartesianIter(...args) { return cartesian(...args.map(fromIter)); }

module.exports = {
  cartesian,
  // cartesianIter,
};