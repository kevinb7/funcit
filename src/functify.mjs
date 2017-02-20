"use strict";

class Functified {

    constructor(iterable) {
        // avoid re-wrapping iterables that have already been Functified
        if (iterable.isFunctified) {
            return iterable;
        }
        this.iterable = iterable;
        this.isFunctified = true;
    }

    *[Symbol.iterator]() {
        for (let value of this.iterable) {
            yield value;
        }
    }

    // fn(iterable) -> generator function
    custom(fn) {
        return Functified.fromGenerator(fn(this.iterable));
    }

    // alias dedupe, unique
    distinct() {
        var iterable = this.iterable;
        var memory = new Set();
        return Functified.fromGenerator(function* () {
            for (let value of iterable) {
                if (!memory.has(value)) {
                    memory.add(value);
                    yield value;
                }
            }
        });
    }

    filter(callback) {
        var iterable = this.iterable;
        return Functified.fromGenerator(function* () {
            for (let value of iterable) {
                if (callback(value)) {
                    yield value;
                }
            }
        });
    }

    flatten() {
        var iterable = this.iterable;
        return Functified.fromGenerator(function* () {
            for (let value of iterable) {
                if (value[Symbol.iterator]) {
                    yield* functify(value).flatten();
                } else {
                    yield value;
                }
            }
        });
    }

    groupBy(...predicates) {
        return functify(predicates.map(fn => this.filter(fn)));
    }

    groupByMap(map) {
        return functify(map).map(([name, fn]) => [name, this.filter(fn)]);
    }

    repeat(n = 1) {
        var iterable = this.iterable;
        return Functified.fromGenerator(function* () {
            var i = 0;
            while (i++ < n) {
                for (let value of iterable) {
                    yield value;
                }
            }
        });
    }

    // alias for repeat
    loop(n = 1) {
        console.warn("deprecating loop(n), use repeat(n) instead");
        return this.repeat(n);
    }

    map(callback) {
        var iterable = this.iterable;
        return Functified.fromGenerator(function* () {
            for (let value of iterable) {
                yield callback(value);
            }
        });
    }

    skip(n) {
        var iterable = this.iterable;
        return Functified.fromGenerator(function* () {
            var i = 0;
            for (let value of iterable) {
                if (i < n) {
                    i++;
                } else {
                    yield value;
                }
            }
        });
    }

    skipWhile(predicate) {
        var iterable = this.iterable;
        return Functified.fromGenerator(function* () {
            var skip = true;
            for (let value of iterable) {
                if (!predicate(value)) {
                    skip = false;
                }
                if (!skip) {
                    yield value;
                }
            }
        });
    }

    take(n) {
        // using an explicit iterator supports pausable iteratables
        var iterator = this.iterable[Symbol.iterator]();
        var self = this;
        return Functified.fromGenerator(function* () {
            let i = 0;
            if (self.hasOwnProperty("startValue") && self.isPausable) {
                yield self.startValue;
                i++;
            }
            while (i < n) {
                var result = iterator.next();
                if (result.done) {
                    break;
                } else {
                    yield result.value;
                    i++;
                }
            }
        });
    }

    takeUntil(predicate) {
        var iterator = this.iterable[Symbol.iterator]();
        var self = this;
        return Functified.fromGenerator(function* () {
            if (self.hasOwnProperty("startValue") && self.isPausable) {
                yield self.startValue;
            }
            while (true) {
                var result = iterator.next();
                if (result.done) {
                    break;
                } else {
                    if (predicate(result.value)) {
                        // save the value so we can yield if takeUntil is called again
                        self.startValue = result.value;
                        break;
                    } else {
                        yield result.value;
                    }
                }
            }
        });
    }

    enumerate(start = 0) {
        var iterable = this.iterable;
        return Functified.fromGenerator(function* () {
            let i = start;
            for (let value of iterable) {
                yield [i++, value];
            }
        });
    }

    zip() {
        return Functified.zip(this.iterable);
    }

