let a = require('../../index');


function* fibs(limit) {
    let [a, b] = [0, 1];

    while (a <= limit) {
        yield a;
        [a, b] = [b, a + b];
    }
}

function* range(start, end, step = 1) {
    while (start < end) {
        yield start;
        start += step;
    }
}

function* iter(...xs) {
    yield* xs;
}

function isIter(x) {
    const IteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));

    while (x && typeof x === 'object') {
        if (x === IteratorPrototype)
            return true;
        x = Object.getPrototypeOf(x);
    }

    return false;
}

module.exports = {a, fibs, range, isIter, iter};