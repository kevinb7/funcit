(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.functify = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Functified = (function () {
    function Functified(iterable) {
        _classCallCheck(this, Functified);

        // avoid re-wrapping iterables that have already been Functified
        if (iterable.isFunctified) {
            return iterable;
        }
        this.iterable = iterable;
        this.isFunctified = true;
    }

    _createClass(Functified, [{
        key: Symbol.iterator,
        value: regeneratorRuntime.mark(function value() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, value;

            return regeneratorRuntime.wrap(function value$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        context$2$0.prev = 3;
                        _iterator = this.iterable[Symbol.iterator]();

                    case 5:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            context$2$0.next = 12;
                            break;
                        }

                        value = _step.value;
                        context$2$0.next = 9;
                        return value;

                    case 9:
                        _iteratorNormalCompletion = true;
                        context$2$0.next = 5;
                        break;

                    case 12:
                        context$2$0.next = 18;
                        break;

                    case 14:
                        context$2$0.prev = 14;
                        context$2$0.t0 = context$2$0["catch"](3);
                        _didIteratorError = true;
                        _iteratorError = context$2$0.t0;

                    case 18:
                        context$2$0.prev = 18;
                        context$2$0.prev = 19;

                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
                        }

                    case 21:
                        context$2$0.prev = 21;

                        if (!_didIteratorError) {
                            context$2$0.next = 24;
                            break;
                        }

                        throw _iteratorError;

                    case 24:
                        return context$2$0.finish(21);

                    case 25:
                        return context$2$0.finish(18);

                    case 26:
                    case "end":
                        return context$2$0.stop();
                }
            }, value, this, [[3, 14, 18, 26], [19,, 21, 25]]);
        })

        // fn(iterable) -> generator function
    }, {
        key: "custom",
        value: function custom(fn) {
            return Functified.fromGenerator(fn(this.iterable));
        }

        // alias dedupe, unique
    }, {
        key: "distinct",
        value: function distinct() {
            var iterable = this.iterable;
            var memory = new Set();
            return Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, value;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            context$3$0.prev = 3;
                            _iterator2 = iterable[Symbol.iterator]();

                        case 5:
                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                context$3$0.next = 14;
                                break;
                            }

                            value = _step2.value;

                            if (memory.has(value)) {
                                context$3$0.next = 11;
                                break;
                            }

                            memory.add(value);
                            context$3$0.next = 11;
                            return value;

                        case 11:
                            _iteratorNormalCompletion2 = true;
                            context$3$0.next = 5;
                            break;

                        case 14:
                            context$3$0.next = 20;
                            break;

                        case 16:
                            context$3$0.prev = 16;
                            context$3$0.t0 = context$3$0["catch"](3);
                            _didIteratorError2 = true;
                            _iteratorError2 = context$3$0.t0;

                        case 20:
                            context$3$0.prev = 20;
                            context$3$0.prev = 21;

                            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                _iterator2["return"]();
                            }

                        case 23:
                            context$3$0.prev = 23;

                            if (!_didIteratorError2) {
                                context$3$0.next = 26;
                                break;
                            }

                            throw _iteratorError2;

                        case 26:
                            return context$3$0.finish(23);

                        case 27:
                            return context$3$0.finish(20);

                        case 28:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[3, 16, 20, 28], [21,, 23, 27]]);
            }));
        }
    }, {
        key: "filter",
        value: function filter(callback) {
            var iterable = this.iterable;
            return Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, value;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            _iteratorNormalCompletion3 = true;
                            _didIteratorError3 = false;
                            _iteratorError3 = undefined;
                            context$3$0.prev = 3;
                            _iterator3 = iterable[Symbol.iterator]();

                        case 5:
                            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                context$3$0.next = 13;
                                break;
                            }

                            value = _step3.value;

                            if (!callback(value)) {
                                context$3$0.next = 10;
                                break;
                            }

                            context$3$0.next = 10;
                            return value;

                        case 10:
                            _iteratorNormalCompletion3 = true;
                            context$3$0.next = 5;
                            break;

                        case 13:
                            context$3$0.next = 19;
                            break;

                        case 15:
                            context$3$0.prev = 15;
                            context$3$0.t0 = context$3$0["catch"](3);
                            _didIteratorError3 = true;
                            _iteratorError3 = context$3$0.t0;

                        case 19:
                            context$3$0.prev = 19;
                            context$3$0.prev = 20;

                            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                                _iterator3["return"]();
                            }

                        case 22:
                            context$3$0.prev = 22;

                            if (!_didIteratorError3) {
                                context$3$0.next = 25;
                                break;
                            }

                            throw _iteratorError3;

                        case 25:
                            return context$3$0.finish(22);

                        case 26:
                            return context$3$0.finish(19);

                        case 27:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[3, 15, 19, 27], [20,, 22, 26]]);
            }));
        }
    }, {
        key: "flatten",
        value: function flatten() {
            var iterable = this.iterable;
            return Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, value;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            _iteratorNormalCompletion4 = true;
                            _didIteratorError4 = false;
                            _iteratorError4 = undefined;
                            context$3$0.prev = 3;
                            _iterator4 = iterable[Symbol.iterator]();

                        case 5:
                            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                                context$3$0.next = 16;
                                break;
                            }

                            value = _step4.value;

                            if (!value[Symbol.iterator]) {
                                context$3$0.next = 11;
                                break;
                            }

                            return context$3$0.delegateYield(functify(value).flatten(), "t0", 9);

                        case 9:
                            context$3$0.next = 13;
                            break;

                        case 11:
                            context$3$0.next = 13;
                            return value;

                        case 13:
                            _iteratorNormalCompletion4 = true;
                            context$3$0.next = 5;
                            break;

                        case 16:
                            context$3$0.next = 22;
                            break;

                        case 18:
                            context$3$0.prev = 18;
                            context$3$0.t1 = context$3$0["catch"](3);
                            _didIteratorError4 = true;
                            _iteratorError4 = context$3$0.t1;

                        case 22:
                            context$3$0.prev = 22;
                            context$3$0.prev = 23;

                            if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                                _iterator4["return"]();
                            }

                        case 25:
                            context$3$0.prev = 25;

                            if (!_didIteratorError4) {
                                context$3$0.next = 28;
                                break;
                            }

                            throw _iteratorError4;

                        case 28:
                            return context$3$0.finish(25);

                        case 29:
                            return context$3$0.finish(22);

                        case 30:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[3, 18, 22, 30], [23,, 25, 29]]);
            }));
        }
    }, {
        key: "groupBy",
        value: function groupBy() {
            var _this = this;

            for (var _len = arguments.length, predicates = Array(_len), _key = 0; _key < _len; _key++) {
                predicates[_key] = arguments[_key];
            }

            return functify(predicates.map(function (fn) {
                return _this.filter(fn);
            }));
        }
    }, {
        key: "groupByMap",
        value: function groupByMap(map) {
            var _this2 = this;

            return functify(map).map(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2);

                var name = _ref2[0];
                var fn = _ref2[1];
                return [name, _this2.filter(fn)];
            });
        }
    }, {
        key: "repeat",
        value: function repeat() {
            var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

            var iterable = this.iterable;
            return Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var i, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, value;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            i = 0;

                        case 1:
                            if (!(i++ < n)) {
                                context$3$0.next = 30;
                                break;
                            }

                            _iteratorNormalCompletion5 = true;
                            _didIteratorError5 = false;
                            _iteratorError5 = undefined;
                            context$3$0.prev = 5;
                            _iterator5 = iterable[Symbol.iterator]();

                        case 7:
                            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                                context$3$0.next = 14;
                                break;
                            }

                            value = _step5.value;
                            context$3$0.next = 11;
                            return value;

                        case 11:
                            _iteratorNormalCompletion5 = true;
                            context$3$0.next = 7;
                            break;

                        case 14:
                            context$3$0.next = 20;
                            break;

                        case 16:
                            context$3$0.prev = 16;
                            context$3$0.t0 = context$3$0["catch"](5);
                            _didIteratorError5 = true;
                            _iteratorError5 = context$3$0.t0;

                        case 20:
                            context$3$0.prev = 20;
                            context$3$0.prev = 21;

                            if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
                                _iterator5["return"]();
                            }

                        case 23:
                            context$3$0.prev = 23;

                            if (!_didIteratorError5) {
                                context$3$0.next = 26;
                                break;
                            }

                            throw _iteratorError5;

                        case 26:
                            return context$3$0.finish(23);

                        case 27:
                            return context$3$0.finish(20);

                        case 28:
                            context$3$0.next = 1;
                            break;

                        case 30:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[5, 16, 20, 28], [21,, 23, 27]]);
            }));
        }

        // alias for repeat
    }, {
        key: "loop",
        value: function loop() {
            var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

            console.warn("deprecating loop(n), use repeat(n) instead");
            return this.repeat(n);
        }
    }, {
        key: "map",
        value: function map(callback) {
            var iterable = this.iterable;
            return Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, value;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            _iteratorNormalCompletion6 = true;
                            _didIteratorError6 = false;
                            _iteratorError6 = undefined;
                            context$3$0.prev = 3;
                            _iterator6 = iterable[Symbol.iterator]();

                        case 5:
                            if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                                context$3$0.next = 12;
                                break;
                            }

                            value = _step6.value;
                            context$3$0.next = 9;
                            return callback(value);

                        case 9:
                            _iteratorNormalCompletion6 = true;
                            context$3$0.next = 5;
                            break;

                        case 12:
                            context$3$0.next = 18;
                            break;

                        case 14:
                            context$3$0.prev = 14;
                            context$3$0.t0 = context$3$0["catch"](3);
                            _didIteratorError6 = true;
                            _iteratorError6 = context$3$0.t0;

                        case 18:
                            context$3$0.prev = 18;
                            context$3$0.prev = 19;

                            if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
                                _iterator6["return"]();
                            }

                        case 21:
                            context$3$0.prev = 21;

                            if (!_didIteratorError6) {
                                context$3$0.next = 24;
                                break;
                            }

                            throw _iteratorError6;

                        case 24:
                            return context$3$0.finish(21);

                        case 25:
                            return context$3$0.finish(18);

                        case 26:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[3, 14, 18, 26], [19,, 21, 25]]);
            }));
        }
    }, {
        key: "skip",
        value: function skip(n) {
            var iterable = this.iterable;
            return Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var i, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, value;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            i = 0;
                            _iteratorNormalCompletion7 = true;
                            _didIteratorError7 = false;
                            _iteratorError7 = undefined;
                            context$3$0.prev = 4;
                            _iterator7 = iterable[Symbol.iterator]();

                        case 6:
                            if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                                context$3$0.next = 17;
                                break;
                            }

                            value = _step7.value;

                            if (!(i < n)) {
                                context$3$0.next = 12;
                                break;
                            }

                            i++;
                            context$3$0.next = 14;
                            break;

                        case 12:
                            context$3$0.next = 14;
                            return value;

                        case 14:
                            _iteratorNormalCompletion7 = true;
                            context$3$0.next = 6;
                            break;

                        case 17:
                            context$3$0.next = 23;
                            break;

                        case 19:
                            context$3$0.prev = 19;
                            context$3$0.t0 = context$3$0["catch"](4);
                            _didIteratorError7 = true;
                            _iteratorError7 = context$3$0.t0;

                        case 23:
                            context$3$0.prev = 23;
                            context$3$0.prev = 24;

                            if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
                                _iterator7["return"]();
                            }

                        case 26:
                            context$3$0.prev = 26;

                            if (!_didIteratorError7) {
                                context$3$0.next = 29;
                                break;
                            }

                            throw _iteratorError7;

                        case 29:
                            return context$3$0.finish(26);

                        case 30:
                            return context$3$0.finish(23);

                        case 31:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[4, 19, 23, 31], [24,, 26, 30]]);
            }));
        }
    }, {
        key: "skipWhile",
        value: function skipWhile(predicate) {
            var iterable = this.iterable;
            return Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var skip, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, value;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            skip = true;
                            _iteratorNormalCompletion8 = true;
                            _didIteratorError8 = false;
                            _iteratorError8 = undefined;
                            context$3$0.prev = 4;
                            _iterator8 = iterable[Symbol.iterator]();

                        case 6:
                            if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                                context$3$0.next = 15;
                                break;
                            }

                            value = _step8.value;

                            if (!predicate(value)) {
                                skip = false;
                            }

                            if (skip) {
                                context$3$0.next = 12;
                                break;
                            }

                            context$3$0.next = 12;
                            return value;

                        case 12:
                            _iteratorNormalCompletion8 = true;
                            context$3$0.next = 6;
                            break;

                        case 15:
                            context$3$0.next = 21;
                            break;

                        case 17:
                            context$3$0.prev = 17;
                            context$3$0.t0 = context$3$0["catch"](4);
                            _didIteratorError8 = true;
                            _iteratorError8 = context$3$0.t0;

                        case 21:
                            context$3$0.prev = 21;
                            context$3$0.prev = 22;

                            if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
                                _iterator8["return"]();
                            }

                        case 24:
                            context$3$0.prev = 24;

                            if (!_didIteratorError8) {
                                context$3$0.next = 27;
                                break;
                            }

                            throw _iteratorError8;

                        case 27:
                            return context$3$0.finish(24);

                        case 28:
                            return context$3$0.finish(21);

                        case 29:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[4, 17, 21, 29], [22,, 24, 28]]);
            }));
        }
    }, {
        key: "take",
        value: function take(n) {
            // using an explicit iterator supports pausable iteratables
            var iterator = this.iterable[Symbol.iterator]();
            var self = this;
            return Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var i, result;
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            i = 0;

                            if (!(self.hasOwnProperty("startValue") && self.isPausable)) {
                                context$3$0.next = 5;
                                break;
                            }

                            context$3$0.next = 4;
                            return self.startValue;

                        case 4:
                            i++;

                        case 5:
                            if (!(i < n)) {
                                context$3$0.next = 16;
                                break;
                            }

                            result = iterator.next();

                            if (!result.done) {
                                context$3$0.next = 11;
                                break;
                            }

                            return context$3$0.abrupt("break", 16);

                        case 11:
                            context$3$0.next = 13;
                            return result.value;

                        case 13:
                            i++;

                        case 14:
                            context$3$0.next = 5;
                            break;

                        case 16:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this);
            }));
        }
    }, {
        key: "takeUntil",
        value: function takeUntil(predicate) {
            var iterator = this.iterable[Symbol.iterator]();
            var self = this;
            return Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var result;
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            if (!(self.hasOwnProperty("startValue") && self.isPausable)) {
                                context$3$0.next = 3;
                                break;
                            }

                            context$3$0.next = 3;
                            return self.startValue;

                        case 3:
                            if (!true) {
                                context$3$0.next = 18;
                                break;
                            }

                            result = iterator.next();

                            if (!result.done) {
                                context$3$0.next = 9;
                                break;
                            }

                            return context$3$0.abrupt("break", 18);

                        case 9:
                            if (!predicate(result.value)) {
                                context$3$0.next = 14;
                                break;
                            }

                            // save the value so we can yield if takeUntil is called again
                            self.startValue = result.value;
                            return context$3$0.abrupt("break", 18);

                        case 14:
                            context$3$0.next = 16;
                            return result.value;

                        case 16:
                            context$3$0.next = 3;
                            break;

                        case 18:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this);
            }));
        }
    }, {
        key: "enumerate",
        value: function enumerate() {
            var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            var iterable = this.iterable;
            return Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var i, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, value;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            i = start;
                            _iteratorNormalCompletion9 = true;
                            _didIteratorError9 = false;
                            _iteratorError9 = undefined;
                            context$3$0.prev = 4;
                            _iterator9 = iterable[Symbol.iterator]();

                        case 6:
                            if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
                                context$3$0.next = 13;
                                break;
                            }

                            value = _step9.value;
                            context$3$0.next = 10;
                            return [i++, value];

                        case 10:
                            _iteratorNormalCompletion9 = true;
                            context$3$0.next = 6;
                            break;

                        case 13:
                            context$3$0.next = 19;
                            break;

                        case 15:
                            context$3$0.prev = 15;
                            context$3$0.t0 = context$3$0["catch"](4);
                            _didIteratorError9 = true;
                            _iteratorError9 = context$3$0.t0;

                        case 19:
                            context$3$0.prev = 19;
                            context$3$0.prev = 20;

                            if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
                                _iterator9["return"]();
                            }

                        case 22:
                            context$3$0.prev = 22;

                            if (!_didIteratorError9) {
                                context$3$0.next = 25;
                                break;
                            }

                            throw _iteratorError9;

                        case 25:
                            return context$3$0.finish(22);

                        case 26:
                            return context$3$0.finish(19);

                        case 27:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[4, 15, 19, 27], [20,, 22, 26]]);
            }));
        }
    }, {
        key: "zip",
        value: function zip() {
            return Functified.zip(this.iterable);
        }

        // reducing functions
    }, {
        key: "every",
        value: function every(callback) {
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = this.iterable[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var value = _step10.value;

                    if (!callback(value)) {
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
                        _iterator10["return"]();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }

            return true;
        }
    }, {
        key: "reduce",
        value: function reduce(callback, initialValue) {
            var accum = initialValue;
            var iterator = this.iterable[Symbol.iterator]();

            if (accum === undefined) {
                var result = iterator.next();
                if (result.done) {
                    throw "not enough values to reduce";
                } else {
                    accum = result.value;
                }
            }

            while (true) {
                var result = iterator.next();
                if (result.done) {
                    break;
                } else {
                    accum = callback(accum, result.value);
                }
            }

            return accum;
        }
    }, {
        key: "some",
        value: function some(callback) {
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                for (var _iterator11 = this.iterable[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var value = _step11.value;

                    if (callback(value)) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
                        _iterator11["return"]();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }

            return false;
        }
    }, {
        key: "find",
        value: function find(callback) {
            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
                for (var _iterator12 = this.enumerate()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                    var _step12$value = _slicedToArray(_step12.value, 2);

                    var i = _step12$value[0];
                    var value = _step12$value[1];

                    if (callback(value, i)) {
                        return value;
                    }
                }
            } catch (err) {
                _didIteratorError12 = true;
                _iteratorError12 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
                        _iterator12["return"]();
                    }
                } finally {
                    if (_didIteratorError12) {
                        throw _iteratorError12;
                    }
                }
            }

            return undefined;
        }
    }, {
        key: "findIndex",
        value: function findIndex(callback) {
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = this.enumerate()[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var _step13$value = _slicedToArray(_step13.value, 2);

                    var i = _step13$value[0];
                    var value = _step13$value[1];

                    if (callback(value, i)) {
                        return i;
                    }
                }
            } catch (err) {
                _didIteratorError13 = true;
                _iteratorError13 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion13 && _iterator13["return"]) {
                        _iterator13["return"]();
                    }
                } finally {
                    if (_didIteratorError13) {
                        throw _iteratorError13;
                    }
                }
            }

            return -1;
        }
    }, {
        key: "entries",
        value: function entries() {
            if (this.iterable.entries) {
                return new Functified(this.iterable.entries());
            } else {
                throw "doesn't have entries";
            }
        }
    }, {
        key: "keys",
        value: function keys() {
            if (this.iterable.keys) {
                return new Functified(this.iterable.keys());
            } else {
                throw "doesn't have keys";
            }
        }
    }, {
        key: "values",
        value: function values() {
            if (this.iterable.values) {
                return new Functified(this.iterable.values());
            } else {
                throw "doesn't have values";
            }
        }
    }, {
        key: "toArray",
        value: function toArray() {
            var result = [];
            var _iteratorNormalCompletion14 = true;
            var _didIteratorError14 = false;
            var _iteratorError14 = undefined;

            try {
                for (var _iterator14 = this.iterable[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                    var value = _step14.value;

                    result.push(value);
                }
            } catch (err) {
                _didIteratorError14 = true;
                _iteratorError14 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion14 && _iterator14["return"]) {
                        _iterator14["return"]();
                    }
                } finally {
                    if (_didIteratorError14) {
                        throw _iteratorError14;
                    }
                }
            }

            return result;
        }
    }, {
        key: "toObject",
        value: function toObject() {
            var result = {};
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = this.iterable[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var value = _step15.value;

                    if (Array.isArray(value)) {
                        result[value[0]] = value[1];
                    }
                }
            } catch (err) {
                _didIteratorError15 = true;
                _iteratorError15 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion15 && _iterator15["return"]) {
                        _iterator15["return"]();
                    }
                } finally {
                    if (_didIteratorError15) {
                        throw _iteratorError15;
                    }
                }
            }

            return result;
        }
    }, {
        key: "toPausable",
        value: function toPausable() {
            var iterator = this.iterable[Symbol.iterator]();
            var functified = Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var result;
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            if (!true) {
                                context$3$0.next = 10;
                                break;
                            }

                            result = iterator.next();

                            if (!result.done) {
                                context$3$0.next = 6;
                                break;
                            }

                            return context$3$0.abrupt("break", 10);

                        case 6:
                            context$3$0.next = 8;
                            return result.value;

                        case 8:
                            context$3$0.next = 0;
                            break;

                        case 10:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this);
            }));
            functified.isPausable = true;
            return functified;
        }
    }, {
        key: "toString",
        value: function toString() {
            var i = 0;
            var result = "[";
            result += this.reduce(function (str, n) {
                return str + (i++ > 0 ? ", " + n : "" + n);
            }, "");
            result += "]";
            return result;
        }

        // static methods
    }], [{
        key: "fromGenerator",
        value: function fromGenerator(generator) {
            return functify(_defineProperty({}, Symbol.iterator, generator));
        }
    }, {
        key: "fromObject",
        value: function fromObject(obj) {
            var _functify2;

            return functify((_functify2 = {}, _defineProperty(_functify2, Symbol.iterator, regeneratorRuntime.mark(function callee$2$0() {
                var key;
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            context$3$0.t0 = regeneratorRuntime.keys(obj);

                        case 1:
                            if ((context$3$0.t1 = context$3$0.t0()).done) {
                                context$3$0.next = 8;
                                break;
                            }

                            key = context$3$0.t1.value;

                            if (!obj.hasOwnProperty(key)) {
                                context$3$0.next = 6;
                                break;
                            }

                            context$3$0.next = 6;
                            return [key, obj[key]];

                        case 6:
                            context$3$0.next = 1;
                            break;

                        case 8:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this);
            })), _defineProperty(_functify2, "entries", function entries() {
                return Functified.fromGenerator(regeneratorRuntime.mark(function callee$3$0() {
                    var key;
                    return regeneratorRuntime.wrap(function callee$3$0$(context$4$0) {
                        while (1) switch (context$4$0.prev = context$4$0.next) {
                            case 0:
                                context$4$0.t0 = regeneratorRuntime.keys(obj);

                            case 1:
                                if ((context$4$0.t1 = context$4$0.t0()).done) {
                                    context$4$0.next = 8;
                                    break;
                                }

                                key = context$4$0.t1.value;

                                if (!obj.hasOwnProperty(key)) {
                                    context$4$0.next = 6;
                                    break;
                                }

                                context$4$0.next = 6;
                                return [key, obj[key]];

                            case 6:
                                context$4$0.next = 1;
                                break;

                            case 8:
                            case "end":
                                return context$4$0.stop();
                        }
                    }, callee$3$0, this);
                }));
            }), _defineProperty(_functify2, "keys", function keys() {
                return Functified.fromGenerator(regeneratorRuntime.mark(function callee$3$0() {
                    var key;
                    return regeneratorRuntime.wrap(function callee$3$0$(context$4$0) {
                        while (1) switch (context$4$0.prev = context$4$0.next) {
                            case 0:
                                context$4$0.t0 = regeneratorRuntime.keys(obj);

                            case 1:
                                if ((context$4$0.t1 = context$4$0.t0()).done) {
                                    context$4$0.next = 8;
                                    break;
                                }

                                key = context$4$0.t1.value;

                                if (!obj.hasOwnProperty(key)) {
                                    context$4$0.next = 6;
                                    break;
                                }

                                context$4$0.next = 6;
                                return key;

                            case 6:
                                context$4$0.next = 1;
                                break;

                            case 8:
                            case "end":
                                return context$4$0.stop();
                        }
                    }, callee$3$0, this);
                }));
            }), _defineProperty(_functify2, "values", function values() {
                return Functified.fromGenerator(regeneratorRuntime.mark(function callee$3$0() {
                    var key;
                    return regeneratorRuntime.wrap(function callee$3$0$(context$4$0) {
                        while (1) switch (context$4$0.prev = context$4$0.next) {
                            case 0:
                                context$4$0.t0 = regeneratorRuntime.keys(obj);

                            case 1:
                                if ((context$4$0.t1 = context$4$0.t0()).done) {
                                    context$4$0.next = 8;
                                    break;
                                }

                                key = context$4$0.t1.value;

                                if (!obj.hasOwnProperty(key)) {
                                    context$4$0.next = 6;
                                    break;
                                }

                                context$4$0.next = 6;
                                return obj[key];

                            case 6:
                                context$4$0.next = 1;
                                break;

                            case 8:
                            case "end":
                                return context$4$0.stop();
                        }
                    }, callee$3$0, this);
                }));
            }), _functify2));
        }
    }, {
        key: "range",
        value: function range(start, stop) {
            var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

            if (arguments.length === 1) {
                stop = start;
                start = 0;
            }
            return Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var i;
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            i = start;

                            if (!(step > 0)) {
                                context$3$0.next = 10;
                                break;
                            }

                        case 2:
                            if (!(i < stop)) {
                                context$3$0.next = 8;
                                break;
                            }

                            context$3$0.next = 5;
                            return i;

                        case 5:
                            i += step;
                            context$3$0.next = 2;
                            break;

                        case 8:
                            context$3$0.next = 20;
                            break;

                        case 10:
                            if (!(step < 0)) {
                                context$3$0.next = 19;
                                break;
                            }

                        case 11:
                            if (!(i > stop)) {
                                context$3$0.next = 17;
                                break;
                            }

                            context$3$0.next = 14;
                            return i;

                        case 14:
                            i += step;
                            context$3$0.next = 11;
                            break;

                        case 17:
                            context$3$0.next = 20;
                            break;

                        case 19:
                            throw "step should not equal 0";

                        case 20:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this);
            }));
        }
    }, {
        key: "zip",
        value: function zip() {
            for (var _len2 = arguments.length, iterables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                iterables[_key2] = arguments[_key2];
            }

            // assume if a single value is passed in it must contain an array
            if (iterables.length === 1) {
                iterables = iterables[0];
            }
            return Functified.fromGenerator(regeneratorRuntime.mark(function callee$2$0() {
                var iterators, vector, _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, iterator, result;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            iterators = iterables.map(function (iterable) {
                                if (iterable[Symbol.iterator]) {
                                    return iterable[Symbol.iterator]();
                                } else {
                                    throw "can't zip a non-iterable";
                                }
                            });

                        case 1:
                            if (!true) {
                                context$3$0.next = 37;
                                break;
                            }

                            vector = [];
                            _iteratorNormalCompletion16 = true;
                            _didIteratorError16 = false;
                            _iteratorError16 = undefined;
                            context$3$0.prev = 6;
                            _iterator16 = iterators[Symbol.iterator]();

                        case 8:
                            if (_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done) {
                                context$3$0.next = 19;
                                break;
                            }

                            iterator = _step16.value;
                            result = iterator.next();

                            if (!result.done) {
                                context$3$0.next = 15;
                                break;
                            }

                            return context$3$0.abrupt("return");

                        case 15:
                            vector.push(result.value);

                        case 16:
                            _iteratorNormalCompletion16 = true;
                            context$3$0.next = 8;
                            break;

                        case 19:
                            context$3$0.next = 25;
                            break;

                        case 21:
                            context$3$0.prev = 21;
                            context$3$0.t0 = context$3$0["catch"](6);
                            _didIteratorError16 = true;
                            _iteratorError16 = context$3$0.t0;

                        case 25:
                            context$3$0.prev = 25;
                            context$3$0.prev = 26;

                            if (!_iteratorNormalCompletion16 && _iterator16["return"]) {
                                _iterator16["return"]();
                            }

                        case 28:
                            context$3$0.prev = 28;

                            if (!_didIteratorError16) {
                                context$3$0.next = 31;
                                break;
                            }

                            throw _iteratorError16;

                        case 31:
                            return context$3$0.finish(28);

                        case 32:
                            return context$3$0.finish(25);

                        case 33:
                            context$3$0.next = 35;
                            return vector;

                        case 35:
                            context$3$0.next = 1;
                            break;

                        case 37:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[6, 21, 25, 33], [26,, 28, 32]]);
            }));
        }
    }]);

    return Functified;
})();

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

exports["default"] = functify;
module.exports = exports["default"];
// finished

},{}]},{},[1])(1)
});