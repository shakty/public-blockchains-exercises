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

let promise = new Promise((resolve, reject) => {
  if (Math.random() <= comfortObj) resolve("Bearrrr");
  else reject("No bear :((((");
});

console.log('Do you sleep with a Teddy bear?');
promise.then(resolveValue => console.log(resolveValue))
       .catch(rejectValue => console.log(rejectValue));


// Ok, isn't this section for async code? The example above is synchronous!
// I am sorry no refunds. Promises don't actually care about it sync vs async.
// They just have two functions resolve/reject and want to execute one of them.

// Now implement the example above in an async way.
// Hint: setTimeout

let exerciseIsOver = false;
comfortObj = 1/3;

promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('ASYNC');
    if (Math.random() > comfortObj) resolve("Bearrrr");
    else reject("No bearr :((((");
  }, 1500);
});

console.log('Do you sleep with a Teddy bear?');
promise.then(resolveValue => console.log(resolveValue))
       .catch(rejectValue => console.log(rejectValue))
       .finally(() => {exerciseIsOver = true; console.log("Exercise is over!")});

// EXERCISE 2. Finally.
///////////////////////

// I didn't tell you about it before, but promises have a third method: finally.
// It is called regardless of whether the promise was successefull or failed.
// Use the finally statement to set the value of exerciseIsOver to true,
// and if it is true and report the value to console.

  