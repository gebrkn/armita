let h = require('./support/helpers');

describe('filter', function () {
    let aa = [10, 11, 12, 13, 14, 15, 16];

    it('should work', function () {
        expect(
            [...h.iter(aa).filter(x => x % 2)]
        ).toEqual(
            aa.filter(x => x % 2)
        );
    });

    it('should fail if no args', function () {
        expect(
            () => [...h.iter(aa).filter()]
        ).toThrow(
        );
    });

    it('should return iterator', function () {
        expect(
            h.isIter(h.iter(aa).filter(x => x % 2))
        ).toBe(
            true
        );
    });

    it('should provide correct callback args', function () {
        let t = [];
        let _ = [...h.iter([10, 11]).filter((x, i, a) => t.push([x, i, typeof a]))];

        expect(
            t
        ).toEqual(
            [[10, 0, 'object'], [11, 1, 'object']]
        );
    });

    it('should respect thisArg', function () {
        let t = [];
        let o = {
            y: 77,
            f(x, i, a) {
                t.push([x, this.y])
            }


        }
        let _ = [...h.iter([10, 11]).filter(o.f, o)];

        expect(
            t
        ).toEqual(
            [[10, 77], [11, 77]]
        );
    });

});

describe('map', function () {

    it('should work', function () {
        expect(
            [...h.iter([10, 11, 12]).map(x => x * 2)]
        ).toEqual(
            [20, 22, 24]
        );
    });

    it('should fail if no args', function () {
        expect(
            () => [...h.iter([1, 2]).map()]
        ).toThrow(
        );
    });

});

describe('reduce', function () {
    let aa = [10, 11, 12];

    it('should work with init', function () {
        expect(
            h.iter(aa).reduce((a, x) => a + '/' + x, 'foo')
        ).toEqual(
            'foo/10/11/12'
        );
    });

    it('should work without init', function () {
        expect(
            h.iter(aa).reduce((a, x) => a + '/' + x)
        ).toEqual(
            '10/11/12'
        );
    });

    it('should fail if no args', function () {
        expect(
            () => h.iter(aa).reduce()
        ).toThrow(
        );
    });

    it('should fail with empty this and no init', function () {
        expect(
            () => h.iter([]).reduce((a, x) => a + x)
        ).toThrow(
        );
    });

    it('should return init with empty this', function () {
        expect(
            h.iter([]).reduce((a, x) => a + x, 999)
        ).toEqual(
            999
        );
    });

    it('should provide correct callback args', function () {
        let t = [];
        let _ = h.iter(aa).reduce((a, x, i) => {
            t.push([a, x, i]);
            return 999
        }, 111);

        expect(
            t
        ).toEqual(
            [[111, 10, 0], [999, 11, 1], [999, 12, 2]]
        );
    });

    it('should provide correct callback args with init', function () {
        let t = [];
        let _ = h.iter(aa).reduce((a, x, i) => {
            t.push([a, x, i]);
            return 999
        });

        expect(
            t
        ).toEqual(
            [[10, 11, 1], [999, 12, 2]]
        );
    });


});

