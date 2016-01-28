(function () {
    'use strict';

    const BASE_64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz0123456789+/';

    // Namespace
    let Rand = {
        // Function to use for random values, available to overwrite
        randomGenerator: Math.random,

        // This is seen as a random number dependent on the distribution
        seed(distribution = 'constant') {

            switch(distribution) {
                // Constant distribution (random) -> .:.:..:..:
                case 'constant': case 'random':
                    return Rand.randomGenerator();

                // Stable distribution -> ..:|:..
                // Sharp edge in the middle
                case 'double-exponential': case 'stable':
                    return ((Rand.randomGenerator() - 0.5) *
                        Rand.randomGenerator() + 0.5);

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
                    let r = Rand.randomGenerator();
                    return Math.pow(r, 2);

                case 'normal':

                    let u = Rand.randomGenerator();
                    let v = Rand.randomGenerator();

                    return (Math.sqrt(- 2 * Math.log(u)) *
                        (Math.cos(2 * Math.PI * v) / 8) + 0.5);
            }
        },

        // Check that value is between min and max
        sanitize(value, min = 0, max = 1) {

            if (value < min) {
                return min;
            }

            if (value > max) {
                return max;
            }

            return value;
        },

        // Return a random value between min and max
        random(min = 0, max = 1, distribution = 'constant') {
            let interval = max - min;

            // There are some different distributions
            let seed = Rand.seed(distribution);

            return Rand.sanitize(min + seed * interval, min, max);
        },

        // Return a boolean depending on the probability
        // returns false with probability
        bool(probability = 0.5) {
            return Rand.randomGenerator() >= probability;
        },

        // Return random int between min and max
        // Just an alias for parseInt(random())
        int(...args) {
            return parseInt(Rand.random(...args));
        },

        // A hash string values 0-f
        hash(length = 40) {
            let str = '';

            while (str.length < length) {
                str += Rand.int(0, 16).toString(16);
            }

            return str.substr(0, length);
        },

        // Return a base36 string
        base36(length = 40) {
            let str = '';

            while (str.length < length) {
                str += Rand.int(0, 36 * length).toString(36);
            }

            return str.substr(0, length);
        },

        // Return a base64 string
        base64(length = 40) {
            let str = '';
            let b = BASE_64_CHARS;

            while (str.length < length) {
                str += b[Rand.int(0, 64)];
            }

            return str.substr(0, length);
        },

        // Return random character
        char() {
            return Rand.int(10, 36).toString(36);
        },

        // Return random hexadecimal color
        color() {
            return '#' + Rand.hash(6);
        },

        // Return random rgba color
        rgba() {
            let int = Rand.int;
            return `rgba(${int(0, 255)}, ${int(0, 255)}, ${int(0, 255)}` +
                `, ${Rand.randomGenerator()})`;
        },

        // Return random date between min and max (1 year)
        date(min = new Date(), max) {

            // Check if min is object or not
            if (typeof min === 'number') {
                min = new Date(min);
            }

            if (! max) {
                // One year
                max = new Date();
                max.setFullYear(min.getFullYear() + 1);
            }

            return new Date(Rand.int(min.getTime(), max.getTime()));
        },

        // Return random item from array
        choose(arr = [], distribution = 'constant') {

            if (arr.length > 0) {
                return arr[Rand.int(0, arr.length, distribution)];
            }

            return null;
        },

        // Generate password
        password(length = 8, numbers = 2) {
            let str = '';

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
    if ((typeof module !== "undefined" && module !== null) &&
        (module.exports != null)) {

        module.exports = Rand;
    } else {
        window.Rand = Rand;
    }
})();