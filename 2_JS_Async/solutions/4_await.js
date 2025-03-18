/////////////
// App Dev //
/////////////

// Module: Async programming.
/////////////////////////////

// The await/async pattern is so called "sugar coating" over the Promise syntax
// It means that it makes writing code involving promises easier and faster.
// You don't even realize you are writing a Promise!

// EXERCISE 1. Async/await.
///////////////////////////

// This is a plain, normal, boring function.
let hello = () => { return "Hello" };
hello();

// This is a really cool, brand new, async function.
hello = async () => { return "Hello" };
hello();

// They might look similar, but the async function has superpowers:
// it returns a promise, to which you can chain the usual .then().
hello().then((value) => console.log(value));
// Or even more compact:
hello().then(console.log);

// An async function can pause the execution of a program without
// blocking the event loop (so other requests can be fulfilled in the wait).

// For this, use the "await" keyword, for instance: 
// let word = await hello();

// But there is a catch 22. 
// Await can await async functions only inside an async function.
// (tl;dr the JS compiler wants to know in advance if an await is coming).
// Update! Newest versions of ESM Node.js allows you to use await outside of
// async functions, but it won't work here.

// Let's make hello really async now.
hello = async () => { 
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hello"), 1000);
  });
  let word = await promise;
  console.log(word);
};

hello();

// Exercise: handling errors in async/await.
////////////////////////////////////////////

// What if the promise is not fulfilled? We need to use the good old 
// try/catch block.

// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

// Rewrite hello() so that it rejects the promise and catch the error
// in a try/catch block.

// Let's make hello really async now.
hello = async () => { 
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => reject("Nope!"), 1000);
  });
  try {
    let word = await promise;
    console.log(word);
  }
  catch(e) {
    console.log(e);
  }
};

hello();





  