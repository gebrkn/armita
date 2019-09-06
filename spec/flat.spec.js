let h = require('./support/helpers');

describe('flat', function () {

    let aa = [1, 2, [3, [4, [5, 6], 7]], 8];

    it('should default to 1 if no args', function () {
        expect(
            [...h.iter(aa).flat()]
        ).toEqual(
            [1, 2, 3, [4, [5, 6], 7], 8]
        );
    });

    it('should default to 1 if bad args', function () {
        expect(
            [...h.iter(aa).flat('foo')]
        ).toEqual(
            [1, 2, 3, [4, [5, 6], 7], 8]
        );
    });

    it('should work for depth > 1', function () {
        expect(
            [...h.iter(aa).flat(2)]
        ).toEqual(
            [1, 2, 3, 4, [5, 6], 7, 8]
        );
    });

    it('should work for depth > maxdepth', function () {
        expect(
            [...h.iter(aa).flat(99)]
        ).toEqual(
            [1, 2, 3, 4, 5, 6, 7, 8]
        );
    });

    it('should flatten generators', function () {
        expect(
            [...h.iter([...aa, h.iter([11, [22, [33]], 44])]).flat(2)]
        ).toEqual(
            [1, 2, 3, 4, [5, 6], 7, 8, 11, 22, [33], 44]
        );
    });

});

describe('flatMap', function () {

    it('should work', function () {
        expect(
            [...h.iter([2, 3, 4]).flatMap(x => [x, x * x])]
        ).toEqual(
            [2, 4, 3, 9, 4, 16]
        );
    });

    it('should provide correct callback args', function () {
        expect(
            [...h.iter([2, 3, 4]).flatMap((x, i) => [i, x])]
        ).toEqual(
            [0, 2, 1, 3, 2, 4]
        );
    });


});
