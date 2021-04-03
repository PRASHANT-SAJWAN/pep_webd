const fs = require('fs');


let pendingPromise1 = fs.promises.readFile('./f1.txt');


// on success callback
pendingPromise1.then((data) => {
    console.log(data + "");
    let pendingPromise2 = fs.promises.readFile('./f2.txt');
    return pendingPromise2;
}).then (function (data) {
    console.log(data + "");
    let pendingPromise3 = fs.promises.readFile('./f3.txt');
    return pendingPromise3;
}).then (function (data) {
    console.log(data + "");
})