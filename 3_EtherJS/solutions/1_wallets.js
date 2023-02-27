// Welcome to the first exercises of the course about Public Blockchains!

// EthersJS: Wallets.
////////////////////

// Note 1: Some knowledge of computer programming is expected!

// Note 2: It is also expected that you "help yourself" by looking up for
// the right command and syntax in one of these helpful sites:

// JavaScript Generals:

// - https://javascript.info
// - https://www.w3schools.com/nodejs/
// - https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/

// Ethers JS:

// -  https://docs.ethers.org/v6/

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
// process.exit(0);
// console.log('I am sad line...I will not be printed to console :(');

// a. Move the sad line above and below `process.exit(0);` to check that the
// process stops where it is intended to. When you are done, comment out both
// lines and move to the next exercise.

// b. Create a function called "exit" that wraps the call to `process.exit` and
// prints out the exercise number from a global variable called `exercise`.

// Hint: German keyboard curly brackets: Alt-gr-7 (open), Alt-gr-8 (close).

let exercise = 0;

function exit() {
    console.log('Exercise ' + exercise + ' completed.');
    process.exit(0);
    console.log('I will not be printed to console :(');
}

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

// Function expression.
const exit3 = function() {
    console.log('Exercise ' + exercise + ' completed.');
    process.exit(0);
    console.log('I will not be printed to console :(');
};

// Arrow-function equivalent.
const exit2 = () => {
    console.log('Exercise ' + exercise + ' completed.');
    process.exit(0);
    console.log('I will not be printed to console :(');
};


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

// Exercise 2. Create .env file.
////////////////////////////////
exercise = 2;

// You should have created an account at Etherscan, Infura, and Alchemy. 
// You should also have already own an Ethereum address (e.g., on Metamask).

// You now need a special place to store all these credentials safely.
// This place is inside .env file. What is an .env file? It is a safe place
// where to store your credentials, but also non-sensitive information that
// need to be shared in different parts of your application. 

// The dotenv package you required in the previous exercise will load
// the content of .env and make it available at runtime under `process.env`. 

// Create a .env file with the necessary information.
// Hint: you can copy .env_sample, modify its content and save it as .env.
 
// See if it worked.
console.log(process.env);

// exit();

// Exercise 3. Check the content of the .env file.
//////////////////////////////////////////////////

// In JavaScript variables are loosely typed.
exercise = '3a';

// Let's learn a bit of JavaScript syntax. 

// a. Check that the variable METAMASK_ACCOUNT_1 is not empty. Write an 
// if statement that print a warning message if empty.
console.log(process.env.METAMASK_ACCOUNT_1);

let privateKey = process.env.METAMASK_PRIVATE_KEY;
if (privateKey === "") {
    console.log('Missing private key, fix your .env file');
}

// exit();

// b. Create an array with all the names of the variables written in the .env
// file. Then print the lenght of the array.

exercise = '3b';

let variablesToCheck = [
    "INFURA_KEY", "INFURA_GOERLI", "INFURA_MAINNET",
    "ALCHEMY_KEY", "ALCHEMY_GOERLI", "ALCHEMY_MAINNET",
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


// Exercise 4. Create a Random Wallet.
//////////////////////////////////////
exercise = '4a';

const ethers = require("ethers");

// a. Create a random wallet and print the address, the private key,
// and the mnenomic phrase.

const wallet = ethers.Wallet.createRandom();

console.log();
console.log("Address:", wallet.address);
console.log("Private key:", wallet.privateKey);
console.log("Mnemonic:", wallet.mnemonic.phrase);
console.log();

// exit();

// b. Bonus. Print the derivation path of the wallet and check that it is
// equal to `baseDevPath`. 

exercise = '4b';

let baseDevPath = "m/44'/60'/0'/0/";

// Wait is the derication path? 
// Basically, the mnemonic alone isn't enough to determine an address
// and you need this extra bit of information. You may learn more here:
// https://www.youtube.com/watch?v=tPCN3nDVzZI
// Also:
// https://vault12.com/securemycrypto/crypto-security-basics/what-is-bip39/


console.log("Derivation path:", wallet.path);

// exit();

// Exercise 5. Bonus. Create a Hierarchical Deterministic Wallet.
/////////////////////////////////////////////////////////////////
console.log();
exercise = 5;

// From the same wallet, you can derive a deterministic sequence of addresses.
// First, pick a mnemonic, then create a hierarchical deterministic wallet, 
// finally print the first 10 addresses and private keys generated.
// Hint: You need to append an index to the derivation path.

let mnemonic = wallet.mnemonic.phrase;

let path, myWallet;
for (let i = 0; i < 10; i++) {
  path = `${baseDevPath}${i}`;
  myWallet = ethers.HDNodeWallet.fromPhrase(mnemonic, path);
  console.log("Address", i, myWallet.address);
  console.log("Private key", i, myWallet.privateKey);
}

exit();