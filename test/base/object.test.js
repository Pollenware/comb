"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index");

it.describe("comb/base/object.js", function (it) {

    it.should("determine if someting is an objecct", function () {
        assert.isTrue(comb.isObject(new Date()));
        assert.isTrue(comb.isObject(new String()));
        assert.isTrue(comb.isObject(new Number()));
        assert.isTrue(comb.isObject(new Boolean()));
        assert.isTrue(comb.isObject({}));
        assert.isFalse(comb.isObject());
        assert.isFalse(comb.isObject(""));
        assert.isFalse(comb.isObject(1));
        assert.isFalse(comb.isObject(false));
        assert.isFalse(comb.isObject(true));
    });

    it.should("determine if something is a hash", function () {
        assert.isTrue(comb.isHash({}));
        assert.isTrue(comb.isHash({1:2, a:"b"}));
        assert.isFalse(comb.isHash(new Date()));
        assert.isFalse(comb.isHash(new String()));
        assert.isFalse(comb.isHash(new Number()));
        assert.isFalse(comb.isHash(new Boolean()));
        assert.isFalse(comb.isHash());
        assert.isFalse(comb.isHash(""));
        assert.isFalse(comb.isHash(1));
        assert.isFalse(comb.isHash(false));
        assert.isFalse(comb.isHash(true));
    });

    it.should("determine in an object is empty", function () {
        assert.isTrue(comb.isEmpty());
        assert.isTrue(comb.isEmpty({}));
        assert.isTrue(comb.isEmpty([]));
        assert.isFalse(comb.isEmpty({A:"b"}));
        assert.isFalse(comb.isEmpty([
            {A:"b"}
        ]));
    });

    it.describe("#merge", function (it) {


        it.should("merge all properties", function () {
            //This is true because they inherit from eachother!
            var ret = {};
            comb.merge(ret, {test:true}, {test2:false}, {test3:"hello", test4:"world"});
            assert.isTrue(ret.test);
            assert.isFalse(ret.test2);
            assert.equal(ret.test3, "hello");
            assert.equal(ret.test4, "world");
        });

        it.should("merge objects if a start object is not provided", function () {
            //This is true because they inherit from eachother!
            var ret = comb.merge(null, {test:true}, {test2:false}, {test3:"hello", test4:"world"});
            assert.isTrue(ret.test);
            assert.isFalse(ret.test2);
            assert.equal(ret.test3, "hello");
            assert.equal(ret.test4, "world");
        });
    });

    it.describe("#deepMerge", function (it) {
        it.should("merge all nested objects", function () {
            var ret = comb.deepMerge(null, {test:true, a:{b:4}},
                {test2:false, a:{c:3}},
                {test3:"hello", test4:"world", a:{d:{e:2}}},
                {a:{d:{f:{g:1}}}});
            assert.isTrue(ret.test);
            assert.isFalse(ret.test2);
            assert.equal(ret.test3, "hello");
            assert.equal(ret.test4, "world");
            assert.deepEqual(ret.a, {b:4, c:3, d:{e:2, f:{g:1}}});
        });
    });

    it.describe("#extend", function (it) {
        it.should("extend a class properly", function () {
            var myObj = function () {
            };
            myObj.prototype.test = true;
            comb.extend(myObj, {test2:false, test3:"hello", test4:"world"});
            var m = new myObj();
            assert.isTrue(m.test);
            assert.isFalse(m.test2);
            assert.equal(m.test3, "hello");
            assert.equal(m.test4, "world");
        });

        it.should("extend a objects properly", function () {
            var m = {};
            m.test = true;
            comb.extend(m, {test2:false, test3:"hello", test4:"world"});
            assert.isTrue(m.test);
            assert.isFalse(m.test2);
            assert.equal(m.test3, "hello");
            assert.equal(m.test4, "world");
        })
    });

    it.should("determine if objects are deepEqual properly", function () {
        assert.isTrue(comb.deepEqual({a:"a"}, {a:"a"}));
        assert.isFalse(comb.deepEqual({a:"b"}, {a:"a"}));
        assert.isFalse(comb.deepEqual("a", new String("a")));
        assert.isTrue(comb.deepEqual(/a|b/ig, /a|b/ig));
        assert.isFalse(comb.deepEqual(/a|b/ig, /a|b/g));
        assert.isTrue(comb.deepEqual(new Date(2000, 2, 2, 2, 2, 2), new Date(2000, 2, 2, 2, 2, 2)));
        assert.isFalse(comb.deepEqual(new Date(2000, 2, 2, 2, 2, 2), new Date(2000, 2, 2, 2, 2, 1)));
        assert.isTrue(comb.deepEqual([
            {a:"a"}
        ], [
            {a:"a"}
        ]));
        assert.isTrue(comb.deepEqual(new Buffer("abc"), new Buffer("abc")))
        assert.isFalse(comb.deepEqual([
            {a:"b"}
        ], [
            {a:"a"}
        ]));
        (function () {
            var argsA = arguments;
            (function () {
                assert.isTrue(comb.deepEqual(argsA, arguments));
                assert.isFalse(comb.deepEqual(argsA, 'a'));
            })(["a"])
        })(["a"])

    });
}).as(module);


