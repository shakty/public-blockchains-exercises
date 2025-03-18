// Loading path module for operations with file paths.
const path = require('path');

// Ethers JS: Signers: Nonce, resubmit, cancel.
///////////////////////////////////////////////

// These are bonus exercises!

// Exercise 0. Load dependencies and network provider.
//////////////////////////////////////////////////////

// a. Require the `dotenv` and `ethers` packages.
// Hint: As you did in file 1_wallet and 2_provider.

require('dotenv').config()
const ethers = require('ethers')

// b. Create a Sepolia provider.
const providerKey = process.env.ALCHEMY_KEY;
const sepoliaUrl = `${process.env.ALCHEMY_SEPOLIA_API_URL}${providerKey}`;
const sepoliaProvider = new ethers.JsonRpcProvider(sepoliaUrl);

const mainKey = process.env.METAMASK_1_PRIVATE_KEY
const mainAddress = process.env.METAMASK_1_ADDRESS
const secondAddress = process.env.METAMASK_2_ADDRESS

const sepoliaSigner = new ethers.Wallet(mainKey, sepoliaProvider)

// Exercise 1. Resubmitting a transaction.
//////////////////////////////////////////

// Let's get a transaction pending in the mempool for a long time. It is 
// quite difficult to do it with Ethers.JS because it prevents to send
// transactions with too low maxFeePerGas. You could try setting a ver low
// `maxPriorityFeePerGas` but some miner might pick up your transaction 
// nonetheless (btw the bare minimum you should tip the miner is 1 wei, 
// but around 2 gwei is usually considered a safe choice).

// So let's submit a transaction with Metamask, setting a very low
// `maxFeePerGas`. As you do it, note the nonce for this transaction 
// (you may also get the nonce programmatically or from Etherscan).

// a. Check that the Metamask transaction is pending. Wait a bit...

// b. Now speed up that transaction. Send another transaction with the _same_ 
// nonce, but with a more reasonable `maxFeePerGas`. Check that the transaction
// goes through.

// Hint: if you don't know the nonce, `getNonce` will tell you the _next_ one.
// Hint2: if there is a transaction in the mempool, `getNonce` will give 
// give the current nonce (same as transaction in the mempool). Try "pending"
// as input paramter if you need the _next_ one. 
// Hint3: if you don't know what a reasonable `maxFeePerGas` is, you can 
// get an idea calling `getFeeData()`.

const informAboutFees = async () => {
  const feeData = await sepoliaProvider.getFeeData()
  console.log(feeData)
}

// informAboutFees()

const resubmitTransaction = async () => {
  const feeData = await sepoliaProvider.getFeeData()

  const nonce = await sepoliaSigner.getNonce()

  const request = {
    to: secondAddress,
    value: ethers.parseEther('0.0000001'),
    maxFeePerGas: 2n*feeData.maxFeePerGas,
    nonce: nonce,
    maxPriorityFeePerGas: 2n*feeData.maxPriorityFeePerGas
  }

  console.log(request)
  const tx = await sepoliaSigner.sendTransaction(request)
  console.log('transaction in mempool')
  const receipt = await tx.wait()
  console.log('transaction mined')
  console.log('actual fees paid: ' + ethers.formatUnits(receipt.fee))
};

// resubmitTransaction();


// c. Bonus. Repeat a+c., but this time cancel the transaction. How? Send a
// transaction with the same nonce with zero value and recipient address
// equal to sender address.

const cancelTransaction = async () => {
  const feeData = await sepoliaProvider.getFeeData()
  const nonce = await sepoliaSigner.getNonce()

  const request = {
    to: mainAddress,
    value: ethers.parseEther('0.0'),
    nonce: nonce,
    maxFeePerGas: 3n*feeData.maxFeePerGas,
    maxPriorityFeePerGas: 3n*feeData.maxPriorityFeePerGas
  }

  const tx = await sepoliaSigner.sendTransaction(request)
  console.log('transaction in mempool')
  const receipt = await tx.wait()
  console.log('transaction mined')
};

cancelTransaction();