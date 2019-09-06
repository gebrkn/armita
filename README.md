# armita

`armita` (array methods for iterators) re-implements Javascript array methods for iterator objects.

## examples

```javascript

// iterate a Map

let m = new Map([
    ['a', 10],
    ['b', 20],
    ['c', 30],
]);

found = m.values().filter(val => val >= 15)

// process a big array without creating intermediate temp arrays

let result = bigArray
    .values()
    .map(x => x.toUpperCase())
    .filter(x => x.includes('AHA')
    .map(x => '<b>' + x + '</b>')
    .join('\n')


// lazily compute a heavy function and stop once the result is found

let result = bigArray
    .values()
    .map(heavyFunction)
    .find(result => result > 100);


// slice from an endless generator

function* fibs() {
    let [a, b] = [0, 1];

    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

let first50fibs = fibs().slice(0, 50);
```

## methods

`armita` reimplements all array methods (as of ES2019), except mutarors (`push`, `splice` and friends).

Array construction methods (like `.map`), return a generator in `armita`.
"Greedy" means that a method unconditionally consumes `this` iterator, "lazy" means a method reads from it on demand.


method|returns|greedy/lazy
------|----|----
`concat(...values)` | `generator` | lazy
`entries()` | `generator` | lazy
`every(fn, thisArg?)` | `bool` | lazy
`filter(fn, thisArg?)`| `generator` | lazy
`find(fn, thisArg?)`| `any` | lazy
`findIndex(fn, thisArg?)`| `int` | lazy
`flat(depth?)`| `generator` | lazy
`flatMap(fn, thisArg?)`| `generator` | lazy
`forEach(fn, thisArg?)`| `void` | lazy
`includes(value, fromIndex?)` | `bool` | lazy (greedy when a negative `fromIndex` is given)
`indexOf(value, fromIndex?)` | `int` | lazy (greedy when a negative `fromIndex` is given)
`join(separator?)` | `string` | greedy
`keys()`| `generator` | lazy
`lastIndexOf(value, fromIndex?)` | `int` | greedy
`map(fn, thisArg?)`| `generator` | lazy
`reduce(fn, init?)`| `any` | lazy
`reduceRight(fn, init?)`| `any` | greedy
`slice(begin?, end?)` | `generator` | lazy (greedy when negative `begin` and/or `end` indexes are given)
`some(fn, thisArg?)`| `bool` | lazy
`toLocaleString()` | `string` | greedy
`toString()` | `string` | greedy
`values()`| `generator` | lazy

## usage

```
npm install armita
```

## todos

- async generators?
- `.d.ts`




