// Hardhat: First interaction with Hardhat blockchain.
//////////////////////////////////////////////////////

// Exercise 0. Load dependencies and network provider.
//////////////////////////////////////////////////////

// a. Require the `dotenv` and `ethers` packages.
// Hint: As you did multiple times now.

// For execution with Code Runner.
// Adapt the path accordingly.
require('dotenv').config();

// console.log(process.env);

const ethers = require("ethers");


// Exercise 1. Create a JSON RPC Provider for the Hardhat blockchain.
/////////////////////////////////////////////////////////////////////

// Hint: you will find the info printed to console after you start the hardhat
// blockchain.

const hardhatUrl = "http://127.0.0.1:8545";
const hardhatProvider = new ethers.JsonRpcProvider(hardhatUrl);

// Exercise 2. Let's query the provider.
////////////////////////////////////////

// Hardhat Blockchain si too long. Let's call it NUMA.
// Print to console the network name, chain id, and block number of NUMA.

const networkInfo = async () => {
    let net = await hardhatProvider.getNetwork();
    console.log('HH Info:');
    console.log('Network name: ', net.name);
    console.log('Network chain id: ', Number(net.chainId));

    let blockNumber = await hardhatProvider.getBlockNumber();
    console.log('Block number: ', blockNumber);
};

// networkInfo();


// Exercise 3. Signer on the Hardhat blockchain.
////////////////////////////////////////////////

// a. Connect one a signer with one of the default private keys on
// the Hardhat blockchain.
// Hint: check the Hardhat console output.

let hhPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const signer = new ethers.Wallet(hhPrivateKey, hardhatProvider);

// b. Check the balance of the signer.

const checkBalance = async () => {
    let balance = await hardhatProvider.getBalance(signer.address);
    console.log('My balance is ' + ethers.formatEther(balance) + ' ETH.');
};

// checkBalance();

// c. Print the signer's next nonce necessary to send a transaction.
// Hint: .getNonce()

const getNonce = async() => {
    let nonce = await signer.getNonce();
    console.log('The nonce is ' + nonce);
};

// getNonce();


// Exercise 4. Send a transaction.
//////////////////////////////////

// Send some Ether from the address of the signer in Exercise 3 to one of your
// accounts on Metamask (e.g., the one used to make the submissions in 
// this course).

const account2 = process.env.METAMASK_2_ADDRESS;

const sendTransaction = async () => {

    const hardhatSigner = signer;

    // console.log(hardhatSigner.address, account2)

    let b1 = await hardhatProvider.getBalance(hardhatSigner.address);
    let b2 = await hardhatProvider.getBalance(account2);
    b1 = ethers.formatEther(b1);
    b2 = ethers.formatEther(b2);
    

    tx = await hardhatSigner.sendTransaction({
        to: account2,
        value: ethers.parseEther("0.01")
    });

    // console.log(tx);
    
    console.log('Transaction is in the mempool...');
    await tx.wait();

    console.log('Transaction mined!');

    let updatedB1 = await hardhatProvider.getBalance(signer.address);
    let updatedB2 = await hardhatProvider.getBalance(account2);
    updatedB1 = ethers.formatEther(updatedB1);
    updatedB2 = ethers.formatEther(updatedB2);

    console.log('Balance for', signer.address, 'changed from', b1, 'to', updatedB1);
    console.log('Balance for', account2, 'changed from', b2, 'to', updatedB2);
};

// sendTransaction();

