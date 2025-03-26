// Ethers JS: First interaction with (not) UniMa blockchain.
////////////////////////////////////////////////////////////

// Exercise 0. Load dependencies and network provider.
//////////////////////////////////////////////////////

// a. Require the `dotenv` and `ethers` packages.
// Hint: As you did multiple times now.

const ethers = require('ethers')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env')
})


// Exercise 1. Create a JSON RPC Provider for the (not) UniMa Blockchain.
/////////////////////////////////////////////////////////////////////////

// It seems we cannot (yet) call our blockchain the official Uni Mannheim
// blockchain, so we will reference it throughtout the exercises as the
// (not) UniMa Blockchain.

// a. Add the RPC endpoints to the .env with names:
// - NOT_UNIMA_URL_1
// - NOT_UNIMA_URL_2

// Hint: you find the RPC endpoints on the slides in ILIAS.

// b. Create the JSON RPC provider object.
// Hint: only accessible within UniMa network.
const unimaURL1 = process.env.NOT_UNIMA_URL_1

const unimaProvider1 = new ethers.JsonRpcProvider(unimaURL1)

// Exercise 2. Let's query the provider.
////////////////////////////////////////

// (not) UniMa Blockchain si too long. Let's call it NUMA.
// Print to console the network name, chain id, and block number of NUMA.

const networkInfo = async () => {
  const nw = await unimaProvider1.getNetwork()
  console.log(nw.name)
  console.log(nw.chainId)
  console.log(await unimaProvider1.getBlockNumber())
};

// networkInfo();


// Exercise 3. Connect a signer to the (not) UniMa blockchain.
//////////////////////////////////////////////////////////////

// a. Use the same non-sensitive private key used in 3_signer.js.

const mainKey = process.env.METAMASK_1_PRIVATE_KEY
const mainAddress = process.env.METAMASK_1_ADDRESS
const signer = new ethers.Wallet(mainKey, unimaProvider1)

// b. Print the next nonce necessary to send a transaction.
// Hint: .getNonce()

const getNonce = async() => {
    console.log(await signer.getNonce())
};

// getNonce();

// Checkpoint. Is the nonce in the (not) Unima blockchain different
// than in Sepolia? Yes.


// Exercise 4. Check gas.
/////////////////////////

// a. Let's get some gas from the faucet. What is the faucet's address? 
// Check the slides in ILIAS.
// Hint: only accessible within UniMa network.

// b. Check your balance on UniMa network.

const checkBalance = async () => {
  console.log(ethers.formatEther(await unimaProvider1.getBalance(mainAddress)), 'UMETH')
};

// checkBalance();

// Exercise 5. Send a transaction.
//////////////////////////////////

// Send some Ether from one of your accounts to another one on NUMA.

const account2 = process.env.METAMASK_2_ADDRESS;

const sendTransaction = async () => {
  const request = {
    to: account2,
    value: ethers.parseEther("0.0001")
  }

  const tx = await signer.sendTransaction(request)
  console.log('transaction in mempool')
  await tx.wait()
  console.log('transaction mined')
};

sendTransaction();

// Checkpoint. Can you send your ETH from NUMA to Sepolia?
// No.
