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


// Loading addresses from file saved from deploy script.
const [ v1Address, v2Address, v3Address, proxyAddress ] = 
    require(path.join(__dirname, '.addresses_proxy.json'));


// Exercise 1. Guess the number with logic V1.
//////////////////////////////////////////////

// a. Send Ether to the _Test_ contract. 

// Notice that the Test contract has no fallback, no receive, no
// payable function...will it accept your Ether?

const guess = async(num = 100) => {
    
    console.log('***Guessing the number...');

    const proxyContract = await getContract(signer, "Proxy", proxyAddress);
    
    // Making a static call.
    let res = await proxyContract.callStatic.guessNumber(num);

    res = res ? ' ' : ' not ';

    console.log('***The guess ' + num + ' was' + res + 'correct.');
};

console.log("Guess should not be correct");
guess(1000);

console.log("Guess should be correct");
guess(100);

console.log("Wrong guess should be correct due to incorrect contract in V1");
guess(99);

const upgrade = async(address) => {
    
    console.log('***Upgrading logic...');

    const proxyContract = await getContract(signer, "Proxy", proxyAddress);
    
    // Making a static call.
    // let res = await proxyContract.callStatic.upgrade(address);


    let tx = await proxyContract.upgrade(address);

    await tx.wait();

    console.log('***Upgraded to: ', address);
};

const upgradeAndGuess = async(address) => {

    const proxyContract = await getContract(signer, "Proxy", proxyAddress);

    await upgrade(address);

    console.log('Guess should be correct in V2');
    await guess(100);

    console.log('Guess should be _not_ correct in V2');
    await guess(99);

};

// upgradeAndGuess(v2Address);


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
