let h = require('./support/helpers');

describe('slice', function () {

    let aa = [11, 22, 33, 44, 55];

    it('should work without args', function () {
        expect(
            [...h.iter(aa).slice()]
        ).toEqual(
            aa
        );
    });

    it('should work with positive start', function () {
        expect(
            [...h.iter(aa).slice(3)]
        ).toEqual(
            aa.slice(3)
        );
    });

    it('should work with negative start', function () {
        expect(
            [...h.iter(aa).slice(-3)]
        ).toEqual(
            aa.slice(-3)
        );
    });

    it('should work with positive start and end', function () {
        expect(
            [...h.iter(aa).slice(1, 4)]
        ).toEqual(
            aa.slice(1, 4)
        );
    });

    it('should stop when end is reached', function () {
        expect(
            [...h.range(0, Infinity, 1).slice(1, 4)]
        ).toEqual(
            [0, 1, 2, 3, 4, 5].slice(1, 4)
        );
    });

    it('should work with negative start or end', function () {
        expect(
            [...h.iter(aa).slice(-4, -1)]
        ).toEqual(
            aa.slice(-4, -1)
        );
    });




});
