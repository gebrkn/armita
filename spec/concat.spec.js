let h = require('./support/helpers');

describe('concat', function () {
    let aa = [1, 2, 3];
    let bb = [10, 11, 12];

    it('should accept no args', function () {
        expect(
            [...h.iter(aa).concat()]
        ).toEqual(
            aa
        );
    });

    it('should accept primitives', function () {
        expect(
            [...h.iter(aa).concat(11, true, 'abc', null)]
        ).toEqual(
            [1, 2, 3, 11, true, 'abc', null]
        );
    });

    it('should spread arrays', function () {
        expect(
            [...h.iter(aa).concat([111, 222], [10, 9, 8])]
        ).toEqual(
            [1, 2, 3, 111, 222, 10, 9, 8]);
    });

    it('should spread iterators', function () {
        expect(
            [...h.iter(aa).concat(h.iter(bb))]
        ).toEqual(
            [1, 2, 3, 10, 11, 12]
        );
    });

    it('should spread string objects', function () {
        expect(
            [...h.iter(aa).concat(new String('abc'))]
        ).toEqual(
            [1, 2, 3, 'a', 'b', 'c']
        );
    });

    it('should accept mixed args', function () {
        expect(
            [...h.iter(aa).concat(99, h.iter(bb), 'abc', [9, 8, 7])]
        ).toEqual(
            [1, 2, 3, 99, 10, 11, 12, 'abc', 9, 8, 7]
        );
    });

    it('should respect isConcatSpreadable', function () {
        let a = [11, 22, 33];
        let b = [44, 55, 66];

        a[Symbol.isConcatSpreadable] = false;

        expect(
            [...h.iter(aa).concat(a, b)]
        ).toEqual(
            [1, 2, 3, [11, 22, 33], 44, 55, 66]
        );
    });

    it('should be chainable', function () {
        expect(
            [...h.iter(aa).concat(h.iter(bb)).concat(h.iter(aa))]
        ).toEqual(
            [1, 2, 3, 10, 11, 12, 1, 2, 3]
        );
    });

});