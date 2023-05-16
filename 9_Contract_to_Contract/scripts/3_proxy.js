require("dotenv").config();
const { BigNumber, ethers } = require("ethers");
console.log(ethers.version);

const path = require('path');

// Localhost (Hardhat private keys--do not use in production).
const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
);
let signer = new ethers.Wallet(
    "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
    provider
);
let deployer = new ethers.Wallet(
    "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
    provider
);

console.log("Signer 1: ", signer.address);
console.log("Signer 2: ", deployer.address);


const getContract = async (signer, cName, address) => {
    // Fetch the ABI from the artifacts.
    const abi = require("../artifacts/contracts/" +
        cName +
        ".sol/" +
        cName +
        ".json").abi;

    // Create the contract and print the address.
    return new ethers.Contract(address, abi, signer);
};

// Contract addresses.
//////////////////////

// Loading addresses from file saved from deploy script.
const [ v1Address, v2Address, v3Address, proxyAddress ] = 
    require(path.join(__dirname, '.addresses_proxy.json'));


// Proxy contracts are contracts that forward the execution of some of its
// method to another contract, which is used as a library. Here we work with
// contract files `Proxy.sol` and `LogicV[1,2,3].sol` to understand how 
// this can be done. 

// Exercise 0. Decode the return value of a delegated call.
/////////////////////////////////////////////////////////////

// The contract `Proxy.sol` has a method name `guessNumber(...)`. This
// method should return true if the caller guessed the secret number,
// false otherwise. However, the method is incomplete as it needs to parse
// the encoded value returned by the delegated call. Decode it, and return it.
// Hint: abi.decode(...)


// Exercise 1. Make a static call to guess the number with logic V1.
////////////////////////////////////////////////////////////////////

// In Web3 you can read a value, but you can get the return value of a 
// a function, unless you make a static call. A static call is executed 
// directly on a node and does not update the blockchain state, so 
// a value can immediately be returned.

// Check the code below, and notice how:
// - the first operation returns a value,
// - the second operation returns a transaction receipt.

// Update the code below to make a static call and return a boolean from
// the second transaction.
// Hint: .callStatic.<methodName>

const guess = async(num = 100) => {
    
    console.log('  ***Guessing the number...');

    const proxyContract = await getContract(signer, "Proxy", proxyAddress);
    
    // Operation 1: read.
    let version = await proxyContract.version();
    console.log('  Contract version: v' + Number(version));

    // Operation 2: execute a function.
    // let res = await proxyContract.guessNumber(num);
    // Making a static call.
    let res = await proxyContract.callStatic.guessNumber(num);

    // The variable res is a transaction, so the logic below does not work
    // because it expects a boolean.
    // console.log(res);
    res = res ? ' ' : ' not ';
    console.log('  ***The guess ' + num + ' was' + res + 'correct.');
    
};

// guess(1000);

// Exercise 2. Upgrade the contract to V2.
//////////////////////////////////////////

// You might have noticed that Logic V1 is buggy: it adds one to the guess
// before comparing it with the secret number. Logic V2 fixes this.

// a. Check that the wrong return values are returned in V1.
// 

const checkGuesses = async() => {
    console.log("Guess should not be correct");
    await guess(1000);

    console.log("Guess should be correct in V2, not in V1");
    await guess(100);

    console.log("Guess should be correct in V1, not in V2");
    await guess(99);
};

// checkGuesses();

// b. Now upgrade to Logic V2 and check that return values are correct.

const upgrade = async(address) => {
    
    console.log('***Upgrading logic...');

    const proxyContract = await getContract(signer, "Proxy", proxyAddress);

    let tx = await proxyContract.upgrade(address);

    await tx.wait();

    console.log('***Upgraded to: ', address);
};

const upgradeAndGuess = async(address) => {

    await upgrade(address);

    await checkGuesses();
};

// upgradeAndGuess(v2Address);

// Exercise 3. Learn about storage clashes.
///////////////////////////////////////////

// The proxy is making a delegate call to a logic which is executed with 
// the state of of the proxy. However, what really gets executed is the
// optimized bytecode on the blockchain. This optimization makes so that
// variable names are replaced with memory (storage) positions of 32bytes.

// This means that if the order (and size) of variable differs between proxy
// and implementation things can get weird. 

// Upgrade the proxy to Logic V3, which has altered the order in which the
// variables are declared in the Solidity file. Then check what happens when
// you execute the guess method...

// upgradeAndGuess(v3Address);


// Helper functions.
////////////////////


const waitForTx = async (tx, verbose) => {
    console.log("\n- Transaction in mempool:");
    if (verbose) console.log(tx);
    else console.log(tx.nonce, tx.hash);
    await tx.wait();
    console.log("Transaction mined!\n");
};
