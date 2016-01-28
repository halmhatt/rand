describe('Rand', function () {
    var Rand = require('../rand.js');
    var _ = require('lodash');

    var randomValues = [0.7405318079981953, 0.8702117553912103, 0.06731263734400272, 0.7759508753661066, 0.21565289818681777];
    var index = 0;

    function fakeRandom(atIndex) {
        // Overflow
        if (index >= randomValues.length - 1) {
            index = 0;
        }

        if (atIndex !== undefined) {
            return randomValues[atIndex];
        }

        return randomValues[index++];
    }

    fakeRandom.reset = function () {
        index = 0;
    }

    beforeEach(function () {
        Rand.randomGenerator = fakeRandom;
        fakeRandom.reset();
    });

    // Random with different distributions
    describe('Rand#seed', function () {
        it('Should work with "constant" or "random" distributions', function () {
            expect(Rand.seed('constant')).toBe(fakeRandom(0));
            expect(Rand.seed('random')).toBe(fakeRandom(1));
        });

        it('Should work with "double-exponential" or "stable"', function () {
            expect(Rand.seed('double-exponential')).toBe(0.709313606865531);
            expect(Rand.seed('stable')).toBe(0.16425586218722688);
        });

        it('Should work with "exponential"', function () {
            expect(Rand.seed('exponential')).toBe(0.6444194845611363);
            expect(Rand.seed('exponential')).toBe(0.05223129987028019);
        });

        it('Should work with "linear-decrease"', function () {
            expect(Rand.seed('linear-decrease')).toBe(0.13945842169120304);
            expect(Rand.seed('linear-decrease')).toBe(0.06714858879282903);
        });

        it('Should work with "linear-increase"', function () {
            expect(Rand.seed('linear-increase')).toBe(0.860541578308797);
            expect(Rand.seed('linear-increase')).toBe(0.932851411207171);
        });

        it('Should work with "survival"', function () {
            expect(Rand.seed('survival')).toBe(0.548387358657076);
            expect(Rand.seed('survival')).toBe(0.7572684992210517);
        });

        it('Should work with "normal"', function () {
            expect(Rand.seed('normal')).toBe(0.5664176030379231);
            expect(Rand.seed('normal')).toBe(0.5471394516696948);
        });
    });

    describe('Rand#sanitize', function () {
        it('Should sanitize to small numbers', function () {
            expect(Rand.sanitize(-1, 0, 1)).toBe(0);
            expect(Rand.sanitize(-10, -1, 1)).toBe(-1);
        });

        it('Should sanitize to large numbers', function () {
            expect(Rand.sanitize(2, 0, 1)).toBe(1);
            expect(Rand.sanitize(10, -1, 1)).toBe(1);
        });

        it('Should not sanitize numbers in range', function () {
            expect(Rand.sanitize(0.5, 0, 1)).toBe(0.5);
            expect(Rand.sanitize(0, -1, 1)).toBe(0);
        });
    });

    describe('Rand#random', function () {
        it('Should use fakeRandom to fake random numbers during testing', function () {
            expect(Rand.random()).toBe(0.7405318079981953);
        });

        it('Should return a value between 0 and 1', function () {
            var r = Rand.random();
            expect(r).toBeGreaterThan(0);
            expect(r).toBeLessThan(1);
        });

        it('Should generate a value between 0 and 100', function () {
            expect(Rand.random(0, 100)).toBe(fakeRandom(0) * 100);
        });

        it('Should generate a negative value for negative range', function () {
            expect(Rand.random(-100, 0)).toBe(fakeRandom(0) * 100 - 100);
        });

        it('Should use offset correctly', function () {
            expect(Rand.random(1, 2)).toBe(fakeRandom(0) + 1);
        })

        it('Should use distributions', function () {
            expect(Rand.random(0, 1, 'normal')).not.toBe(fakeRandom(0));
        });
    });

    describe('Rand#bool', function () {
        it('Should return a boolean', function () {
            expect(typeof Rand.bool()).toBe('boolean');
        });

        it('Should handle probability', function () {
            Rand.randomGenerator = function () {
                return 0.6;
            }

            expect(Rand.bool(0.5)).toBe(true);
            expect(Rand.bool(0.7)).toBe(false);
        });
    });

    describe('Rand#int', function () {
        it('Should return an number', function () {
            expect(typeof Rand.int()).toBe('number');
            expect(Rand.int()).toBe(Math.floor(fakeRandom(1)));
        });

        it('Should be possible to use min and max', function () {
            expect(Rand.int(0, 100)).toBe(74);
        })

        it('Should use distributions', function () {
            expect(Rand.int(0, 100, 'normal')).not.toBe(74);
        });
    });

    describe('Rand#hash', function () {
        it('Should default to a length of 40 chars', function () {
            expect(Rand.hash().length).toBe(40);
        });

        it('Should have the correct length', function () {
            expect(Rand.hash(10).length).toBe(10);
        });

        it('Should have only characters 0-f', function () {
            expect(Rand.hash()).toMatch(/^[0-9a-f]+$/);
        });
    });

    describe('Rand#base36', function () {
        it('Should default to a length of 40 chars', function () {
            expect(Rand.base36().length).toBe(40);
        });

        it('Should have correct length', function () {
            expect(Rand.base36(10).length).toBe(10);
        });

        it('Should have only characters [0-9a-z]', function () {
            expect(Rand.base36()).toMatch(/^[0-9a-z]+$/);
        });
    });

    describe('Rand#base64', function () {
        it('Should default to a length of 40 chars', function () {
            expect(Rand.base64().length).toBe(40);
        });

        it('Should have correct length', function () {
            expect(Rand.base64(10).length).toBe(10);
        });

        it('Should have only characters [0-9a-zA-Z/+]', function () {
            expect(Rand.base36()).toMatch(/^[0-9a-zA-Z\/\+]+$/);
        });
    });

    describe('Rand#char', function () {
        it('Should be a string', function () {
            expect(typeof Rand.char()).toBe('string');
        });

        it('Should have length 1', function () {
            expect(Rand.char().length).toBe(1);
        });

        it('Should only be characters', function () {
            expect(Rand.char()).toMatch(/^[a-z]$/);
        });
    });

    describe('Rand#color', function () {
        it('Should match pattern #dddddd', function () {
            expect(Rand.color()).toMatch(/^\#[0-9a-f]{6}$/);
        });
    });

    xdescribe('Rand#rgb', function () {
        it('Should return a matching string', function () {
            expect(Rand.rgb())
                .toMatch(/rgba\(\d{1,3}\,\s?\d{1,3}\,\s?\d{1,3}\)/);
        });

        it('Should have all values between 0 and 255', function () {
            var rgbValues = Rand.rgb().match(/\d{1,3}/g);
            _.each(rgbValues, function (num) {
                expect(num >= 0 && num <= 255).toBe(true);
            });
        });
    });

    describe('Rand#rgba', function () {
        it('Should return a matching string', function () {
            expect(Rand.rgba())
                .toMatch(/rgba\(\d{1,3}\,\s?\d{1,3}\,\s?\d{1,3}\,\s?\d\.\d+\)/);
        });

        it('Should have all values between 0 and 255', function () {
            var rgbValues = Rand.rgba().match(/\d{1,3}/g);

            _.each(_.slice(rgbValues, 0, 3), function (num) {
                expect(num >= 0 && num <= 255).toBe(true);
            });
        });

        xit('Should be possible to define opacity', function () {
            expect(Rand.rgba(0.3).substr(-4, 3)).toBe('0.3');
        });
    });

    describe('Rand#date', function () {
        it('Should be a date object', function () {
            expect(typeof Rand.date()).toBe('object');
            expect(Rand.date() instanceof Date).toBe(true);
        });

        it('Should be in the future by default', function () {
            expect(Rand.date()).toBeGreaterThan(new Date());
        });
    });

    describe('Rand#choose', function () {
        var arr = ['a', 'b', 'c'];

        it('Should choose a value from an array', function () {
            var choosen = Rand.choose(arr);

            expect(arr.indexOf(choosen)).not.toBe(-1);
        });

        it('Should use distributions', function () {
            Rand.randomGenerator = function () {
                return 0.5;
            };

            expect(Rand.choose(arr)).toBe('b');
            expect(Rand.choose(arr, 'exponential')).toBe('a');
        });
    });

    describe('Rand#password', function () {
        it('Should have length 8, 2 numbers and special chars as default', function () {
            var pass = Rand.password();
            expect(pass.length).toBe(8);
            expect(pass.match(/\d/g).length).toBe(2);
        });

        it('Should be possible to change the length', function () {
            expect(Rand.password(20).length).toBe(20);
        });
    });
});