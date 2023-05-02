// Loading path module for operations with file paths.
const path = require('path');

// Exercise 1: Loading the .env file correctly.
///////////////////////////////////////////////

// The dotenv package is sensitive to the execution modes.
// The execution mode sets the "current working directory", which by default
// for dotenv is:

// path.resolve(process.cwd(), '.env');

// The value of `process.cwd()` might differ if you use Node Runner or
// if run your scripts from terminal, e.g., with `node path/to/script.js`.

// a. Try out different execution modes and print the value of `pathToDotEnv`.
// Hint: use Node Runner and from the terminal.

let pathToDotEnv = path.resolve(process.cwd(), '.env');
console.log(pathToDotEnv);

// Checkpoint. Does the value of the terminal depends 
// from the directory of execution?


// b. To avoid path issues, you can specify the path to the .env file manually
// in the `config()` method of the dotenv package. See how to do it in
// the examples here: https://www.npmjs.com/package/dotenv

// You can specify the full path manually, however it is more convenient to
// use a relative path from this file. The `__dirname` variable always 
// points to the directory in which this file is contained.

// Hint: use path.join(...) to build a relative path to the .env file. 

pathToDotEnv = path.join(__dirname, '..', '..', '.env');
console.log(pathToDotEnv);

require("dotenv").config({ path: pathToDotEnv });

// c. Bonus. Load the 'fs' native module and use the method `existsSync` to 
// check if the path to the .dotenv file is correct.
const fs = require('fs');

console.log(pathToDotEnv);
if (fs.existsSync(pathToDotEnv)) {
    console.log('You found the .env file!');
}



