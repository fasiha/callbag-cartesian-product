const test = require('tape');
const { pipe, fromIter, concat, filter, map, forEach } = require('callbag-basics');

const { cartesian, cartesian2, cartesian3, cartesian4, cartesian5 } = require('./index');
const array1 = Array.from(Array(49), (_, i) => '' + i);
const array2 = 'abcdefghi';
const array3 = Array.from(Array(51), _ => '' + Math.random());
// C ordering: first element varies the slowest
let expectedC = [];
for (let a1 of array1) {
  for (let a2 of array2) {
    for (let a3 of array3) { expectedC.push([ a1, a2, a3 ]); }
  }
}
// Fortran ordering: first element varies the fastest
let expectedF = [];
for (let a3 of array3) {
  for (let a2 of array2) {
    for (let a1 of array1) { expectedF.push([ a1, a2, a3 ]); }
  }
}

function elapsed(start) {
  const end = process.hrtime(start);
  return Math.round(end[0] * 1000 + end[1] / 1e6);
}

test('no arguments', t => {
  let actual = [];
  let tic = process.hrtime();
  pipe(cartesian(fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual.push(x)));
  tic = elapsed(tic);
  t.comment('ms f/defa ' + tic);
  t.deepEqual(expectedF, actual, "same values");
  t.end();
});

test('F order', t => {
  let actual = [];
  let tic = process.hrtime();
  pipe(cartesian(true, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual.push(x)));
  tic = elapsed(tic);
  t.comment('ms f/bool: ' + tic);
  t.deepEqual(expectedF, actual, "same values");
  t.end();
});

test('C order', t => {
  let actual = [];
  let tic = process.hrtime();
  pipe(cartesian(false, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual.push(x)));
  tic = elapsed(tic);
  t.comment('ms c/bool ' + tic);
  t.deepEqual(expectedC, actual, "same values");
  t.end();
});