    // reducing functions
    every(callback) {
        for (let value of this.iterable) {
            if (!callback(value)) {
                return false;
            }
        }
        return true;
    }

    reduce(callback, initialValue) {
        let accum = initialValue;
        let iterator = this.iterable[Symbol.iterator]();

        if (accum === undefined) {
            let result = iterator.next();
            if (result.done) {
                throw "not enough values to reduce";
            } else {
                accum = result.value;
            }
        }

        while (true) {
            let result = iterator.next();
            if (result.done) {
                break;
            } else {
                accum = callback(accum, result.value);
            }
        }

        return accum;
    }

    some(callback) {
        for (let value of this.iterable) {
            if (callback(value)) {
                return true;
            }
        }
        return false;
    }

    entries() {
        if (this.iterable.entries) {
            return new Functified(this.iterable.entries());
        } else {
            throw "doesn't have entries";
        }
    }

    keys() {
        if (this.iterable.keys) {
            return new Functified(this.iterable.keys());
        } else {
            throw "doesn't have keys";
        }
    }

    values() {
        if (this.iterable.values) {
            return new Functified(this.iterable.values());
        } else {
            throw "doesn't have values";
        }
    }

    toArray() {
        var result = [];
        for (let value of this.iterable) {
            result.push(value);
        }
        return result;
    }

    toObject() {
        var result = {};
        for (let value of this.iterable) {
            if (Array.isArray(value)) {
                result[value[0]] = value[1];
            }
        }
        return result;
    }

    toPausable() {
        var iterator = this.iterable[Symbol.iterator]();
        var functified = Functified.fromGenerator(function* () {
            while (true) {
                var result = iterator.next();
                if (result.done) {
                    break;
                } else {
                    yield result.value;
                }
            }
        });
        functified.isPausable = true;
        return functified;
    }

    toString() {
        var i = 0;
        var result = "[";
        result += this.reduce((str, n) => str + (i++ > 0 ? `, ${n}` : `${n}`), "");
        result += "]";
        return result;
    }

    // static methods
    static fromGenerator(generator) {
        return functify({
            [Symbol.iterator]: generator
        });
    }

    static fromObject(obj) {
        return functify({
            [Symbol.iterator]: function* () {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        yield [key, obj[key]];
                    }
                }
            },
            entries() {
                return Functified.fromGenerator(function* () {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            yield [key, obj[key]];
                        }
                    }
                });
            },
            keys() {
                return Functified.fromGenerator(function* () {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            yield key;
                        }
                    }
                });
            },
            values() {
                return Functified.fromGenerator(function* () {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            yield obj[key];
                        }
                    }
                });
            }
        });
    }

    static range(start, stop, step = 1) {
        if (arguments.length === 1) {
            stop = start;
            start = 0;
        }
        return Functified.fromGenerator(function* () {
            let i = start;
            if (step > 0) {
                while (i < stop) {
                    yield i;
                    i += step;
                }
            } else if (step < 0) {
                while (i > stop) {
                    yield i;
                    i += step;
                }
            } else {
                throw "step should not equal 0"
            }
        });
    };

    static zip(...iterables) {
        // assume if a single value is passed in it must contain an array
        if (iterables.length === 1) {
            iterables = iterables[0];
        }
        return Functified.fromGenerator(function* () {
            var iterators = iterables.map(iterable => {
                if (iterable[Symbol.iterator]) {
                    return iterable[Symbol.iterator]();
                } else {
                    throw "can't zip a non-iterable";
                }
            });
            while (true) {
                let vector = [];
                for (let iterator of iterators) {
                    var result = iterator.next();
                    if (result.done) {
                        return; // finished
                    } else {
                        vector.push(result.value);
                    }
                }
                yield vector;
            }
        });
    }
}

function functify(iterable) {
    if (!iterable[Symbol.iterator]) {
        return Functified.fromObject(iterable);
    } else {
        return new Functified(iterable);
    }
}

functify.fromGenerator = Functified.fromGenerator;
functify.range = Functified.range;
functify.zip = Functified.zip;

export default functify;
