Rand
==========

A javascript class which provides random numbers with different distributions

I will try to add images of the distributions soon

## Usage
```js
// Get a random number between 0 and 10 with "double exponential" distribution
Rand.random(0, 10, 'double-exponential');
```

This is a distribution that has a high probability in the middle and then *"dies out"* in both directions.
  
To use the normal random function, use the *random* or *constant* distribution

```js
// Just a random number between 0 and 1
Rand.random();
  
// Same as
Rand.random(0, 1, 'constant');
```

## Random values

### Boolean
```js
// Get a boolean value
Rand.bool()

// Get a boolean value with a 60% probability of true
Rand.bool(0.6)
```

### Integer
```js
// A random integer between 0 and 1, ah yeah!
Rand.int()

// A random integer between 0 and 26
Rand.int(0, 26)
```

### Hashes
```js
// A random hash with 40 hexadecimal chars (0-f)
Rand.hash()

// Random hash with a length of 32 chars
Rand.hash(32)
```

```js
// A base64 encoded hash, 40 chars long
Rand.base64()

// Or defined length (64 chars long)
Rand.base64(64)
```

### Date
```js
// A random date from now and 1 year forwards
Rand.date()

// A random date between two dates
Rand.date(new Date('2013-05-12'), new Date('2014-02-21'))
```

### Colors
```js
// A random hexadecimal color
Rand.color()

// A random rgba color
Rand.rgba()

## Distributions