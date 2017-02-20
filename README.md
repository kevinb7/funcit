# functify
[![Build Status](https://travis-ci.org/kevinbarabash/functify.svg?branch=v0.3.3)](https://travis-ci.org/kevinbarabash/functify)

Add functional methods like map, reduce, filter, etc. to iterables (ES6 Iterators).

## Why

Only Array has handy functions like map, reduce, filter, etc.  Other iterable
objects such as Map, Set, String, NodeList, and your own iterables don't.  It
would be nice if all iterables had access these functions.

Unfortunately, the Array versions of map and filter return a new array.  This
results in wasted memory allocation when chaining map and filter.  Iterators fix
this.  A value is only computed when the final iterator in chain is asked for the
next value.  The intermediate values are passed through the chain but aren't 
permenantly stored anywhere.

This sounds an awful like transducers.  It is, the main difference is that 
methods can be called in-line as opposed composing function _a priori_.

## Usage

```javascript
const f = require('functify');

const numbers = f([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

for (const odd of numbers.filter(n => n % 2)) {
    console.log(n);  // 1, 3, 5, ...
}

for (const even of numbers.filter(n => !(n % 2))) {
    console.log(n);  // 2, 4, 6, ...
}

for (const square of numbers.take(3).map(n => n * n)) {
    console.log(square);  // 1, 4, 9
}
```
    
## Maps and Objects

The new Map class in ES6 has three methods which return iterators:

- `keys()`
- `values()`
- `entries()`

A Map instance itself can be used as an iterator, e.g.

```javascript
const map = new Map([
    ['x', 5], 
    ['y', 10]
]);

for (const [k, v] of map) {
    console.log(`map['${k}'] = ${v}`);  // map['x'] = 5, map['y'] = 10
}
```
    
`functify` wraps Map instances and exposes versions of `keys()`, `values()`, 
and `entries()` that methods like `map()` and `filter()` can be chained to, e.g.


```javascript
for (const v2 of functify(map).entries().map(pair => pair[1] * pair[1])) {
    console.log(v2);  // 25, 100
}
```

Note: chaining in the opposite order is not allowed because map may return 
something that isn't an entry, i.e. a [key, value] pair.

Plain old JavaScript objects do not have methods.  ES5 has the static method
`Object.keys()` and there is a pre-strawman proposal to add `Object.values()`
and `Object.entries()`.  The problem with these methods is that they return 
arrays which consume memory.

`functify` wraps Object instances, adding `keys()`, `values()`, and `entries()`
methods along with all the other methods that `functify` provides.

```javascript
const obj = {
    x: 5,
    y: 10
}

for (const [k, v] of functify(obj)) {
    console.log(`obj['${k}'] = ${v}`);  // obj['x'] = 5, obj['y'] = 10
}
```

The combines the simple creation and access syntax of Objects with the powerful
iterators provided by Map.
    
## Implementation Details

functify wraps iterables in an object with methods to performan map, reduce, 
filter, etc.  This object is also iterable.  Here's how:

```javascript
class Functified {
    constructor(iterable) {
        this.iterable = iterable;
    }

    *[Symbol.iterator]() {
        for (let value of this.iterable) {
            yield value;
        }
    }

    // various instance and static methods
```

In order to make it easier to write methods on Functified there's also a static
method `fromGenerator(generator)` which takes a generator and returns an iterator.

```javascript
static fromGenerator(generator) {
    return funcitify({
        [Symbol.iterator]: generator
    });
}
```

This allows methods to be easily implemented.  Here's the implementation for `map`:

```javascript
map(callback) {
    var iterable = this.iterable;
    return Functified.fromGenerator(function* () {
        for (let value of iterable) {
            yield callback(value);
        }
    });
}
```

## Pausable

Sometimes you may want to take some of the values from the iterator, do something
with those values, and then resume taking values where you left of at some point
in the future.  Normally you would have to resort to creating an iterator and 
calling `next()` manually, e.g.

```javascript
const numbers = [1,2,3,4,5];
const iterator = numbers[Symbol.iterator]();

for (let i = 0; i < 2; i++) {
    console.log(iterator.next().value);
}

// do something else

while (true) {
    const result = iterator.next();
    if (result.done) {
        break;
    }
    const value = iterator.next().value;
    const square = value * value;
    console.log(square);
}
```
    
The `toPausable()` creates an iterator Below is an example of how this works.

```javascript
const numbers = [1,2,3,4,5];
const pausableNumbers = numbers.toPausable();

for (const n of pausableNumbers.take(2)) {
    console.log(n);     // 1 2
}

// do something else

for (const n of pausableNumbers.map(x => x * x).takeUntil(x => x > 16)) {
    console.log(n);     // 9 16
}
```
