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
// Hint: never created a function in JS? Check this page:
// https://javascript.info/function-basics

let exercise = 0;

// Your code here!


function exit() {
  console.log("Process stops here, Exercise " + exercise);
  process.exit(0);
}

//exit();

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

console.log("Exercise ", exercise)

require("dotenv").config(); 
const myvar = process.env.METAMASK_1_ADDRESS;
console.log(myvar + " this is working");

//exit();

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
console.log("Exercise ", exercise)
console.log("process env is: ", process.env.METAMASK_2_ADDRESS);

// exit();

// Exercise 3. Check the content of the .env file.
//////////////////////////////////////////////////

// In JavaScript variables are loosely typed.
exercise = "3a";

// Let's learn a bit of JavaScript syntax.

// a. Check that the variable METAMASK_ACCOUNT_1 is not empty. Write an
// if statement that print a warning message if empty.
// Hint: https://javascript.info/ifelse

// Your code here!
console.log("Exercise ", exercise)

require("dotenv").config();
function check() {
  const metapk = process.env.METAMASK_2_PRIVATE_KEY;
  const metaadd = process.env.METAMASK_2_ADDRESS;
  if (metapk === "") {
    console.log("Metamask Private Key is empty! ISI WOY!");
  }
  if (metaadd === "") {
    console.log("Metamask Address is empty! ISI WOY!");
  } else {
    console.log("Mantap lengkap 👍");
  }
}
check();

// exit();

// b. Create an array with all the names of the variables written in the .env
// file. Then print the lenght of the array.
// Hint: https://javascript.info/array

exercise = "3b";
console.log("Exercise ", exercise)

// Your code here!
let arrenv = [
  "INFURA_KEY",
  "INFURA_GOERLI_API_URL",
  "INFURA_MAINNET_API_URL",
  "ALCHEMY_KEY",
  "ALCHEMY_GOERLI_API_URL",
  "ALCHEMY_MAINNET_API_URL",
  "METAMASK_1_ADDRESS",
  "METAMASK_1_PRIVATE_KEY",
  "METAMASK_2_ADDRESS",
  "METAMASK_2_PRIVATE_KEY",
  "ETHERSCAN_KEY",
];
console.log("Variables length in .env = " + arrenv.length);

if (process.env.METAMASK_ACCOUNT_1 != "") {
  console.log("Variable is not Missing!");
}

// exit();

// c. Loop through all the elements of the array and check that the variable
// is set and non-empty under `process.env`.

// Hint1: You can implement a for-loop or use the .forEach routine.
// Hint2: `process.env` is an object, if you don't know how to access its
// field, read here: https://javascript.info/object

// Solution 1. forEach.
console.log("forEach")

require("dotenv").config();
arrenv.forEach((val) => {
  if (!process.env[val]) {
    console.log(`${val} is missing!`);
  }
});

// Solution 2. For-loop.
// Your code here!
console.log("forLoop")
for (let i = 0; i < arrenv.length; i++) {
  const val = arrenv[i];
  if (process.env[val] === "") {
    console.log(process.env[val]);
    console.log(`${val} is missing!`);
  }
}

// exit();

// Exercise 4. Create a Random Wallet.
//////////////////////////////////////
exercise = "4a";
console.log("Exercise ", exercise)

const ethers = require("ethers");

// a. Create a random wallet and print the address, the private key,
// and the mnenomic phrase.
// Hint: ethers.Wallet.createRandom();

const Wallet = ethers.Wallet.createRandom();
console.log("Address : ",  Wallet.address);
console.log("Private Key : ", Wallet.privateKey);
console.log("Mnemonic : ", Wallet.mnemonic.phrase);

// exit();

// b. Bonus. Print the derivation path of the wallet and check that it is
// equal to `baseDevPath`.

exercise = "4b";
console.log("Exercise ", exercise)

let baseDevPath = "m/44'/60'/0'/0/";
console.log 

// Wait is the derivation path?
// Basically, the mnemonic alone isn't enough to determine an address
// and you need this extra bit of information. You may learn more here:
// https://www.youtube.com/watch?v=tPCN3nDVzZI
// Also:
// https://vault12.com/securemycrypto/crypto-security-basics/what-is-bip39/

console.log("Derivation path:", Wallet.path);

// Your code here!

// exit();

// Exercise 5. Bonus. Create a Hierarchical Deterministic Wallet.
/////////////////////////////////////////////////////////////////
console.log();
exercise = 5;
console.log("Exercise ", exercise)


// From the same wallet, you can derive a deterministic sequence of addresses.
// First, pick a mnemonic, then create a hierarchical deterministic wallet,
// finally print the first 10 addresses and private keys generated.
// Hint: You need to append an index to the derivation path.

// Your code here!
let mnemonic = Wallet.mnemonic.phrase;

let path, CWallet;
for (let i = 0; i < 10; i++) {
    path = `${baseDevPath}${i}`
    CWallet = ethers.HDNodeWallet.fromPhrase (mnemonic,path);
    console.log("Address", i, CWallet.address);
    console.log("Private Key", i, CWallet.privateKey);
}

 exit();
