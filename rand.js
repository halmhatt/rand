'use strict';

(function () {
    'use strict';

    var BASE_64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789+/';

    // Namespace
    var Rand = {
        // Function to use for random values, available to overwrite
        randomGenerator: Math.random,

        // This is seen as a random number dependent on the distribution
        seed: function seed() {
            var distribution = arguments.length <= 0 || arguments[0] === undefined ? 'constant' : arguments[0];

            switch (distribution) {
                // Constant distribution (random) -> .:.:..:..:
                case 'constant':case 'random':
                    return Rand.randomGenerator();

                // Stable distribution -> ..:|:..
                // Sharp edge in the middle
                case 'double-exponential':case 'stable':
                    return (Rand.randomGenerator() - 0.5) * Rand.randomGenerator() + 0.5;

                // Like the stable distribution but
                // only in one direction (outdying) -> |:....
                case 'exponential':
                    return Rand.randomGenerator() * Rand.randomGenerator();

                // Linear curve decresing
                case 'linear-decrease':
                    return 1 - Math.sqrt(Rand.randomGenerator());

                // Linear curve incresing
                case 'linear-increase':
                    return Math.sqrt(Rand.randomGenerator());

                // Birnbaum-Saunders survival function ish
                case 'survival':
                    var r = Rand.randomGenerator();
                    return Math.pow(r, 2);

                case 'normal':

                    var u = Rand.randomGenerator();
                    var v = Rand.randomGenerator();

                    return Math.sqrt(-2 * Math.log(u)) * (Math.cos(2 * Math.PI * v) / 8) + 0.5;
            }
        },

        // Check that value is between min and max
        sanitize: function sanitize(value) {
            var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

            if (value < min) {
                return min;
            }

            if (value > max) {
                return max;
            }

            return value;
        },

        // Return a random value between min and max
        random: function random() {
            var min = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var max = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
            var distribution = arguments.length <= 2 || arguments[2] === undefined ? 'constant' : arguments[2];

            var interval = max - min;

            // There are some different distributions
            var seed = Rand.seed(distribution);

            return Rand.sanitize(min + seed * interval, min, max);
        },

        // Return a boolean depending on the probability
        // returns false with probability
        bool: function bool() {
            var probability = arguments.length <= 0 || arguments[0] === undefined ? 0.5 : arguments[0];

            return Rand.randomGenerator() >= probability;
        },

        // Return random int between min and max
        // Just an alias for parseInt(random())
        int: function int() {
            return parseInt(Rand.random.apply(Rand, arguments));
        },

        // A hash string values 0-f
        hash: function hash() {
            var length = arguments.length <= 0 || arguments[0] === undefined ? 40 : arguments[0];

            var str = '';

            while (str.length < length) {
                str += Rand.int(0, 16).toString(16);
            }

            return str.substr(0, length);
        },

        // Return a base36 string
        base36: function base36() {
            var length = arguments.length <= 0 || arguments[0] === undefined ? 40 : arguments[0];

            var str = '';

            while (str.length < length) {
                str += Rand.int(0, 36 * length).toString(36);
            }

            return str.substr(0, length);
        },

        // Return a base64 string
        base64: function base64() {
            var length = arguments.length <= 0 || arguments[0] === undefined ? 40 : arguments[0];

            var str = '';
            var b = BASE_64_CHARS;

            while (str.length < length) {
                str += b[Rand.int(0, 64)];
            }

            return str.substr(0, length);
        },

        // Return random character
        char: function char() {
            return Rand.int(10, 36).toString(36);
        },

        // Return random hexadecimal color
        color: function color() {
            return '#' + Rand.hash(6);
        },

        // Return random rgba color
        rgba: function rgba() {
            var int = Rand.int;
            return 'rgba(' + int(0, 255) + ', ' + int(0, 255) + ', ' + int(0, 255) + (', ' + Rand.randomGenerator() + ')');
        },

        // Return random date between min and max (1 year)
        date: function date() {
            var min = arguments.length <= 0 || arguments[0] === undefined ? new Date() : arguments[0];
            var max = arguments[1];

            // Check if min is object or not
            if (typeof min === 'number') {
                min = new Date(min);
            }

            if (!max) {
                // One year
                max = new Date();
                max.setFullYear(min.getFullYear() + 1);
            }

            return new Date(Rand.int(min.getTime(), max.getTime()));
        },

        // Return random item from array
        choose: function choose() {
            var arr = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            var distribution = arguments.length <= 1 || arguments[1] === undefined ? 'constant' : arguments[1];

            if (arr.length > 0) {
                return arr[Rand.int(0, arr.length, distribution)];
            }

            return null;
        },

        // Generate password
        password: function password() {
            var length = arguments.length <= 0 || arguments[0] === undefined ? 8 : arguments[0];
            var numbers = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

            var str = '';

            while (str.length < length) {

                if (str.length % Math.floor(length / numbers) === 0) {
                    str += Rand.int(0, 9);
                    continue;
                }

                if (Rand.bool(0.3)) {
                    str += Rand.char().toUpperCase();
                } else {
                    str += Rand.char();
                }
            }

            return str;
        }
    };

    // Export
    /* eslint no-undef: [0] */
    if (typeof module !== "undefined" && module !== null && module.exports != null) {

        module.exports = Rand;
    } else {
        window.Rand = Rand;
    }
})();
