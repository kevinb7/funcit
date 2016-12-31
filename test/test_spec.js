var assert = require("assert");
var functify = require("../src/functify.js");

describe("functify", () => {
    var numbers, result;

    beforeEach(() => {
        numbers = functify([1,2,3,4,5]);
        result = [];
    });

    describe("Basic operations", () => {
        it("should return an iterable", () => {
            for (let num of numbers) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2,3,4,5]);
        });

        it("should filter iterables", () => {
            for (let num of numbers.filter(n => n % 2)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,3,5]);
        });

        it("should map iterables", () => {
            for (let num of numbers.map(n => n * n)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,4,9,16,25]);
        });

        it("should chain methods", () => {
            for (let num of numbers.filter(n => n % 2).map(n => n * n)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,9,25]);
        });

        it("should group iterables using predicates", () => {
            var [odds, evens] = numbers.groupBy(x => x % 2, x => x % 2 === 0);
            var evenResult = [];
            var oddResult = [];
            for (let num of evens) {
                evenResult.push(num);
            }
            for (let num of odds) {
                oddResult.push(num);
            }
            assert.deepEqual(evenResult, [2,4]);
            assert.deepEqual(oddResult, [1,3,5]);
        });

        it("should groupByMap using a Map of predicates", () => {
            var map = new Map();
            map.set("odd", x => x % 2);
            map.set("even", x => x % 2 === 0);
            result = {};
            for (let [key = "", val = 0] of numbers.groupByMap(map)) {
                result[key] = [];
                for (let item of val) {
                    result[key].push(item);
                }
            }
            assert.deepEqual(result, {
                "odd": [1,3,5],
                "even": [2,4]
            });
        });

        it("should zip iterables", () => {
            var pairs = numbers.groupBy(x => x % 2, x => x % 2 === 0).zip();
            for (let pair of pairs) {
                result.push(pair);
            }
            assert.deepEqual(result, [[1,2],[3,4]]);
        });

        it("should produce a string representation", () => {
            assert.equal(numbers.toString(), "[1, 2, 3, 4, 5]");
        });

        it("should reduce to produce a sum", () => {
            var sum = numbers.reduce((accum, value) => accum + value, 0);
            assert.equal(sum, 15);
        });

        it("should reduce to produce a sum without an initialValue", () => {
            var sum = numbers.reduce((accum, value) => accum + value);
            assert.equal(sum, 15);
        });

        it("should implement some()", () => {
            result = numbers.some(num => num > 3);
            assert.equal(result, true);
            result = numbers.some(num => num < 0);
            assert.equal(result, false);
        });

        it("should implement every()", () => {
            result = numbers.every(num => num > 0);
            assert.equal(result, true);
            result = numbers.every(num => num > 1);
            assert.equal(result, false);
        });

        it("should implement find()", () => {
            assert.equal(numbers.find(num => num === 6), undefined);
            assert.equal(numbers.find(num => num === 3), 3);
        });

        it("should implement findIndex()", () => {
            assert.equal(numbers.findIndex(num => num === 6), -1);
            assert.equal(numbers.findIndex(num => num === 3), 2);
        });

        it("should take the first 2", () => {
            for (let num of numbers.take(2)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2]);
        });

        it("should take all if n > length", () => {
            for (let num of numbers.take(10)) {
                result.push(num);
            }
            assert.equal(result.length, 5);
            assert.deepEqual(result, [1,2,3,4,5]);
        });

        it("should skip the first 2", () => {
            for (let num of numbers.skip(2)) {
                result.push(num);
            }
            assert.deepEqual(result, [3,4,5]);
        });

        it("should skip all if n >= length", () => {
            for (let num of numbers.skip(10)) {
                result.push(num);
            }
            assert.deepEqual(result, []);
        });

        it("should skipWhile predicate is true", () => {
            for (let num of numbers.skipWhile(x => x < 3)) {
                result.push(num);
            }
            assert.deepEqual(result, [3,4,5]);
        });

        it("should skip all if skipWhile predice is always true", () => {
            for (let num of numbers.skipWhile(x => true)) {
                result.push(num);
            }
            assert.deepEqual(result, []);
        });

        it("should flatten nested arrays", () => {
            var nested = functify([1, [2, 3], [], [[4], 5], [[]]]);
            for (let num of nested.flatten()) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2,3,4,5]);
        });

        it("should remove duplicates", () => {
            numbers = functify([1, 1, 2, 3, 5]);
            for (let num of numbers.distinct()) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2,3,5]);
        });

        it("should repeat", () => {
            for (let num of numbers.repeat(2)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2,3,4,5,1,2,3,4,5]);
        });

        it("should stop an infinite loop with take", () => {
            for (let num of numbers.repeat(Infinity).take(8)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2,3,4,5,1,2,3]);
        });

        it("should return an array", () => {
            result = numbers.toArray();
            assert.deepEqual(result, [1, 2, 3, 4, 5]);
        });

        it("should always take the first n if not pausable", () => {
            for (let num of numbers.take(3)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2,3]);
            result = [];

            for (let num of numbers.take(3)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2,3]);
        });

        it("should take until a predicate is true", () => {
            for (let num of numbers.takeUntil(x => x > 2)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2]);
        });

        it("should return an object", () => {
            const obj = { x: 5, y: 10 };
            const result = functify(obj).entries().toObject();

            assert.deepEqual(result, { x: 5, y: 10 });
        });
    });

    describe("enumerate", () => {
        it("should iterate over [index, value] entries", function () {
            let results = {};
            let fruit = ["apple", "banana", "grapes"];
            for (let [k, v] of functify(fruit).enumerate()) {
                results[k] = v;
            }
            assert.equal(results[0], "apple");
            assert.equal(results[1], "banana");
            assert.equal(results[2], "grapes");
        });

        it("should start at the given index", function () {
            let results = {};
            let fruit = ["apple", "banana", "grapes"];
            for (let [k, v] of functify(fruit).enumerate(1)) {
                results[k] = v;
            }
            assert.equal(results[1], "apple");
            assert.equal(results[2], "banana");
            assert.equal(results[3], "grapes");
        });
    });

    describe("range", () => {
        it("should generate a range of numbers", () => {
            for (let num of functify.range(0,5)) {
                result.push(num);
            }
            assert.deepEqual(result, [0,1,2,3,4]);
        });

        it("should generate a range of numbers with a negative step", () => {
            for (let num of functify.range(5,0,-1)) {
                result.push(num);
            }
            assert.deepEqual(result, [5,4,3,2,1]);
        });

        it("should generate numbers to Infinity", () => {
            for (let num of functify.range(0, Infinity).take(20)) {
                result.push(num);
            }
            assert.equal(result[19], 19);
        });

        it("should generate numbers to -Infinity", () => {
            for (let num of functify.range(0, -Infinity, -1).take(20)) {
                result.push(num);
            }
            assert.equal(result[19], -19);
        });
    });

    describe("Pausables", () => {
        it("should create a pausable iteratble that works with take", () => {
            var pausableNumbers = numbers.toPausable();

            for (let num of pausableNumbers.take(1)) {
                result.push(num);
            }
            assert.deepEqual(result, [1]);
            result = [];

            for (let num of pausableNumbers.take(2)) {
                result.push(num);
            }
            assert.deepEqual(result, [2,3]);
        });

        it("should create a pausable iteratble when chaining", () => {
            var pausableSquares = numbers.map(x => x * x).toPausable();

            for (let num of pausableSquares.take(1)) {
                result.push(num);
            }
            assert.deepEqual(result, [1]);
            result = [];

            for (let num of pausableSquares.take(2)) {
                result.push(num);
            }
            assert.deepEqual(result, [4,9]);
        });

        it("should allow chaining after the first take", () => {
            var pausableNumbers = numbers.toPausable();

            for (let num of pausableNumbers.take(1)) {
                result.push(num);
            }
            assert.deepEqual(result, [1]);
            result = [];

            for (let num of pausableNumbers.map(x => x * x).take(2)) {
                result.push(num);
            }
            assert.deepEqual(result, [4,9]);
        });

        it("should always take until from the start if not pausable", () => {
            for (let num of numbers.takeUntil(x => x > 2)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2]);

            result = [];
            for (let num of numbers.takeUntil(x => x > 4)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2,3,4]);
        });

        it("should take until from the last position if pausable", () => {
            var pausableNumbers = numbers.toPausable();

            for (let num of pausableNumbers.takeUntil(x => x > 2)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2]);

            result = [];
            for (let num of pausableNumbers.takeUntil(x => x > 4)) {
                result.push(num);
            }
            assert.deepEqual(result, [3,4]);
        });

        it("should filter a pausable iterable", () => {
            var pausableOdds = numbers.toPausable().filter(x => x % 2);

            for (let num of pausableOdds.take(2)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,3]);

            result = [];
            for (let num of pausableOdds.take(2)) {
                result.push(num);
            }
            assert.deepEqual(result, [5]);
        });

        it("should allow take and takeUntil on the same pausable", () => {
            var pausableNumbers = numbers.toPausable();

            for (let num of pausableNumbers.takeUntil(x => x > 2)) {
                result.push(num);
            }
            assert.deepEqual(result, [1,2]);

            result = [];
            for (let num of pausableNumbers.take(2)) {
                result.push(num);
            }
            assert.deepEqual(result, [3,4]);
        });
    });

    describe("Sets", () => {
        it("should work with sets", function () {
            var colors = new Set();

            colors.add("red");
            colors.add("green");
            colors.add("blue");

            for (let color of functify(colors)) {
                result.push(color);
            }

            assert(result.indexOf("red") !== -1);
            assert(result.indexOf("green") !== -1);
            assert(result.indexOf("blue") !== -1);

            assert.equal(result.length, 3);
        });
    });

    describe("Objects", () => {
        it("should return an iterable of entries for Objects", () => {
            let obj = { x: 5, y: 10 };
            let result = {};
            for (let [k, v] of functify(obj)) {
                result[k] = v;
            }
            assert.equal(result.x, 5);
            assert.equal(result.y, 10);
        });

        it("should have .keys()", () => {
            let obj = { x: 5, y: 10 };
            let result = [];
            for (let key of functify(obj).keys()) {
                result.push(key);
            }
            assert.deepEqual(result, ['x', 'y']);
        });

        it("should have .values()", () => {
            let obj = { x: 5, y: 10 };
            let result = [];
            for (let value of functify(obj).values()) {
                result.push(value);
            }
            assert.deepEqual(result, [5, 10]);
        });

        it("should have .entries()", () => {
            let obj = { x: 5, y: 10 };
            let result = {};
            for (let [k, v] of functify(obj).entries()) {
                result[k] = v;
            }
            assert.equal(result.x, 5);
            assert.equal(result.y, 10);
        });
    });

    describe("Maps", () => {
        it("should return an iterable of entries for Maps", () => {
            let map = new Map();
            map.set('x', 5);
            map.set('y', 10);
            let result = {};
            for (let [k, v] of functify(map)) {
                result[k] = v;
            }
            assert.equal(result.x, 5);
            assert.equal(result.y, 10);
        });

        it("should have .keys()", () => {
            let map = new Map();
            map.set('x', 5);
            map.set('y', 10);
            let result = [];
            for (let key of functify(map).keys()) {
                result.push(key);
            }
            assert.deepEqual(result, ['x', 'y']);
        });

        it("should have .values()", () => {
            let map = new Map();
            map.set('x', 5);
            map.set('y', 10);
            let result = [];
            for (let value of map.values()) {
                result.push(value);
            }
            assert.deepEqual(result, [5, 10]);
        });

        it("should have .entries()", () => {
            let map = new Map();
            map.set('x', 5);
            map.set('y', 10);
            let result = {};
            for (let [k, v] of functify(map).entries()) {
                result[k] = v;
            }
            assert.equal(result.x, 5);
            assert.equal(result.y, 10);
        });

        it("should return chainable iterators", () => {
            let map = new Map();
            map.set('x', 5);
            map.set('y', 10);
            let result = [];
            for (let v of functify(map).entries().map(pair => pair[1] * pair[1])) {
                result.push(v);
            }
            assert.deepEqual(result, [25, 100]);
        });
    });

    describe("static methods", () => {
        it("zip should work with an array", () => {
            let result = [];
            for (let [x, y] of functify.zip([[1,2],[5,10]])) {
                result.push([x, y]);
            }
            assert.deepEqual(result, [[1, 5], [2, 10]]);
        });

        it("zip should work with multiple arguments", () => {
            let result = [];
            for (let [x, y] of functify.zip([1,2],[5,10])) {
                result.push([x, y]);
            }
            assert.deepEqual(result, [[1, 5], [2, 10]]);
        });
    });
});
