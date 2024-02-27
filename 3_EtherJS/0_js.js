// I know you did the exercises in chapters 1 and 2, but just in case...

// JS Refresher.
////////////////

// Note 1: Some knowledge of computer programming is expected!

// Note 2: It is also expected that you "help yourself" by looking up for
// the right command and syntax in one of these helpful sites:

// JavaScript Generals:

// - https://javascript.info
// - https://www.w3schools.com/nodejs/
// - https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/

// There is also a crush course on JS fundamentals and asynchronous code 
// under the local folders:

// - 1_JS_Basics
// - 2_JS_Async


// Exercise 0. Create a simple function.
////////////////////////////////////////

// The exercises in this file are "cumulative", that is you need to solve them
// one by one one to progress until the bottom.

// You should have installed the extension "Code Runner" already. If so, you can
// click on the "Play" button on the top right corner of the editor to execute
// the code.

// Unlike environments like Jupyter, the entire content of this file will 
// be executed, until you tell the process to stop. 

// This line will tell the process to stop.
process.exit(0);
console.log('I am a sad line...I will not be printed to console :(');

// a. Move the sad line above and below `process.exit(0);` to check that the
// process stops where it is intended to. When you are done, comment out both
// lines and move to the next exercise.

// b. Create a function called "exit" that wraps the call to `process.exit` and
// prints out the exercise number from a global variable called `exercise`.
// Hint: never created a function in JS? Check this page:
// https://javascript.info/function-basics

// Hint: German keyboard curly brackets: Alt-gr-7 (open), Alt-gr-8 (close).

let exercise = 0;

// Your code here!

// c. Bonus. Did you realize that JavaScript/Node.JS has three different ways
// of declaring a function?

// 1. Functions
// 2. Function Expressions
// 3. Arrow functions

// Check out the explanations online and have fun implementing the `exit`
// function in three different ways. Finally, pay attention at the different
// use of the semicolon.

// Checkpoint. Under what conditions can you reuse the same name (i.e., `exit`)
// for all three functions? 

// Your code here!


// Exercise 1. NPM Warm Up.
///////////////////////////
exercise = 1;

// Execute the code below with Code Runner without errors. What is this 
// code for? More on the next exercise.

// Hint: you might need to install the dotenv package with npm.
// https://www.npmjs.com/package/dotenv

// Hint2: if so, you will need to open a "terminal"; you can do
// it directly in VS Code or selecting a program installed in your operating
// system (e.g., Terminal, Git Bash, Windows Power Shell, etc.).

// Hint3: don't forget to uncomment the call to `exit()`.

require('dotenv').config();

// exit();
