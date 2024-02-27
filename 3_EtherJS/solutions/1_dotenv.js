// Loading path module for operations with file paths.
const path = require('path');

function exit() {
    console.log('Exercise ' + exercise + ' completed.');
    process.exit(0);
    console.log('I will not be printed to console :(');
}

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
// on the directory of execution?


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


// Exercise 2. Create and fill in .env file.
////////////////////////////////////////////
exercise = 2;

// You should:
// - have an account with an RPC node provider (e.g., Alchemy or Infura),
// - have an own Ethereum address (e.g., on Metamask).

// You now need a special place to store all these credentials safely.
// This place is inside .env file. What is an .env file? It is a safe place
// where to store your credentials, but also non-sensitive information that
// need to be shared in different parts of your application. 

// The dotenv package you required in the previous exercise will load
// the content of .env and make it available at runtime under `process.env`. 

// Create a .env file with the necessary information. In particular, you
// need to add your Metamask address and private key to it.
// Hint1: you can copy .env_sample, modify its content and save it as .env.
// Hint2: there are several tutorials about how to export the private key from
// MetaMask, e.g.: https://www.youtube.com/watch?v=KSY_bSkzb9c
 
// See if it worked.
console.log(process.env);

// exit();

// Exercise 3. Check the content of the .env file.
//////////////////////////////////////////////////

// In JavaScript variables are loosely typed.
exercise = '3a';

// Let's learn a bit of JavaScript syntax. 

// a. Check that the variable METAMASK_ACCOUNT_1 is not empty. Write an 
// if statement that prints a warning message if empty.
console.log(process.env.METAMASK_ACCOUNT_1);

let privateKey = process.env.METAMASK_PRIVATE_KEY;
if (privateKey === "") {
    console.log('Missing private key, fix your .env file');
}

exit();

// b. Create an array with all the names of the variables written in the .env
// file. Then print the lenght of the array.

exercise = '3b';

let variablesToCheck = [
    "INFURA_KEY", "INFURA_SEPOLIA", "INFURA_GOERLI", "INFURA_MAINNET",
    "ALCHEMY_KEY", "ALCHEMY_SEPOLIA", "ALCHEMY_GOERLI", "ALCHEMY_MAINNET",
    "METAMASK_1_ADDRESS", "METAMASK_1_PRIVATE_KEY",
    "METAMASK_2_ADDRESS", "METAMASK_2_PRIVATE_KEY",
    "ETHERSCAN_KEY"
];

console.log('Num of variables in .env to check: ', variablesToCheck.length);

// exit();

// c. Loop through all the elements of the array and check that the variable
// is set and non-empty under `process.env`.

// Hint1: You can implement a for-loop or use the .forEach routine.
// Hint2: `process.env` is an object, if you don't know how to access its 
// field, read here: https://javascript.info/object


// Solution 1. forEach.
variablesToCheck.forEach(v => {
    if (!process.env[v]) {
        console.log(process.env[v])
        console.log(`Missing ${v}, fix your .env file`);
    }
});

// Solution 2. For-loop.
for (let index = 0; index < variablesToCheck.length; index++) {
    const v = variablesToCheck[index];
    if (!process.env[v]) {
        console.log(process.env[v])
        console.log(`Missing ${v}, fix your .env file`);
    }
}

// Checkpoint. Is !process.env[v] equivalent to process.env[v] === "" ?

// exit();

