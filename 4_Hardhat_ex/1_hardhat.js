// Hardhat: First interaction with Hardhat blockchain.
//////////////////////////////////////////////////////

// Exercise 0. Load dependencies and network provider.
//////////////////////////////////////////////////////

// a. Require the `dotenv` and `ethers` packages.
// Hint: As you did multiple times now.

// Your code here!
const ethers = require('ethers')
require('dotenv').config()

// Exercise 1. Create a JSON RPC Provider for the Hardhat blockchain.
/////////////////////////////////////////////////////////////////////

// Hint: you will find the info printed to console after you start the hardhat
// blockchain.

// Your code here!
const hardhatURL = 'http://127.0.0.1:8545/'
const jsonRpcProvider = new ethers.JsonRpcProvider(hardhatURL)

// Exercise 2. Let's query the provider.
////////////////////////////////////////

// Hardhat Blockchain si too long. Let's call it NUMA.
// Print to console the network name, chain id, and block number of NUMA.

const networkInfo = async () => {
  let netw = await jsonRpcProvider.getNetwork()
  console.log(`Network Name: ${netw.name}`)
  console.log(`Network Chain ID: ${netw.chainId}`)
  console.log(`Network Block Number: ${await jsonRpcProvider.getBlockNumber()}`)
};

// networkInfo();



// Exercise 3. Signer on the Hardhat blockchain.
////////////////////////////////////////////////

// a. Connect one a signer with one of the default private keys on
// the Hardhat blockchain.
// Hint: check the Hardhat console output.

// COMPROMISED PK AND ADDRESS DEFAULT OF HARDHAT
const defaultPk_0 = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const defaultAdd_0 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

let signer = new ethers.Wallet(defaultPk_0, jsonRpcProvider)

// b. Check the balance of the signer.

const checkBalance = async () => {
    let balance = await jsonRpcProvider.getBalance(defaultAdd_0)
    console.log(`Balance of signer: ${ethers.formatEther(balance)} ETH`)
};

// checkBalance();

// c. Print the signer's next nonce necessary to send a transaction.
// Hint: .getNonce()

const getNonce = async() => {
    let nonce = await signer.getNonce()
    console.log(`Next Transaction Nonce: ${nonce}`)
};

// getNonce();


// Exercise 4. Send a transaction.
//////////////////////////////////

// Send some Ether from the address of the signer in Exercise 3 to one of your
// accounts on Metamask (e.g., the one used to make the submissions in 
// this course).

const account2 = process.env.METAMASK_2_ADDRESS;

const sendTransaction = async () => {
  const request = {
    to: account2,
    value: ethers.parseEther('50')
  }
  const tx = await signer.sendTransaction(request)
  console.log('transaction in mempool')
  await tx.wait()
  console.log('transaction mined')
};

// sendTransaction();

