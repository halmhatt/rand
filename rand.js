var Rand,
  __slice = [].slice;

Rand = (function() {
  var BASE_64_CHARS, random;

  function Rand() {}

  random = Math.random;

  BASE_64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  Rand.seed = function(distribution) {
    var r, u, v;
    if (distribution == null) {
      distribution = 'constant';
    }
    switch (distribution) {
      case 'constant':
      case 'random':
        return random();
      case 'double-exponential':
      case 'stable':
        return (random() - 0.5) * random() + 0.5;
      case 'exponential':
        return random() * random();
      case 'linear-decrease':
        return 1 - Math.sqrt(random());
      case 'linear-increase':
        return Math.sqrt(random());
      case 'survival':
        r = random();
        return r * r;
      case 'normal':
        u = random();
        v = random();
        return Math.sqrt(-2 * Math.log(u)) * (Math.cos(2 * Math.PI * v) / 8) + 0.5;
    }
  };

  Rand.sanitize = function(value, min, max) {
    if (min == null) {
      min = 0;
    }
    if (max == null) {
      max = 1;
    }
    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  };

  Rand.random = function(min, max, distribution) {
    var interval, seed;
    if (min == null) {
      min = 0;
    }
    if (max == null) {
      max = 1;
    }
    if (distribution == null) {
      distribution = 'constant';
    }
    random = Math.random;
    interval = max - min;
    seed = this.seed(distribution);
    return this.sanitize(min + seed * interval, min, max);
  };

  Rand.bool = function(probability) {
    if (probability == null) {
      probability = 0.5;
    }
    return random() >= probability;
  };

  Rand.int = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return parseInt(this.random.apply(this, args));
  };

  Rand.hash = function(length) {
    var str;
    if (length == null) {
      length = 40;
    }
    str = '';
    while (str.length < length) {
      str += this.int(0, 16).toString(16);
    }
    return str.substr(0, length);
  };

  Rand.base36 = function(length) {
    var str;
    if (length == null) {
      length = 40;
    }
    str = '';
    while (str.length < length) {
      str += this.int(0, 36 * length).toString(36);
    }
    return str.substr(0, length);
  };

  Rand.base64 = function(length) {
    var b, str;
    if (length == null) {
      length = 40;
    }
    str = '';
    b = BASE_64_CHARS;
    while (str.length < length) {
      str += b[this.int(0, 64)];
    }
    return str.substr(0, length);
  };

  Rand.char = function() {
    return this.int(10, 36).toString(36);
  };

  Rand.color = function() {
    return '#' + this.hash(6);
  };

  Rand.rgba = function() {
    return 'rgba(' + this.int(0, 255) + ',' + this.int(0, 255) + ',' + this.int(0, 255) + ',' + (this.int(0, 100) / 100) + ')';
  };

  Rand.date = function(min, max) {
    if (min == null) {
      min = new Date();
    }
    if (typeof min === 'number') {
      min = new Date(min);
    }
    if (!max) {
      max = new Date();
      max.setFullYear(min.getFullYear() + 1);
    }
    return new Date(this.int(min.getTime(), max.getTime()));
  };

  Rand.choose = function(arr, distribution) {
    if (arr == null) {
      arr = [];
    }
    if (distribution == null) {
      distribution = 'constant';
    }
    if (arr.length > 0) {
      return arr[this.int(0, arr.length, distribution)];
    }
    return null;
  };

  Rand.password = function(length, numbers, specialChars) {
    var str;
    if (length == null) {
      length = 8;
    }
    if (numbers == null) {
      numbers = 2;
    }
    if (specialChars == null) {
      specialChars = true;
    }
    str = '';
    while (str.length < 8) {
      if (str.length % Math.floor(length / numbers) === 0) {
        str += this.int(0, 9);
        continue;
      }
      if (this.bool(0.3)) {
        str += this.char().toUpperCase();
      } else {
        str += this.char();
      }
    }
    return str;
  };

  return Rand;

})();

if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
  module.exports = Rand;
} else {
  window.Rand = Rand;
}
