var obj = require("./object"), misc = require("./misc"), string = require("./string"), isString = string.isString, number = require("./number.js");


var argsToArray = misc.argsToArray;

var isArray = exports.isArray = function (obj) {
    return Array.isArray(obj);
};

var cross = function (num, cross) {
    var ret = cross.reduceRight(function (a, b) {
        if (!isArray(b)) b = [b];
        b.unshift(num)
        a.unshift(b);
        return a;
    }, []);
    return ret;
};

var permute = function (num, cross, length) {
    var ret = [];
    for (var i = 0; i < cross.length; i++) {
        ret.push([num].concat(array.rotate(cross, i)).slice(0, length));
    }
    return ret;
};


var intersection = function (a, b) {
    var ret = [];
    if (isArray(a) && isArray(b)) {
        if (a.length && b.length) {
            var aOne = a[0];
            if (b.indexOf(aOne) != -1) {
                ret = [aOne].concat(intersection(a.slice(1), b));
            } else {
                ret = intersection(a.slice(1), b);
            }
        }
    }

    return ret;
};

var _sort = (function () {

    var isAll = function (arr, test) {
        return arr.every(test);
    };

    var defaultCmp = function (a, b) {
        return a - b;
    };

    return function _sort(arr, property) {
        var ret = [];
        if (isArray(arr)) {
            ret = arr.slice();
            if (property) {
                if (typeof property == "function") {
                    ret.sort(property);
                } else {
                    ret.sort(function (a, b) {
                        var aProp = a[property], bProp = b[property];
                        if (isString(aProp) && isString(bProp)) {
                            return aProp > bProp ? 1 : aProp < bProp ? -1 : 0;
                        } else {
                            return aProp - bProp;
                        }
                    });
                }
            } else {
                if (isAll(ret, isString)) {
                    ret.sort();
                } else {
                    ret.sort(defaultCmp);
                }
            }
        }
        return ret;
    };

})();

var comb = exports, array;
/**
 * @namespace Utilities for Arrays
 */
