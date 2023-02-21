/////////////
// App Dev //
/////////////

// Module: Async programming.
/////////////////////////////

// This is a final optional exercise that teaches you 
// the Bread and Butter of async programming. 

// To complete this exercise, you should understand
// how callbacks, promises, async/await, and require work in NodeJS.

// The Bread and Butter of Async Programming.
/////////////////////////////////////////////

// The Bread and Butter of async programming consists of 5 actions:

// 1- Opening the fridge,                ** can be async
// 2- Taking the butter,                 ** can be async
// 3- Taking the bread,
// 4- Slicing the bread,                 ** can be async
// 5- Spreading the butter on the bread.


// Your goal is to say "Yummy!", with the function below, at the right 
// moment, after all actions have taken place in the right order.

function yummy() {
  console.log('\nYummy!\n');
}

// Global variables: they make things happen.

// doAsync: If TRUE, finding the butter or to slicing the bread 
//          might take longer, so the preparation of the
//          Bread and Butter of async programming might fail.
// doSilly: If TRUE, some silly actions might take place, so the preparation
//          of the Bread and Butter of async programming might fail.
// doThrow: If TRUE, it will throw an error if the preparation of the Bread 
//          and Butter of async programming fails (else the order of 
//          execution of the actions might no longer make sense).


// Exercise 0.
///////////////

// Import all 5 sync actions for the Bread and Butter of async programming.
// Run the breadAndButter function and contemplate the synchronous version of
// the Bread and Butter of async programming.

let doAsync = false;
let doSilly = false;
let doThrow = false;

function yummy() {
  console.log('\nYummy!\n');
}

// Notice the parentheses after the require: "./lib/actions.js" exports 
// a function that is immediately executed.
let { openFridge, takeButter, takeBread, sliceBread, spreadButter } = 
  require("./lib/actions.js")(doAsync, doSilly, doThrow);

function breadAndButter() {
    console.clear();
    console.log();
    console.log("The Bread and Butter of async programming:");
    if (!doAsync && !doSilly) console.log('\t(Synchronous Edition)\t');
    console.log();

    openFridge();
    takeButter();
    takeBread();
    sliceBread();
    spreadButter();

    yummy();
}

breadAndButter();

// Exercise 1.
///////////////

// Let's try out async now: set doAsync to true.
// Does the output makes sense?

let doAsync = true;
let doSilly = false;
let doThrow = false;

function yummy() {
  console.log('\nYummy!\n');
}

let { openFridge, takeButter, takeBread, sliceBread, spreadButter } = 
  require("./lib/actions.js")(doAsync, doSilly, doThrow);

// Run the async version of breadAndButter() and observe what happens.

function breadAndButter() {
  console.clear();
  console.log();
  console.log("The Bread and Butter of async programming:");
  if (!doAsync && !doSilly) console.log('\t(Synchronous Edition)\t');
  console.log();

  openFridge();
  takeButter();
  takeBread();
  sliceBread();
  spreadButter();

  yummy();
}

breadAndButter();

// Exercise 2.
///////////////

// Fix the async version of the Bread and Butter of async programming
// using the callback pattern. You will need to:

// 1- Copy "./lib/actions.js" and save it as "./lib/actions_cb.js", 
// 2- Edit "./lib/actions_cb.js" to implement the callback pattern,
// 3- Write the missing code inside breadAndButterCb() to invoke 
//      the actions using the callback pattern.

// Remember that only openFridge, takeButter and sliceBread can be async.

// Solution.
// Remember to copy the actions_cb.js file inside the lib/ folder.

let doAsync = true;
let doSilly = false;
let doThrow = false;

function yummy() {
  console.log('\nYummy!\n');
}

let { openFridge, takeButter, takeBread, sliceBread, spreadButter } = 
  require("./lib/actions_cb.js")(doAsync, doSilly, doThrow);


function breadAndButterCb() {
  console.clear();
  console.log();
  console.log("The Bread and Butter of async programming:");
  console.log('\tNOW WITH CALLBACKS!\t')
  if (!doAsync && !doSilly) console.log('\t(Synchronous Edition)\t');
  console.log();
  
  openFridge(() => {
    takeButter(() => {
      takeBread();
      sliceBread(() => {
        spreadButter();
        yummy();
      });
    });
  });
}

breadAndButterCb();


// Exercise 3.
///////////////

// Fix the async version of the Bread and Butter of async programming
// using the Promise pattern. You will need to:

// 1- Copy "./lib/actions.js" and save it as "./lib/actions_promise.js", 
// 2- Edit "./lib/actions_promise.js" to implement the Promise pattern,
// 3- Write the missing code inside breadAndButterCb() to invoke 
//      the actions using the Promise pattern.

// Remember that only openFridge, takeButter and sliceBread can be async.

// Hint: Here there is an additional difficulty. 
// When you create new promise with the Promise constructor,
// the function is immediately evaluated. 
// You will need a function that creates new promises only when needed.

// Solution.
// Remember to copy the actions_promise.js file inside the lib/ folder.

let doAsync = true;
let doSilly = false;
let doThrow = false;

function yummy() {
  console.log('\nYummy!\n');
}

let { openFridge, takeButter, takeBread, sliceBread, spreadButter } = 
   require("./lib/actions_promise.js")(doAsync, doSilly, doThrow);

// Promises are executed immediately when created, so we need a function
// that to create them only when we need them!
const asyncActions = {
  openFridge: openFridge,
  takeButter: takeButter,
  sliceBread: sliceBread
};
const promiseIt = action => new Promise(asyncActions[action]);
 
function breadAndButterPromise() {
  console.clear();
  console.log();
  console.log("The Bread and Butter of async programming:");
  console.log('\tNOW WITH PROMISES!\t')
  if (!doAsync && !doSilly) console.log('\t(Synchronous Edition)\t');
  console.log();

  promiseIt('openFridge')
    .then(() => promiseIt('takeButter'))
    .then(() => { 
      takeBread();
      promiseIt('sliceBread')
        .then(() => { 
          spreadButter();
           yummy();
      })
      .catch(err => {
        console.log('An error happened while slicing the bread.', err)
      })
      .finally(() => console.log('Finally!'));
    })
    .catch(err => {
      console.log('An error happened either taking the butter or slicing the bread:', err)
    })

}

breadAndButterPromise();

// Exercise 4.
//////////////

// Fix the async version of the Bread and Butter of async programming
// using the Promise pattern. You will need to:

// 1- Copy "./lib/actions.js" and save it as "./lib/actions_await.js", 
// 2- Edit "./lib/actions_await.js" to implement the async/await pattern,
// 3- Write the missing code inside breadAndButterCb() that invokes 
//      the functions using the async/await pattern.

// Remember that only openFridge, takeButter and sliceBread can be async.

// Solution.
// Remember to copy the actions_await.js file inside the lib/ folder.

let doAsync = true;
let doSilly = false;
let doThrow = false;

function yummy() {
  console.log('\nYummy!\n');
}

let { openFridge, takeButter, takeBread, sliceBread, spreadButter } = 
  require("./lib/actions_await.js")(doAsync, doSilly, doThrow);

  
async function breadAndButterAwait() {
    console.clear();
    console.log("The Bread and Butter of async programming:");
    console.log('\tNOW WITH ASYNC/AWAIT!\t')
    if (!doAsync && !doSilly) console.log('\t(Synchronous Edition)\t');
    console.log();
    
    await openFridge();
    await takeButter();
    takeBread();
    await sliceBread();
    spreadButter();
    yummy();

}
  
breadAndButterAwait();

// Exercise 5.
//////////////

// Try setting doSilly or doThrow to true in the previous exercises.


