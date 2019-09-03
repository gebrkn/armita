let h = require('./support/helpers');

describe('concat', function () {

    it('should accept no args', function () {
        expect(
            [...h.fibs(3).concat()]
        ).toEqual(
            [0, 1, 1, 2, 3]
        );
    });

    it('should accept primitives', function () {
        expect(
            [...h.fibs(3).concat(11, true, 'foo', null)]
        ).toEqual(
            [0, 1, 1, 2, 3, 11, true, 'foo', null]
        );
    });

    it('should spread arrays', function () {
        expect(
            [...h.fibs(3).concat([111, 222], [10, 9, 8])]
        ).toEqual(
            [0, 1, 1, 2, 3, 111, 222, 10, 9, 8]);
    });

    it('should spread iterators', function () {
        expect(
            [...h.fibs(3).concat(h.range(10, 12))]
        ).toEqual(
            [0, 1, 1, 2, 3, 10, 11]
        );
    });

    it('should spread string objects', function () {
        expect(
            [...h.fibs(3).concat(new String('abc'))]
        ).toEqual(
            [0, 1, 1, 2, 3, 'a', 'b', 'c']
        );
    });

    it('should accept mixed args', function () {
        expect(
            [...h.fibs(3).concat(99, h.range(10, 12), 'foo', [9, 8, 7])]
        ).toEqual(
            [0, 1, 1, 2, 3, 99, 10, 11, 'foo', 9, 8, 7]
        );
    });

    it('should respect isConcatSpreadable', function () {
        let a = [11, 22, 33];
        let b = [44, 55, 66];

        a[Symbol.isConcatSpreadable] = false;

        expect(
            [...h.fibs(3).concat(a, b)]
        ).toEqual(
            [0, 1, 1, 2, 3, [11, 22, 33], 44, 55, 66]
        );
    });

    it('should be chainable', function () {
        expect(
            [...h.fibs(3).concat(h.range(10, 12)).concat(h.fibs(3))]
        ).toEqual(
            [0, 1, 1, 2, 3, 10, 11, 0, 1, 1, 2, 3]
        );
    });

});