comb.array = {
    /**@lends comb.array*/


    /**
     * converts anything to an array
     *
     * @example
     *  comb.array.toArray({a : "b", b : "c"}) => [["a","b"], ["b","c"]];
     *  comb.array.toArray("a") => ["a"]
     *  comb.array.toArray(["a"]) =>  ["a"];
     *  comb.array.toArray() => [];
     *  comb.array.toArray("a", {a : "b"}) => ["a", ["a", "b"]];
     */
    toArray:function (o) {
        var ret = [];
        if (o != null) {
            var args = argsToArray(arguments);
            if (args.length == 1) {
                if (isArray(o)) {
                    ret = o;
                } else if (obj.isHash(o)) {
                    for (var i in o) {
                        if (o.hasOwnProperty(i)) {
                            ret.push([i, o[i]]);
                        }
                    }
                } else {
                    ret.push(o);
                }
            } else {
                args.forEach(function (a) {
                    ret = ret.concat(array.toArray(a));
                })
            }
        }
        return ret;
    },

    /**
     * Sums all items in an array
     *
     * @example
     *
     *  comb.array.sum([1,2,3]) => 6
     *  comb.array.sum(["A","B","C"]) => "ABC";
     *  var d1 = new Date(1999), d2 = new Date(2000), d3 = new Date(3000);
     *  comb.array.sum([d1,d2,d3]) => "Wed Dec 31 1969 18:00:01 GMT-0600 (CST)"
     *                              + "Wed Dec 31 1969"  18:00:02 GMT-0600 (CST)"
     *                              + "Wed Dec 31 1969 18:00:03 GMT-0600 (CST)"
     *  comb.array.sum([{},{},{}]) => "[object Object][object Object][object Object]";
     *
     * @param {Number[]} array the array of numbers to sum
     */
    sum:function (array) {
        array = array || [];
        if (array.length) {
            return array.reduce(function (a, b) {
                return a + b;
            });
        } else {
            return 0;
        }
    },

    /**
     * Averages an array of numbers.
     * @example
     *
     * comb.array.avg([1,2,3]); //2
     *
     * @param {Number[]} array - an array of numbers
     * @return {Number} the average of all the numbers in the array.
     * @throws {Error} if the array is not all numbers.
     */
    avg:function (arr) {
        arr = arr || [];
        if (arr.length) {
            var sum = array.sum(arr);
            if (number.isNumber(sum)) {
                return  sum / arr.length;
            } else {
                throw new Error("Cannot average an array of non numbers.");
            }
        } else {
            return 0;
        }
    },

    /**
     * Allows the sorting of an array based on a property name instead. This can also
     * act as a sort that does not change the original array.
     *
     * <b>NOTE:</b> this does not change the original array!
     *
     * @example
     * comb.array.sort([{a : 1}, {a : 2}, {a : -2}], "a"); //[{a : -2}, {a : 1}, {a : 2}];
     * @param {Array} arr the array to sort
     * @param {String|Function} cmp the property to sort on. Or a function used to compare.
     * @return {Array} a copy of the original array that is sorted.
     */
    sort:function (arr, cmp) {
        return _sort(arr, cmp);
    },

    /**
     * Finds that min value of an array. If a second argument is provided and it is a function
     * it will be used as a comparator function. If the second argument is a string then it will be used
     * as a property look up on each item.
     *
     * @example
     * comb.array.min([{a : 1}, {a : 2}, {a : -2}], "a"); //{a : -2}
     * comb.array.min([{a : 1}, {a : 2}, {a : -2}], function(a,b){
     *      return a.a - b.a
     * }); //{a : -2}
     *
     * @param {Array} arr the array to find the min value on
     * @param {String|Function} cmp the property to sort on. Or a function used to compare.
     * @return {*}
     */
    min:function (arr, cmp) {
        return _sort(arr, cmp)[0];
    },

    /**
     * Finds that max value of an array. If a second argument is provided and it is a function
     * it will be used as a comparator function. If the second argument is a string then it will be used
     * as a property look up on each item.
     *
     * @example
     * comb.array.max([{a : 1}, {a : 2}, {a : -2}], "a"); //{a : 2}
     * comb.array.max([{a : 1}, {a : 2}, {a : -2}], function(a,b){
     *      return a.a - b.a
     * }); //{a : 2}
     *
     * @param arr the array to find the max value on
     * @param {String|Function} cmp the property to sort on. Or a function used to compare.
     * @return {*} the maximum value of the array based on the provided cmp.
     */
    max:function (arr, cmp) {
        return _sort(arr, cmp)[arr.length - 1];
    },

    /**
     * Finds the difference of the two arrays.
     *
     * @example
     *
     * comb.array.difference([1,2,3], [2,3]); //[1]
     * comb.array.difference(["a","b",3], [3]); //["a","b"]
     *
     * @param {Array} arr1 the array we are subtracting from
     * @param {Array} arr2 the array we are subtracting from arr1
     * @return {*} the difference of the arrays.
     */
    difference:function (arr1, arr2) {
        var ret = arr1, args = array.flatten(misc.argsToArray(arguments).slice(1));
        if (isArray(arr1)) {
            ret = arr1.filter(function (a) {
                return args.indexOf(a) === -1;
            });
        }
        return ret;
    },


    /**
     * Removes duplicates from an array
     *
     * @example
     *
     * comb.array.removeDuplicates([1,1,1]) => [1]
     * comb.array.removeDuplicates([1,2,3,2]) => [1,2,3]
     *
     * @param {Aray} array the array of elements to remove duplicates from
     */
    removeDuplicates:function (arr) {
        if (isArray(arr)) {
            var ret = arr.reduce(function (a, b) {
                if (a.indexOf(b) === -1) {
                    return a.concat(b);
                } else {
                    return a;
                }
            }, []);
            return ret;
        }
    },

    unique:function (arr) {
        return array.removeDuplicates(arr);
    },

    /**
     * Rotates an array the number of specified positions
     *
     * @example
     * var arr = ["a", "b", "c", "d"];
     * comb.array.rotate(arr)     => ["b", "c", "d", "a"]
     * comb.array.rotate(arr, 2)  => ["c", "d", "a", "b"]);
     * comb.array.rotate(arr, 3)  => ["d", "a", "b", "c"]);
     * comb.array.rotate(arr, 4)  => ["a", "b", "c", "d"]);
     * comb.array.rotate(arr, -1) => ["d", "a", "b", "c"]);
     * comb.array.rotate(arr, -2) => ["c", "d", "a", "b"]);
     * comb.array.rotate(arr, -3) => ["b", "c", "d", "a"]);
     * comb.array.rotate(arr, -4) => ["a", "b", "c", "d"]);
     *
     * @param {Array} array the array of elements to remove duplicates from
     * @param {Number} numberOfTimes the number of times to rotate the array
     */
    rotate:function (arr, numberOfTimes) {
        var ret = arr.slice();
        if (typeof numberOfTimes != "number") {
            numberOfTimes = 1;
        }
        if (numberOfTimes && isArray(arr)) {
            if (numberOfTimes > 0) {
                ret.push(ret.shift());
                numberOfTimes--;
            } else {
                ret.unshift(ret.pop());
                numberOfTimes++;
            }
            return array.rotate(ret, numberOfTimes);
        } else {
            return ret;
        }
    },

    /**
     * Finds all permutations of an array
     *
     * @example
     * var arr = [1,2,3];
     * comb.array.permutations(arr)    => [[ 1, 2, 3 ],[ 1, 3, 2 ],[ 2, 3, 1 ],
     *                                     [ 2, 1, 3 ],[ 3, 1, 2 ],[ 3, 2, 1 ]]
     * comb.array.permutations(arr, 2) => [[ 1, 2],[ 1, 3],[ 2, 3],[ 2, 1],[ 3, 1],[ 3, 2]]
     * comb.array.permutations(arr, 1) => [[1],[2],[3]]
     * comb.array.permutations(arr, 0) => [[]]
     * comb.array.permutations(arr, 4) => []
     *
     * @param {Array} arr the array to permute.
     * @param {Number} length the number of elements to permute.
     */
    permutations:function (arr, length) {
        var ret = [];
        if (isArray(arr)) {
            var copy = arr.slice(0);
            if (typeof length != "number") {
                length = arr.length;
            }
            if (!length) {
                ret = [
                    []
                ];
            } else if (length <= arr.length) {
                ret = arr.reduce(function (a, b, i) {
                    if (length > 1) {
                        var ret = permute(b, array.rotate(copy, i).slice(1), length);
                    } else {
                        ret = [
                            [b]
                        ];
                    }
                    return a.concat(ret);
                }, [])
            }
        }
        return ret;
    },

    /**
     * Zips to arrays together
     *
     * @example
     *  var a = [ 4, 5, 6 ], b = [ 7, 8, 9 ]
     *  comb.array.zip([1], [2], [3]) => [[ 1, 2, 3 ]]);
     *  comb.array.zip([1,2], [2], [3]) => [[ 1, 2, 3 ],[2, null, null]]
     *  comb.array.zip([1,2,3], a, b) => [[1, 4, 7],[2, 5, 8],[3, 6, 9]]
     *  comb.array.zip([1,2], a, b) => [[1, 4, 7],[2, 5, 8]]
     *  comb.array.zip(a, [1,2], [8]) => [[4,1,8],[5,2,null],[6,null,null]]
     *
     * @param arrays variable number of arrays to zip together
     */
    zip:function () {
        var ret = [];
        var arrs = argsToArray(arguments);
        if (arrs.length > 1) {
            var arr1 = arrs.shift();
            if (isArray(arr1)) {
                ret = arr1.reduce(function (a, b, i) {
                    var curr = [b];
                    for (var j = 0; j < arrs.length; j++) {
                        var currArr = arrs[j];
                        if (isArray(currArr) && !misc.isUndefined(currArr[i])) {
                            curr.push(currArr[i]);
                        } else {
                            curr.push(null);
                        }
                    }
                    a.push(curr)
                    return a;
                }, []);
            }
        }
        return ret;
    },

    /**
     * Transposes an array of arrays
     * @example
     *
     * comb.array.transpose([[1,2,3], [4,5,6]]) => [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
     * comb.array.transpose([[1,2], [3,4], [5,6]]) => [ [ 1, 3, 5 ], [ 2, 4, 6 ] ]
     * comb.array.transpose([[1], [3,4], [5,6]]) => [[1]])
     *
     * @param [Array[Array[]]] arr Array of arrays
     */
    transpose:function (arr) {
        var ret = [];
        if (isArray(arr) && arr.length) {
            var last;
            arr.forEach(function (a) {
                if (isArray(a) && (!last || a.length == last.length)) {
                    a.forEach(function (b, i) {
                        !ret[i] && (ret[i] = []);
                        ret[i].push(b);
                    });
                    last = a;
                }
            });
        }
        return ret;
    },
    /**
     * Retrieves values at specified indexes in the array
     *
     * @example
     *
     *  var arr =["a", "b", "c", "d"]
     *   comb.array.valuesAt(arr, 1,2,3) => ["b", "c", "d"];
     *   comb.array.valuesAt(arr, 1,2,3, 4) => ["b", "c", "d", null];
     *   comb.array.valuesAt(arr, 0,3) => ["a", "d"];
     *
     *   @param {Array} arr the array to retrieve values from
     *   @index {Number} index variable number of indexes to retrieve
     */
    valuesAt:function (arr, indexes) {
        var ret = [];
        var indexes = argsToArray(arguments);
        var arr = indexes.shift(), l = arr.length;
        if (isArray(arr) && indexes.length) {
            for (var i = 0; i < indexes.length; i++) {
                ret.push(arr[indexes[i]] || null);
            }
        }
        return ret;
    },

    /**
     * Union a variable number of arrays together
     *
     * @example
     *
     * comb.array.union(['a','b','c'], ['b','c', 'd']) => ["a", "b", "c", "d"]
     * comb.array.union(["a"], ["b"], ["c"], ["d"], ["c"]) => ["a", "b", "c", "d"]
     *
     * @param arrs variable number of arrays to union
     */
    union:function () {
        var ret = [];
        var arrs = argsToArray(arguments);
        if (arrs.length > 1) {
            ret = array.removeDuplicates(arrs.reduce(function (a, b) {
                return a.concat(b);
            }, []));
        }
        return ret;
    },

    /**
     * Finds the intersection of arrays
     * NOTE : this function accepts an arbitrary number of arrays
     *
     * @example
     * comb.array.intersect([1,2], [2,3], [2,3,5]) => [2]
     * comb.array.intersect([1,2,3], [2,3,4,5], [2,3,5]) => [2,3]
     * comb.array.intersect([1,2,3,4], [2,3,4,5], [2,3,4,5]) => [2,3,4]
     * comb.array.intersect([1,2,3,4,5], [1,2,3,4,5], [1,2,3]) => [1,2,3]
     * comb.array.intersect([[1,2,3,4,5],[1,2,3,4,5],[1,2,3]]) => [1,2,3]
     *
     * @param {Array} a
     * @param {Array} b
     */
    intersect:function (a, b) {
        var collect = [], set;
        var args = argsToArray(arguments);
        if (args.length > 1) {
            //assume we are intersections all the lists in the array
            set = args;
        } else {
            set = args[0];
        }
        if (isArray(set)) {
            var x = set.shift();
            var collect = set.reduce(function (a, b) {
                return intersection(a, b);
            }, x);
        }
        return array.removeDuplicates(collect);
    },

    /**
     * Finds the powerset of an array
     *
     * @example
     *
     *  comb.array.powerSet([1,2]) => [
     *           [],
     *           [ 1 ],
     *           [ 2 ],
     *           [ 1, 2 ]
     *   ]
     *   comb.array.powerSet([1,2,3]) => [
     *           [],
     *           [ 1 ],
     *           [ 2 ],
     *           [ 1, 2 ],
     *           [ 3 ],
     *           [ 1, 3 ],
     *           [ 2, 3 ],
     *           [ 1, 2, 3 ]
     *       ]
     *   comb.array.powerSet([1,2,3,4]) => [
     *           [],
     *           [ 1 ],
     *           [ 2 ],
     *           [ 1, 2 ],
     *           [ 3 ],
     *           [ 1, 3 ],
     *           [ 2, 3 ],
     *           [ 1, 2, 3 ],
     *           [ 4 ],
     *           [ 1, 4 ],
     *           [ 2, 4 ],
     *           [ 1, 2, 4 ],
     *           [ 3, 4 ],
     *           [ 1, 3, 4 ],
     *           [ 2, 3, 4 ],
     *           [ 1, 2, 3, 4 ]
     *       ]
     *
     * @param {Array} arr the array to find the powerset of
     */
    powerSet:function (arr) {
        var ret = [];
        if (isArray(arr) && arr.length) {
            var ret = arr.reduce(function (a, b) {
                var ret = a.map(function (c) {
                    return c.concat(b);
                })
                return a.concat(ret);
            }, [
                []
            ]);
        }
        return ret;
    },

    /**
     * Find the cartesian product of two arrays
     *
     * @example
     *
     * comb.array.cartesian([1,2], [2,3]) => [
     *           [1,2],
     *           [1,3],
     *           [2,2],
     *           [2,3]
     *       ]
     * comb.array.cartesian([1,2], [2,3,4]) => [
     *           [1,2],
     *           [1,3],
     *           [1,4] ,
     *           [2,2],
     *           [2,3],
     *           [2,4]
     *       ]
     * comb.array.cartesian([1,2,3], [2,3,4]) => [
     *           [1,2],
     *           [1,3],
     *           [1,4] ,
     *           [2,2],
     *           [2,3],
     *           [2,4] ,
     *           [3,2],
     *           [3,3],
     *           [3,4]
     *       ]
     *
     * @param {Array} a
     * @param {Array} b
     */
    cartesian:function (a, b) {
        var ret = [];
        if (isArray(a) && isArray(b) && a.length && b.length)
            ret = cross(a[0], b).concat(array.cartesian(a.slice(1), b));
        return ret;
    },

    /**
     * Compacts an array removing null or undefined objects from the array.
     *
     * @example
     *
     * var x;
     * comb.array.compact([1,null,null,x,2]) => [1,2]
     * comb.array.compact([1,2]) => [1,2]
     *
     * @param {Array} arr
     */
    compact:function (arr) {
        var ret = [];
        if (isArray(arr) && arr.length) {
            ret = arr.filter(function (item) {
                return !misc.isUndefinedOrNull(item);
            })
        }
        return ret;
    },

    /**
     * Creates a new array that is the result of the array concated the number of
     * times. If times is not specified or it equals 0 then it defaults to 1.
     * @param {Array} arr the array to multiply.
     * @param {Number} [times=1] the number of times to multiple the array.
     * @return {Array} a new array that is the result of the array multiplied the number of times specified.
     */
    multiply:function (arr, times) {
        times = number.isNumber(times) ? times : 1;
        if (!times) {
            //make sure times is greater than zero if it is zero then dont multiply it
            times = 1;
        }
        arr = array.toArray(arr || []);
        var ret = [], i = 0;
        while (++i <= times) {
            ret = ret.concat(arr);
        }
        return ret;
    },

    /**
     * Flatten multiple arrays into a single array
     *
     * @example
     *
     * comb.array.flatten([1,2], [2,3], [3,4]) => [1,2,2,3,3,4]
     * comb.array.flatten([1,"A"], [2,"B"], [3,"C"]) => [1,"A",2,"B",3,"C"]
     *
     * @param array
     */
    flatten:function (arr) {
        var set;
        var args = argsToArray(arguments);
        if (args.length > 1) {
            //assume we are intersections all the lists in the array
            set = args;
        } else {
            set = array.toArray(arr);
        }
        return set.reduce(function (a, b) {
            return a.concat(b);
        }, []);
    }

}
;

array = comb.array;
