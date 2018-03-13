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

function cartesian2(cOrder, ...args) {
  let bag, startAt = 0;
  if (typeof cOrder === 'boolean') {
    if (!cOrder) { args.reverse(); }
    bag = map(x => [x])(args[0]);
    startAt = 1;
  } else {
    bag = map(x => [x])(cOrder);
    startAt = 0;
    cOrder = true;
  }
  for (let i = startAt; i < args.length; i++) {
    bag = flatten(map(outer => map(inner => cOrder ? outer.concat(inner) : [ inner ].concat(outer))(args[i]))(bag));
  }
  return bag;
}
function cartesian3(cOrder, ...args) {
  let bag, startAt = 0;
  if (typeof cOrder === 'boolean') {
    if (!cOrder) { args.reverse(); }
    bag = map(x => [x])(args[0]);
    startAt = 1;
  } else {
    bag = map(x => [x])(cOrder);
    startAt = 0;
    cOrder = true;
  }
  if (cOrder) {
    for (let i = startAt; i < args.length; i++) {
      bag = flatten(map(outer => map(inner => outer.concat(inner))(args[i]))(bag));
    }
  } else {
    for (let i = startAt; i < args.length; i++) {
      bag = flatten(map(outer => map(inner => [inner].concat(outer))(args[i]))(bag));
    }
  }
  return bag;
}
function cartesian4(cOrder, ...args) {
  if (!cOrder) {
    return args.reduceRight(
        (bag, b) => flatten(map(outer => map(inner => [inner].concat(outer))(b))(bag)), map(x => [x])(args.pop()));
  }
  // cOrder is either True or a callbag
  if (typeof cOrder === 'boolean') {
    return args.slice(1).reduce(
        (bag, b) => flatten(map(outer => map(inner => outer.concat(inner))(b))(bag)), map(x => [x])(args[0]));
  }
  return args.reduce(
      (bag, b) => flatten(map(outer => map(inner => outer.concat(inner))(b))(bag)), map(x => [x])(cOrder));
}
function cartesian5(cOrder, ...args) {
  if (!cOrder) {
    return args.reduceRight(
        (bag, b) => flatten(map(outer => map(inner => [inner].concat(outer))(b))(bag)), map(x => [x])(args.pop()));
  }
  // cOrder is either True or a callbag
  if (typeof cOrder === 'boolean') {
    let bag = map(x => [x])(args[0]);
    for (let i = 1; i < args.length; i++) {
      bag = flatten(map(outer => map(inner => outer.concat(inner))(args[i]))(bag));
    }
    return bag;
  }
  return args.reduce(
      (bag, b) => flatten(map(outer => map(inner => outer.concat(inner))(b))(bag)), map(x => [x])(cOrder));
}

// function cartesianIter(...args) { return cartesian(...args.map(fromIter)); }

module.exports = {
  cartesian,
  cartesian2,
  cartesian3,
  cartesian4,
  cartesian5
  // cartesianIter,
};