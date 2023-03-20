// Ethers JS: First interaction with Hardhat blockchain.
////////////////////////////////////////////////////////////

// Exercise 0. Make sure you environment is set up.
///////////////////////////////////////////////////

// In 4_Hardhat_ex you have been asked to init a new Hardhat project with
// a Lock contract. You can reuse that project, or create a new one (with 
// the Lock contract).

// It is assumed that you could deploy the Lock contract to three networks:
// - Hardhat local network
// - Goerli
// - (not) Unima Blockchain

// Solidity By Example is a great resource to quickly pick up Solidity 
// development and to do some of the exercises below:

// https://solidity-by-example.org/

// Exercise 1. A First Look at Lock.
////////////////////////////////////

// Let's look again at the Lock contract.

// a. What is the meaning of the `pragma` directive at the top of the file?
// Hint: https://solidity-by-example.org/hello-world/

// b. The pragma value must be compatible with the version of solidity  
// in `hardhat.config.js. Try to set the value to a number lower than that
// and to compile the Lock file. What happens? 

// c. Bonus. What is the meaning of that caret symbol (^) ? 
// Hint: https://docs.soliditylang.org/en/develop/layout-of-source-files.html#version-pragma
// Hint2: https://bytearcher.com/articles/semver-explained-why-theres-a-caret-in-my-package-json/

// c. Before `pragma` there is something else in a comment, but it is actually
// important. What is it?
// Hint: https://docs.soliditylang.org/en/develop/layout-of-source-files.html#spdx-license-identifier

// d. The code of the contract Lock is introduced by the `contract` keyword 
// and wrapped in curly braces { ... }. Before `contract` you have the option 
// to `import` some code into the file.
// 
// In the Lock contract file, there is a comment to import a hardhat plugin to
// print text with `console.log` to the terminal where you launched
// the Hardhat blockchain. Two things to keep in mind:
//
// 1. imported code is deployed alongside your contract; 
// 2. console.log works only on the local Hardhat blockchain (i.e., not on
//    Goerli, Unima, etc.), so you should remove it before deployment.
//
// Uncomment the import, and add a few console.log to the Lock code (e.g., 
// in the constructor), then deploy it.
//
// Notice that a new folder named "hardhat" is created under "artifacts/".

// Exercise 2. Variables.
/////////////////////////

// Variables are containers for data of some "type." 

// a. In Solidity, you can find the main types here:

// https://solidity-by-example.org/primitives/

// 

// Variables in Solidity are slightly different than in other programming
// languages. All variables are "public," in the sense that a copy is stored
// in the memory of each computer running an Ethereum client. So even "private"
// variables are in fact 

// networkInfo();


// Exercise 3. Connect a signer to the Hardhat blockchain.
//////////////////////////////////////////////////////////

// Hint: you will find the info printed to console after you start the hardhat
// blockchain.

let hhPrivateKey = "FILL_THIS_VALUE";

// Your code here!

// b. Print the next nonce necessary to send a transaction.
// Hint: .getNonce()

const getNonce = async() => {

    // Your code here!
};

// getNonce();


// Exercise 4. Check gas.
/////////////////////////

// a. Let's get some gas from the faucet. What is the faucet's address? 
// Check the slides in ILIAS.
// Hint: only accessible within UniMa network.

// b. Check your balance on UniMa network.

const checkBalance = async () => {

    // Your code here!
};

// checkBalance();

// Exercise 5. Send a transaction.
//////////////////////////////////

// Send some Ether from one of your accounts to another one on NUMA.

const account2 = process.env.METAMASK_2_ADDRESS;

const sendTransaction = async () => {

    // Your code here!
};

// sendTransaction();

