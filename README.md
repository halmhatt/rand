Rand
==========

A javascript class which provides random numbers with different distributions

I will try to add images of the distributions soon

## Usage
```js
// Get a random number between 0 and 10 with "double exponential" 
// distribution (ex. 0.4623468576464802)
Rand.random(0, 10, 'double-exponential'); 
```

This is a distribution that has a high probability in the middle and then *"dies out"* in both directions.
  
To use the normal random function, use the *random* or *constant* distribution

```js
// Just a random number between 0 and 1 (ex. 0.3653468576464802)
Rand.random(); 
  
// Same as
Rand.random(0, 1, 'constant');
```

## Random values

### Boolean
```js
// Get a boolean value (true or false)
Rand.bool();

// Get a boolean value with a 60% probability of beeing true
Rand.bool(0.6);
```

### Integer
```js
// A random integer between 0 and 1, ah yeah! (ex. 1 or 0)
Rand.int(); 

// A random integer between 0 and 26 (ex. 13)
Rand.int(0, 26);

// Use a different probability distribution (ex. 13)
Rand.in(0, 26, 'double-exponent');
```

### Hashes
```js
// A random hash with 40 hexadecimal chars (0-f) (ex. "c3d0b51b42205d039e0a06e1f221d2f742aa59c1")
Rand.hash();

// Random hash with a length of 32 chars (ex. "f5495b546aa984a74a2cc45f08917147")
Rand.hash(32);
```

```js
// A base64 encoded hash, 40 chars long (ex. "DbVUCEY5cTu9Tb9eMmWjuioKqM/bEUrMsR5rPjea")
Rand.base64();

// Or defined length (64 chars long) 
// (ex. "IfgBO2And5NnhDkC4l97ZyUWZI8/WEMqCv+mn/DFFurEsETYLihLK8plT4ni237A")
Rand.base64(64);
```

```js
// Random base36 encoded hash, 40 chars long (ex. "n0f4612gxtzi8z3w8fusgo12ihycnpcq711f134z")
Rand.base36();

// Or defined length (86 chars long)
// (ex. "1nrrb10whkwz1i38he91iqh0wylv1x0xn1tk1jy1na2561w21201kv951eg1ui29u1p0mrkjdk1v5j5289paf6")
Rand.base36(86);
```

### Date
```js
// A random date between now and 1 year from now (ex. Thu Apr 03 2014 16:38:14 GMT+0200 (CEST))
Rand.date();

// A random date between two dates
Rand.date(new Date('2013-05-12'), new Date('2014-02-21'));
```

### Colors
```js
// A random hexadecimal color (ex. "#7e39b5")
Rand.color();

// A random rgba color (ex. "rgba(196,234,50,0.16)")
Rand.rgba();
```

### Other stuff
```js
// Random character (ex. 'a')
Rand.char();
```

## Distributions