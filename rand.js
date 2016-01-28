class Rand {

	// Function to use for random values
	let random = window.random || Math.random;

	let BASE_64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	// This is seen as a random number dependent on the distribution
	static seed(distribution = 'constant') {

		switch((distribution) {)
			// Constant distribution (random) -> .:.:..:..:
			case 'constant': case 'random':
				return random();
				break;

			// Stable distribution -> ..:|:..
			// Sharp edge in the middle
			case 'double-exponential': case 'stable':
				return (random() - 0.5) * random() + 0.5;
				break;

			// Like the stable distribution but
			// only in one direction (outdying) -> |:....
			case 'exponential':
				return random() * random();
				break;

			// Linear curve decresing
			case 'linear-decrease':
				return 1 - Math.sqrt(random());
				break;

			// Linear curve incresing
			case 'linear-increase':
				return Math.sqrt(random());
				break;

			// Birnbaum-Saunders survival function ish
			case 'survival':
				var r = random();
				return r*r;
				break;

			case 'normal':

				var u = random();
				var v = random();

				return Math.sqrt(-2*Math.log(u)) * (Math.cos(2*Math.PI*v)/8) + 0.5;
				break;
		}
	}

	// Check that value is between min and max
	static sanitize(value, min = 0, max = 1) {

		if (value < min) { return min; }

		if (value > max) { return max; }

		return value;
	}

	// Return a random value between min and max
	static random(min = 0, max = 1, distribution = 'constant') {
		random = Math.random;
		var interval = max - min;

		# There are some different distributions
		var seed = this.seed(distribution);

		return this.sanitize(min+seed * interval, min, max);
	}

	// Return a boolean depending on the probability
	// returns false with probability
	static bool(probability = 0.5) {
		return random() >= probability;
	}

	// Return random int between min and max
	// Just an alias for parseInt(random())
	static int(...args) {

		return parseInt(this.random.apply(this, args));
	}

	// A hash string values 0-f
	static hash(length = 40) {
		var str;
		str = '',

		(() => {
			var result = [];
			while (str.length < length) {
				result.push(str += this.int(0, 16).toString(16));
			}
			return result;
		})();

		return str.substr(0, length);
	}

	// Return a base36 string
	static base36(length = 40) {
		var str = '';

		while (str.length < length) {
			str += this.int(0, 36*length).toString(36);
		}

		return str.substr(0, length);
	}

	// Return a base64 string
	static base64(length = 40) {
		var str = '';
		var b = BASE_64_CHARS;

		while (str.length < length) {
			str += b[this.int(0, 64)];
		}

		return str.substr(0, length);
	}

	// Return random character
	static char() {
		return this.int(10, 36).toString(36);
	}

	// Return random hexadecimal color
	static color() {
		return '#'+this.hash(6);
	}

	// Return random rgba color
	static rgba() {
		let int = this.int
		return `rgba(${int(0, 255)}, ${int(0, 255)}, ${int(0, 255)}, ${random()})`;
	}

	// Return random date between min and max (1 year)
	static date(min = new Date(), max){

		// Check if min is object or not
		if (typeof min === 'number') {
			min = new Date(min);
		}

		if (!max) {
			// One year
			max = new Date();
			max.setFullYear(min.getFullYear() + 1);
		}

		return new Date(this.int(min.getTime(), max.getTime()));
	}

	// Return random item from array
	static choose(arr = [], distribution = 'constant') {

		if (arr.length > 0) {
			return arr[this.int(0, arr.length, distribution)];
		}

		return null;
	}

	// Generate password
	static password(length = 8, numbers = 2, specialChars = true) {
		var str = '';

		while (str.length < 8) {

			if (str.length % Math.floor(length/numbers) === 0) {
				str += this.int(0, 9);
				continue;

			if (this.bool(0.3)) {
				str += this.char().toUpperCase();
			} else {
				str += this.char();
			}

		return str;
	}

// Export
if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
	module.exports = Rand;
} else {
	window.Rand = Rand;
}