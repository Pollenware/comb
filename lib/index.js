var base = require("./base");

/**
 * @projectName comb
 *
 * @github https://github.com/Pollenware/comb
 *
 * @includeDoc [OO] ../docs-md/define.md
 * @includeDoc [Promises] ../docs-md/promise.md
 * @includeDoc [Logging] ../docs-md/logging.md
 * @includeDoc [Utilities] ../docs-md/utilities.md
 * @includeDoc [Test Coverage] [../docs-md/coverage.html]
 *
 *
 * @header
 *
 * #Comb
 *
 * ##Overview
 *
 * Framework for node that provides a one stop shop for frequently needed utilities, including:
 *
 * * [OO utilties](./define.html)
 * * Collections
 * * [Logging](./logging.html)
 * * [String &amp; date formatting](./utilities)
 * * [Flow control](./promise.html)
 *
 *
 * ##Installation
 *
 * `npm install comb`
 *
 * ##Highlights
 *
 * * 100% test coverage!
 * * comb([define](./comb.html#.define)|[singleton](./comb.html#.singleton))
 *   * The backbone of comb.
 *   * Options for classical inheritance models as well as mixins(pseudo multi-inheritance)
 *   * You can call this._super from any method. Including statically defined ones!
 *   * Access to your class level properties within an instance
 * * Logging
 *   * Logger inheritance through name spaces
 *   * Predefined [level](./comb_logging_Level.html) level definition along with the ability to define your own.
 *   * Multiple appenders including
 *      * [FileAppender](./comb_logging_appenders_FileAppender.html) - log it to a file
 *      * [RollingFileAppender](./comb_logging_appenders_RollingFileAppender.html) - log it to a file up to a customizable size then create a new one.
 *      * [JSONAppender](./comb_logging_appenders_JSONAppender.html) - write it out as JSON to a file.
 *      * [ConsoleAppender](./comb_logging_appenders_ConsoleAppender.html)- log it to the console
 *   * Configurable with [files OR programatically](./comb_logger.html#.configure)
 * * Collections
 *   * [RedBlackTree](./comb_collections_RedBlackTree.html)
 *   * [AVLTree](./comb_collections_AVLTree.html)
 *   * [AnderssonTree](./comb_collections_AnderssonTree.html)
 *   * [BinaryTree](./comb_collections_BinaryTree.html)
 *   * [HashTable](./comb_collections_HashTable.html)
 *   * [MaxHeap](./comb_collections_MaxHeap.html)
 *   * [MinHeap](./comb_collections_MinHeap.html)
 *   * [Pool](./comb_collections_Pool.html)
 *   * [PriorityQueue](./comb_collections_PriorityQueue.html)
 *   * [Queue](./comb_collections_Queue.html)
 *   * [Stack](./comb_collections_Stack.html)
 *
 * * [Flow control](./promise.html)
 *   * [Promises](./comb_Promise.html)
 *   * [PromiseList](./comb_PromiseList.html)
 *   * [comb.when](./comb.html#.when)
 *   * [comb.serial](./comb.html#.serial)
 *
 * @footer
 * ##License
 *
 * MIT <https://github.com/Pollenware/comb/raw/master/LICENSE>
 *
 * ##Meta
 * * Code: `git clone git://github.com/Pollenware/comb.git`
 * * Website: <http://pollenware.com>
 * * Twitter: [http://twitter.com/pollenware](http://twitter.com/pollenware) - 877.465.4045
 */

/**
 * Utilities for javascript, optimized for the server environment.
 *
 *
 * @namespace
 */
var comb = exports;
base.merge(exports, base, require("./define"), require("./promise"), require("./plugins"), require("./collections"), require("./logging"));


comb.definePlugin = function (obj) {
    if (comb.isHash(obj)) {
        comb.deepMerge(comb, obj);
    }
    return comb;
};





