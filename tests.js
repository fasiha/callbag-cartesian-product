const test = require('tape');
const { pipe, fromIter, concat, filter, map, forEach } = require('callbag-basics');

const { cartesian, cartesianIter } = require('./index');
const array1 = Array.from(Array(50), (_, i) => i);
const array2 = 'abcdefghi';
const array3 = Array.from(Array(50), _ => Math.random());
let expected = [];
for (let a1 of array1) {
  for (let a2 of array2) {
    for (let a3 of array3) { expected.push([ a1, a2, a3 ]); }
  }
}

test('cartesian works with callbags', t => {
  const bag1 = fromIter(array1);
  const bag2 = fromIter(array2);
  const bag3 = fromIter(array3);

  let actual = [];
  pipe(cartesian(bag1, bag2, bag3), forEach(x => actual.push(x)));

  t.equal(expected.length, actual.length, "same length");
  t.deepEqual(expected, actual, "same values");

  t.end();
});
