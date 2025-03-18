// Loading path module for operations with file paths.
const path = require('path');

// See: https://docs.ethers.org/v6/getting-started/

// Load dependencies and network provider.
//////////////////////////////////////////

// a. Require the `dotenv` and `ethers` packages.
// Hint: As you did in file 1_wallet and 2_provider.

require('dotenv').config();
const ethers = require("ethers");
console.log(ethers.version);

// b. Create a Sepolia provider.

const providerKey = process.env.ALCHEMY_KEY;

const sepoliaUrl = `${process.env.ALCHEMY_SEPOLIA_API_URL}${providerKey}`;
// console.log(sepoliaUrl);
const sepoliaProvider = new ethers.JsonRpcProvider(sepoliaUrl);

// c. Create signer (with a provider attached).

// Important! Do not use the private key of an account where actual money
// is held. Use only a test account. 

let signer = new ethers.Wallet(process.env.METAMASK_1_PRIVATE_KEY, sepoliaProvider);
console.log(signer.address);


// Set account 2 for receiving ETH.
const account2 = process.env.METAMASK_2_ADDRESS;

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

const resubmitTransaction = async () => {

     // If there is a transaction in the mempool, it returns the same nonce,
    // otherwise the _next_ one.
    let nonce = await signer.getNonce();
    // Equivalent to:
    // let nonce = await sepoliaProvider.getTransactionCount(signer.address);

    // Note: the line below will return the _next_ nonce when there is
    // already a transaction in the mempool.
    // let nextNonce = await signer.getNonce("pending");

    console.log('Nonce is:', nonce);

    const feeData = await sepoliaProvider.getFeeData();
    
    tx = await signer.sendTransaction({
        to: account2,
        value: ethers.parseEther("0.001"),
        maxFeePerGas: 2n*feeData.maxFeePerGas,
        maxPriorityFeePerGas: 2n*feeData.maxPriorityFeePerGas,
        nonce: nonce
    });
    console.log(tx);
    
    console.log('Transaction is in the mempool...');
    let receipt = await tx.wait();
    console.log(receipt);
    console.log('Transaction mined!');

};

// resubmitTransaction();


// c. Bonus. Repeat a+c., but this time cancel the transaction. How? Send a
// transaction with the same nonce with zero value and recipient address
// equal to sender address.

const cancelTransaction = async () => {

   // If there is a transaction in the mempool, it returns the
   // same nonce, otherwise the _next_ one.
   let nonce = await signer.getNonce();

   console.log('Nonce is:', nonce);

   const feeData = await sepoliaProvider.getFeeData();
   
   tx = await signer.sendTransaction({
       to: signer.address,
       value: ethers.parseEther("0.0"),
       maxFeePerGas: 2n*feeData.maxFeePerGas,
       maxPriorityFeePerGas: 2n*feeData.maxPriorityFeePerGas,
       nonce: nonce
   });
   console.log(tx);
   
   console.log('Transaction is in the mempool...');
   let receipt = await tx.wait();
   console.log(receipt);
   console.log('Transaction mined!');

};

// cancelTransaction();
