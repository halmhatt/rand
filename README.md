Randomizer
==========

A javascript class which provides random numbers with different distributions

I will try to add images of the distributions soon

## Usage
```js
// Get a random number between 0 and 10 with "double exponential" distribution
Randomizer.random(0, 10, 'double-exponential');
```

This is a distribution that has a high probability in the middle and then *"dies out"* in both directions.
  
To use the normal random function, use the *random* or *constant* distribution

```js
// Just a random number between 0 and 1
Randomizer.random();
  
// Same as
Randomizer.random(0, 1, 'constant');
```
