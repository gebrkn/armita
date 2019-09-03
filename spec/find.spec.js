let h = require('./support/helpers');

describe('find', function () {

    it('should work', function () {
        expect(
            h.fibs(10).find(x => x > 5)
        ).toEqual(
            8
        );
    });
});

describe('findIndex', function () {

    it('should work', function () {
        expect(
            h.iter(0, 11, 22, 33, 44).findIndex(x => x === 33)
        ).toEqual(
            3
        );
    });
});

describe('indexOf', function () {

    it('should work', function () {
        expect(
            h.iter(0, 11, 22, 33, 44).indexOf(33)
        ).toEqual(
            3
        );
    });

    it('should accept positive start index', function () {
        expect(
            h.iter(0, 11, 22, 33, 44).indexOf(33, 1)
        ).toEqual(
            3
        );

        expect(
            h.iter(0, 11, 22, 33, 44).indexOf(33, 4)
        ).toEqual(
            -1
        );
    });

    it('should accept negative start index', function () {
        expect(
            h.iter(0, 11, 22, 33, 44).indexOf(33, -1)
        ).toEqual(
            -1
        );

        expect(
            h.iter(0, 11, 22, 33, 44).indexOf(33, -4)
        ).toEqual(
            3
        );
    });

    it('should return -1 with bad start index', function () {
        expect(
            h.iter(0, 11, 22, 33, 44).indexOf(33, 999)
        ).toEqual(
            -1
        );
    });
});

describe('includes', function () {

    it('should work', function () {
        expect(
            h.iter(0, 11, 22, 33, 44).includes(33)
        ).toEqual(
            true
        );
    });
});


