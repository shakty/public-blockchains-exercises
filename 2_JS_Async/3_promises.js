/////////////
// App Dev //
/////////////

// Module: Async programming.
/////////////////////////////

// Here is a riddle for you:

// I promise that you will master async coding.
// Then you will be happy.
// Catch the meaning of this intro after you understand promises.
// Finally you will be really happy.

// If you understand JS promises you will understand it.

// EXERCISE 1. Promises.
////////////////////////

// Promises are really simple. Let me break it down for you.
// - They are one function, 
// - taking two input parameters,
// - those input parameters are also functions,
// - you execute the first one on success, and the second on failure.

// According to the authoritative source bestlifeonline.com
// (https://bestlifeonline.com/crazy-statistics/), one third of adults sleeps
// with a comfort object (teddy bear, etc.). 

// Let's write a function that is _on average_ accurate in guessing
// if you are sleeping with a comfort object.

let comfortObj = 1/3;

let promise = new Promise(function(resolve, reject) {
  // ... your code here.
});

console.log('Do you sleep with a Teddy bear?');
promise
  .then(res => console.log(`Yes, you are!`))
  .catch(res => console.log(`No, you are not.`));


// Ok, isn't this section for async code? The example above is synchronous!
// I am sorry no refunds. Promises don't actually care about sync vs async.
// They just have two functions resolve/reject and want to execute one of them.

// Now implement the example above in an async way.
// Hint: setTimeout

comfortObj = 1/3;

promise = new Promise(function(resolve, reject) {
  // Your code here.
});

console.log('Do you sleep with a Teddy bear?');
promise
  .then(res => console.log(`Yes, you are!`))
  .catch(res => console.log(`No, you are not.`));


// EXERCISE 2. Finally.
///////////////////////

// I didn't tell you about it before, but promises have a third method: finally.
// It is called regardless of whether the promise was successefull or failed.
// Use the finally statement to set the value of exerciseIsOver to true,
// and if it is true and report the value to console.

comfortObj = 1/3;
let exerciseIsOver = false;

promise = new Promise(function(resolve, reject) {
  // Same code as before.
});

console.log('Do you sleep with a Teddy bear?');
promise
  .then(res => console.log(`Yes, you are!`))
  .catch(res => console.log(`No, you are not.`))
  .finally(() => {
    // Your code here.
  });

  