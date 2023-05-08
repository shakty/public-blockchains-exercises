require("dotenv").config();
const { BigNumber, ethers } = require("ethers");
console.log(ethers.version);

const path = require('path');

// Contract names.
const senderName = "Sender";
const receiverName = "Receiver";
const testName = "TestContract";

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

// Loading addresses from file saved from deploy script.
const [ testAddress, senderAddress, receiverAddress ] = 
    require(path.join(__dirname, '.addresses.json'));


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

const checkBalances = async() => {
    let balanceEther = await provider.getBalance(senderAddress);
    console.log("  Sender Ether:", ethers.utils.formatEther(balanceEther));
    
    balanceEther = await provider.getBalance(receiverAddress);
    console.log("Receiver Ether:", ethers.utils.formatEther(balanceEther));

    balanceEther = await provider.getBalance(testAddress);
    console.log("    Test Ether:", ethers.utils.formatEther(balanceEther));

    balanceEther = await provider.getBalance(signer.address);
    console.log("  Signer Ether:", ethers.utils.formatEther(balanceEther));

};

const send = async(to, amount = 1, data) => {
    
    console.log('***Before:');
    await checkBalances();

    const tx = await signer.sendTransaction({
        to: to,
        value: ethers.utils.parseEther('' + amount),
        data: data
    });

    await waitForTx(tx);

    console.log('***After:');
    await checkBalances();
};

// Send to Test Contract.
// It has no payable method, no fallback.
// console.log('Sending to Test');
// send(testAddress);

// Send to Receiver Contract.
// It has receiver and fallback methods.
// console.log('Sending to Receiver: no msg.data');
// send(receiverAddress);

// Send to Receiver Contract.
// It has receiver and fallback methods.
// console.log('Sending to Receiver: msg.data not empty');
// let encodedSignature = "0xd826f88f";
// send(receiverAddress, 1, encodedSignature);




// Helper function.

const waitForTx = async (tx, verbose) => {
    console.log("\n- Transaction in mempool:");
    if (verbose) console.log(tx);
    else console.log(tx.nonce, tx.hash);
    await tx.wait();
    console.log("Transaction mined!\n");
};
