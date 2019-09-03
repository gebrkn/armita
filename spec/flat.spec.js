let h = require('./support/helpers');

describe('flat', function () {

    it('should default to 1 if no args', function () {
        expect(
            [...h.iter(1, 2, [3, 4], 5).flat()]
        ).toEqual(
            [1, 2, 3, 4, 5]
        );
    });

    it('should default to 1 if bad args', function () {
        expect(
            [...h.iter(1, 2, [3, 4], 5).flat('foo')]
        ).toEqual(
            [1, 2, 3, 4, 5]
        );
    });

    it('should work for depth > 1', function () {
        expect(
            [...h.iter(1, 2, [3, [4, [5, 6], 7]], 8).flat(2)]
        ).toEqual(
            [1, 2, 3, 4, [5, 6], 7, 8]
        );
    });

    it('should work for depth > maxdepth', function () {
        expect(
            [...h.iter(1, 2, [3, [4, [5, 6], 7]], 8).flat(99)]
        ).toEqual(
            [1, 2, 3, 4, 5, 6, 7, 8]
        );
    });

    it('should flatten generators', function () {
        expect(
            [...h.iter(1, 2, [3, [4, [5, 6], 7]], 8, [h.fibs(5)]).flat(2)]
        ).toEqual(
            [1, 2, 3, 4, [5, 6], 7, 8, 0, 1, 1, 2, 3, 5]
        );
    });

});

describe('flatMap', function () {

    it('should work', function () {
        expect(
            [...h.iter(2, 3, 4).flatMap(x => [x, x * x])]
        ).toEqual(
            [2, 4, 3, 9, 4, 16]
        );
    });

    it('should provide correct callback args', function () {
        expect(
            [...h.iter(2, 3, 4).flatMap((x, i) => [i, x])]
        ).toEqual(
            [0, 2, 1, 3, 2, 4]
        );
    });


});
