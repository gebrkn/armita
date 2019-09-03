# armita

`armita` (array methods for iterators) re-implements Javascript array methods for iterator objects.

## examples

```javascript

// iterate a Map

let m = new Map();
m.set('a', 2);
m.set('b', 3);
m.set('c', 4);
m.set('d', 5);

threeOrMore = m.values().filter(v => v >= 3)

// process a big array without creating intermediate temp arrays

let result = bigArray
    .values()
    .map(x => x.toUpperCase())
    .filter(x => x.includes('AHA')
    .map(x => `<b>${x}</b>`)
    .join('\n')


// lazily compute a heavy function and stop once the result is found

let result = bigArray
    .values()
    .map(heavyFunction)
    .find(x => x > 100);


// iterate endless generators

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
"Greedy" means that a method consumes all values from the `this` iterator, "lazy" means a method reads from it on demand.


method|returns|greedy/lazy
------|----|----
`concat(...values)` | `generator` | lazy
`includes(value, fromIndex?)` | `bool` | lazy (greedy when a negative `fromIndex` is given)
`indexOf(value, fromIndex?)` | `int` | lazy (greedy when a negative `fromIndex` is given)
`join(separator?)` | `string` | greedy
`lastIndexOf(value, fromIndex?)` | `int` | greedy
`slice(begin?, end?)` | `generator` | lazy (greedy when a negative `begin` and/or `end` indexes are given)
`toString()` | `string` | greedy
`toLocaleString()` | `string` | greedy
`entries()` | `generator` | lazy
`every(fn, thisArg?)` | `bool` | greedy
`filter(fn, thisArg?)`| `generator` | lazy
`find(fn, thisArg?)`| `any` | lazy
`findIndex(fn, thisArg?)`| `int` | lazy
`flat(depth?)`| `generator` | lazy
`flatMap(fn, thisArg?)`| `generator` | lazy
`forEach(fn, thisArg?)`| `void` | lazy
`keys()`| `generator` | lazy
`map(fn, thisArg?)`| `generator` | lazy
`reduce(fn, init?)`| `any` | lazy
`reduceRight(fn, init?)`| `any` | greedy
`some(fn, thisArg?)`| `bool` | lazy
`values()`| `generator` | lazy

## usage

```
npm install armita
```

## todos

- async generators?
- `.d.ts`




