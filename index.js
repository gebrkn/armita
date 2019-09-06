//

let _m = {};

let _undef = _m['undefined'];

let _error = {
    REDUCE_EMPTY: 'Reduce of empty iterator with no initial value',
};


// concat

_m.concat = function* concat(...args) {
    yield* this;
    for (let x of args) {
        if (!_isIter(x) || x[Symbol.isConcatSpreadable] === false) {
            yield x;
        } else {
            yield* x;
        }
    }
};

// array iterators

_m.entries = function entries() {
    let n = -1;
    for (let x of this)
        yield [++n, x];
};

_m.keys = function* keys() {
    let n = -1;
    for (let _ of this) {
        yield ++n;
    }
};

_m.values = function values() {
    yield* this;
};

// filter/map/reduce

_m.filter = function* filter(fn, thisArg = _undef) {
    let n = -1;

    for (let x of this) {
        if (fn.call(thisArg, x, ++n, this)) {
            yield x;
        }
    }
};

_m.forEach = function forEach(fn, thisArg = _undef) {
    let n = -1;

    for (let x of this) {
        fn.call(thisArg, x, ++n, this);
    }
};

_m.map = function* map(fn, thisArg = _undef) {
    let n = -1;

    for (let x of this) {
        yield fn.call(thisArg, x, ++n, this);
    }
};

_m.reduce = function reduce(fn, init = _undef) {
    let n = -1;
    let hasInit = arguments.length > 1;

    for (let x of this) {
        if (!hasInit) {
            init = x;
            hasInit = true;
            ++n;
        } else {
            init = fn.call(this, init, x, ++n, this);
        }
    }

    if (!hasInit) {
        throw new TypeError(_error.REDUCE_EMPTY);
    }

    return init;
};

_m.reduceRight = function reduceRight(fn, init = _undef) {
    if (arguments.length > 1) {
        return [...this].reduceRight(fn, init);
    }
    return [...this].reduceRight(fn);
};

// flats

_m.flat = function* flat(depth = 1) {
    yield* _flat(this, _toInt(depth, 1));
};

_m.flatMap = function* flatMap(fn, thisArg = _undef) {
    let n = -1;

    for (let x of this) {
        let r = fn.call(thisArg, x, ++n, this);
        yield* _flat(r, 1);
    }
};

// booleans

_m.every = function every(fn, thisArg = _undef) {
    let n = -1;

    for (let x of this) {
        if (!fn.call(thisArg, x, ++n, this)) {
            return false;
        }
    }

    return true;
};

_m.some = function some(fn, thisArg = _undef) {
    let n = -1;

    for (let x of this) {
        if (fn.call(thisArg, x, ++n, this)) {
            return true;
        }
    }

    return false;
};

// find and friends

_m.find = function find(fn, thisArg = _undef) {
    let r = _find(this, fn, thisArg);
    if (r)
        return r[1];
};

_m.findIndex = function findIndex(fn, thisArg = _undef) {
    let r = _find(this, fn, thisArg);
    if (r)
        return r[0];
};

_m.indexOf = function indexOf(value, fromIndex = 0) {
    return _indexOf(this, value, fromIndex);
};

_m.lastIndexOf = function indexOf(value, fromIndex = 0) {
    return [...this].lastIndexOf(value, fromIndex);
};

_m.includes = function includes(value, fromIndex = 0) {
    return _indexOf(this, value, fromIndex) >= 0;
};


// slice

_m.slice = function* slice(begin = 0, end = _undef) {
    let n = -1;

    begin = _toInt(begin, 0);

    if (arguments.length > 1) {
        end = _toInt(end, 0);

        if (begin < 0 || end < 0 || begin >= end) {
            yield* [...this].slice(begin, end);
        } else {
            for (let x of this) {
                ++n;
                if (n >= end) {
                    break;
                }
                if (n >= begin) {
                    yield x;
                }
            }
        }
    } else {
        if (begin < 0) {
            yield* [...this].slice(begin);
        } else {
            for (let x of this) {
                ++n;
                if (n >= begin) {
                    yield x;
                }
            }
        }
    }
};

// misc

_m.join = function join(separator = _undef) {
    return [...this].join(separator || ', ');
};

_m.toString = function toString() {
    return [...this].toString();
};

_m.toLocaleString = function toString() {
    return [...this].toLocaleString();
};

_m.toArray = function toArray() {
    return [...this];
};


// helpers

function* _iter(it) {
    yield* it;
}

function _isIter(obj) {
    return obj && typeof obj === 'object' && typeof obj[Symbol.iterator] === 'function';
}

function _toInt(s, def) {
    let n = Number(s);
    return Number.isNaN(n) ? def : (n | 0);
}

function* _flat(it, depth) {
    if (!_isIter(it)) {
        yield it;
    } else if (depth <= 0) {
        yield* it;
    } else {
        for (let x of it) {
            yield* _flat(x, depth - 1);
        }
    }
}

function _find(it, fn, thisArg) {
    let n = -1;

    for (let x of it) {
        if (fn.call(thisArg, x, ++n, this)) {
            return [n, x];
        }
    }
}

function _indexOf(it, value, fromIndex) {
    fromIndex = _toInt(fromIndex, 0);

    if (fromIndex < 0) {
        return [...it].indexOf(value, fromIndex);
    }

    let n = -1;

    for (let x of it) {
        if (++n >= fromIndex && x === value)
            return n;
    }

    return -1;
}

// loader

function _load() {
    const IteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));

    let props = {};

    for (let f in _m) {
        props[f] = {value: _m[f], enumerable: false};
    }

    Object.defineProperties(IteratorPrototype, props);
}

_load();
