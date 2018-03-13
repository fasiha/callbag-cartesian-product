const test = require('tape');
const { pipe, fromIter, concat, filter, map, forEach } = require('callbag-basics');

const { cartesian, cartesian2, cartesian3, cartesian4, cartesian5 } = require('./index');
const array1 = Array.from(Array(50), (_, i) => '' + i);
const array2 = 'abcdefghi';
const array3 = Array.from(Array(50), _ => '' + Math.random());
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

test('no arguments', t => {
  let actual = [];
  pipe(cartesian(fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual.push(x)));
  t.equal(expectedC.length, actual.length, "same length");
  t.deepEqual(expectedC, actual, "same values");
  t.end();
});

test('C order', t => {
  let actual = [];
  pipe(cartesian(true, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual.push(x)));
  t.equal(expectedC.length, actual.length, "same length");
  t.deepEqual(expectedC, actual, "same values");
  t.end();
});

test('Fortran ordering', t => {
  let actual = [];
  pipe(cartesian(false, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual.push(x)));

  t.equal(expectedF.length, actual.length, "same length");
  t.deepEqual(expectedF, actual, "same values");

  t.end();
});
function elapsed(start) {
  const end = process.hrtime(start);
  return Math.round(end[0] * 1000 + end[1] / 1e6);
}
test('others', t => {
  let actual2 = [], actual3 = [], actual4 = [], actual5 = [], actual = [];
  let tic;

  tic = process.hrtime();
  pipe(cartesian2(false, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual2.push(x)));
  const tf2 = elapsed(tic);
  tic = process.hrtime();
  pipe(cartesian3(false, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual3.push(x)));
  const tf3 = elapsed(tic);
  tic = process.hrtime();
  pipe(cartesian4(false, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual4.push(x)));
  const tf4 = elapsed(tic);
  tic = process.hrtime();
  pipe(cartesian5(false, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual5.push(x)));
  const tf5 = elapsed(tic);
  tic = process.hrtime();
  pipe(cartesian(false, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual.push(x)));
  const tf = elapsed(tic);

  t.deepEqual(expectedF, actual2, "same values");
  t.deepEqual(expectedF, actual3, "same values");
  t.deepEqual(expectedF, actual4, "same values");
  t.deepEqual(expectedF, actual5, "same values");

  actual2 = [];
  actual3 = [];
  actual4 = [];
  actual5 = [];
  actual = [];
  tic = process.hrtime();
  pipe(cartesian2(fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual2.push(x)));
  const tc2 = elapsed(tic);
  tic = process.hrtime();
  pipe(cartesian3(fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual3.push(x)));
  const tc3 = elapsed(tic);
  tic = process.hrtime();
  pipe(cartesian4(fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual4.push(x)));
  const tc4 = elapsed(tic);
  tic = process.hrtime();
  pipe(cartesian5(fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual5.push(x)));
  const tc5 = elapsed(tic);
  tic = process.hrtime();
  pipe(cartesian(fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual.push(x)));
  const tc = elapsed(tic);

  t.deepEqual(expectedC, actual2, "same values");
  t.deepEqual(expectedC, actual3, "same values");
  t.deepEqual(expectedC, actual4, "same values");
  t.deepEqual(expectedC, actual5, "same values");

  actual2 = [];
  actual3 = [];
  actual4 = [];
  actual5 = [];
  actual = [];
  tic = process.hrtime();
  pipe(cartesian2(true, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual2.push(x)));
  const sc2 = elapsed(tic);
  tic = process.hrtime();
  pipe(cartesian3(true, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual3.push(x)));
  const sc3 = elapsed(tic);
  tic = process.hrtime();
  pipe(cartesian4(true, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual4.push(x)));
  const sc4 = elapsed(tic);
  tic = process.hrtime();
  pipe(cartesian5(true, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual5.push(x)));
  const sc5 = elapsed(tic);
  tic = process.hrtime();
  pipe(cartesian(true, fromIter(array1), fromIter(array2), fromIter(array3)), forEach(x => actual.push(x)));
  const sc = elapsed(tic);

  t.deepEqual(expectedC, actual2, "same values");
  t.deepEqual(expectedC, actual3, "same values");
  t.deepEqual(expectedC, actual4, "same values");
  t.deepEqual(expectedC, actual5, "same values");

  console.log('f/bool', tf2, tf3, tf4, tf5, tf);
  console.log('c/bool', tc2, tc3, tc4, tc5, tc);
  console.log('c/DEFA', sc2, sc3, sc4, sc5, sc);

  t.end();
});

/*
Timing results:
        c2  c3  c4  c5  orig
c/DEFA  10  10  11  11  19
c/DEFA  10  10  11  15  10
c/DEFA  10  10  11  17  10
c/DEFA  10  10  11  17  10
c/DEFA  10  10  11  18  10
c/DEFA  10  10  11  18  10
c/DEFA  11  10  11  18  10
c/DEFA  11  10  11  18  10
c/DEFA  11  10  18  12  10
c/DEFA  12  10  11  18  10

c/bool  11  10  10  10  19
c/bool  11  10  11  11  18
c/bool  11  10  11  11  19
c/bool  11  10  11  11  19
c/bool  11  10  11  19  10
c/bool  11  11  11  11  19
c/bool  11  11  11  11  20
c/bool  12  11  11  11  19
c/bool  12  13  18  12  11
c/bool  16  10  11  11  19

f/bool  11  11  7   7   20
f/bool  12  11  7   8   21
f/bool  12  12  7   7   20
f/bool  12  12  7   8   22
f/bool  12  12  8   8   21
f/bool  12  13  7   8   21
f/bool  13  12  7   7   21
f/bool  13  13  8   8   24
f/bool  15  8   9   15  13
f/bool  16  7   7   13  13

Conclusions: c4, with the three reductions, is totally competitive.
*/