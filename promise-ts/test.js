"use strict";
exports.__esModule = true;
var index_1 = require("./index");
// 同步
new index_1["default"](function (reslove, reject) {
    reslove('success');
}).then(function (res) {
    console.log('sync: ' + res); // success
}, function (err) {
    console.log(err);
});
// 异步
new index_1["default"](function (reslove, reject) {
    setTimeout(function () {
        reslove('timeout success');
    }, 2000);
}).then(function (res) {
    console.log('async: ' + res); // timeout success
}, function (err) {
    console.log(err);
});
// 链式
new index_1["default"](function (resolve) {
    resolve();
})
    .then(function () {
    return 'step1';
})
    .then(function (res) {
    return res + ' -> ' + 'step2';
})
    .then(function (res) {
    return res + ' -> ' + 'step3';
})
    .then(function (res) {
    console.log('chain: ' + res); // step1:step2
});
// 穿透
new index_1["default"](function (reslove) {
    reslove('hello');
})
    .then()
    .then()
    .then()
    .then(function (res) {
    console.log('value penetration: ' + res); // 'hello'
});
