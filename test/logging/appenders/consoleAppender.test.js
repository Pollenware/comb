"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    logging = comb.logging,
    ConsoleAppender = logging.appenders.ConsoleAppender;


it.describe("comb.logging.appenders.ConsoleAppender", function (it) {

    var logger = logging.Logger.getLogger("ConsoleLoggerTest"),
        appender = new ConsoleAppender();
    logger.addAppender(appender);
    it.should("be added to the logger", function () {
        assert.isTrue(logger.isAppenderAttached("consoleAppender"));
        assert.deepEqual(logger.appenders, [appender]);
    });


    it.should("have then logged to the appender ", function () {
        var orig = console.log;
        var count = 0;
        var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
        console.log = function (str) {
            assert.isTrue(str.match(levels[count]) != null);
            count++;
        };
        levels.forEach(function (l) {
            logger[l](l);
        });
        assert.equal(count, 6);
        console.log = orig;

    });

    it.should("the logger should log no events to the appender ", function () {
        var orig = console.log;
        logger.level = logging.Level.OFF;
        var count = 0;
        var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
        console.log = function (str) {
            assert.isTrue(str.match(levels[count]) != null);
            count++;
        };
        levels.forEach(function (l) {
            logger[l](l);
        });
        assert.equal(count, 0);
        console.log = orig;

    });

}).as(module);