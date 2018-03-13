# callbag-cartesian-product

Callbag factory that converts any number of pullable source into a single pullable source that emits the Cartesian product of the sources. This is unlikely to work correctly for listenable sources.

## Installation
In a Node.js project, run
```
$ npm install --save callbag-cartesian-project
```

## API and examples
### `cartesian([fortranOrder,] ...sources)`
Optional boolean `fortranOrder` (defaults to true) switches between Fortran ordering (first source alternates the fastest) and C ordering (first source changes the slowest). Compare the default Fortran ordering:
```js
const {cartesian} = require('callbag-cartesian-product');
const { pipe, fromIter, forEach } = require('callbag-basics'); // from `npm i callbag-basics`
pipe(
    cartesian(fromIter([ 0, 1, 2 ]), fromIter('rgb'), fromIter([ true, false ])),
    forEach(x => console.log(x)),
)
// [ 0, 'r', true ]
// [ 1, 'r', true ]
// [ 2, 'r', true ]
// [ 0, 'g', true ]
// [ 1, 'g', true ]
// [ 2, 'g', true ]
// [ 0, 'b', true ]
// [ 1, 'b', true ]
// [ 2, 'b', true ]
// [ 0, 'r', false ]
// [ 1, 'r', false ]
// [ 2, 'r', false ]
// [ 0, 'g', false ]
// [ 1, 'g', false ]
// [ 2, 'g', false ]
// [ 0, 'b', false ]
// [ 1, 'b', false ]
// [ 2, 'b', false ]
```
to C ordering:
```js
pipe(
    cartesian(false, fromIter([ 0, 1, 2 ]), fromIter('rgb'), fromIter([ true, false ])),
    forEach(x => console.log(x)),
)
// [ 0, 'r', true ]
// [ 0, 'r', false ]
// [ 0, 'g', true ]
// [ 0, 'g', false ]
// [ 0, 'b', true ]
// [ 0, 'b', false ]
// [ 1, 'r', true ]
// [ 1, 'r', false ]
// [ 1, 'g', true ]
// [ 1, 'g', false ]
// [ 1, 'b', true ]
// [ 1, 'b', false ]
// [ 2, 'r', true ]
// [ 2, 'r', false ]
// [ 2, 'g', true ]
// [ 2, 'g', false ]
// [ 2, 'b', true ]
// [ 2, 'b', false ]
```

## Background
- [`callbag-basics`](https://github.com/staltz/callbag-basics) and links to articles therein
- [GitHub's search results for "callbag"](https://github.com/search?q=callbag&type=Repositories&utf8=%E2%9C%93)
- André Staltz's ["Why we need callbags"](https://staltz.com/why-we-need-callbags.html)
