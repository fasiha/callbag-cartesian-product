const test = require('tape');
const { pipe, fromIter, concat, filter, map, forEach } = require('callbag-basics');

const { cartesian, cartesianF } = require('./index');
const array1 = Array.from(Array(50), (_, i) => i);
const array2 = 'abcdefghi';
const array3 = Array.from(Array(50), _ => Math.random());
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

test('cartesian works with callbags', t => {
  let actual = [];
  pipe(cartesian(fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual.push(x)));

  t.equal(expectedC.length, actual.length, "same length");
  t.deepEqual(expectedC, actual, "same values");

  t.end();
});

test('cartesian works with callbags, Fortran ordering', t => {
  let actual = [];
  pipe(cartesianF(fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual.push(x)));

  t.equal(expectedF.length, actual.length, "same length");
  t.deepEqual(expectedF, actual, "same values");

  t.end();
});
