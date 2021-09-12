const fs = require('fs');


let pendingPromise = fs.promises.readFile('./f1.txt');

console.log(pendingPromise);


// on success callback
pendingPromise.then((data) => {
    console.log('Inside successs callback');
    console.log(data + "");
    console.log(data);
    console.log(pendingPromise);
});

// on failure callback
pendingPromise.catch((error) => {
    console.log('Inside failure callback');
    console.log(error);
    console.log(pendingPromise);
});