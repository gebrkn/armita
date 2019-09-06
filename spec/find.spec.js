let h = require('./support/helpers');

describe('find', function () {

    it('should work', function () {
        expect(
            h.iter([1, 2, 5, 10, 11]).find(x => x > 5)
        ).toEqual(
            10
        );
    });
});

describe('findIndex', function () {

    it('should work', function () {
        expect(
            h.iter([0, 11, 22, 33, 44]).findIndex(x => x === 33)
        ).toEqual(
            3
        );
    });
});

describe('indexOf', function () {

    it('should work', function () {
        expect(
            h.iter([0, 11, 22, 33, 44]).indexOf(33)
        ).toEqual(
            3
        );
    });

    it('should work with an empty arg', function () {
        expect(
            h.iter([]).indexOf(33)
        ).toEqual(
            -1
        );
    });

    it('should accept a positive start index', function () {
        expect(
            h.iter([0, 11, 22, 33, 44]).indexOf(33, 1)
        ).toEqual(
            3
        );

        expect(
            h.iter([0, 11, 22, 33, 44]).indexOf(33, 4)
        ).toEqual(
            -1
        );
    });

    it('should accept a negative start index', function () {
        expect(
            h.iter([0, 11, 22, 33, 44]).indexOf(33, -1)
        ).toEqual(
            -1
        );

        expect(
            h.iter([0, 11, 22, 33, 44]).indexOf(33, -4)
        ).toEqual(
            3
        );
    });

    it('should return -1 with a wrong start index', function () {
        expect(
            h.iter([0, 11, 22, 33, 44]).indexOf(33, 999)
        ).toEqual(
            -1
        );
    });
});

describe('includes', function () {

    it('should work', function () {
        expect(
            h.iter([0, 11, 22, 33, 44]).includes(33)
        ).toEqual(
            true
        );
        expect(
            h.iter([0, 11, 22, 33, 44]).includes(99)
        ).toEqual(
            false
        );
    });
});


