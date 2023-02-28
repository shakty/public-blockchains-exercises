// Ethers JS: Signers.
//////////////////////

// A Signer wraps all operations that interact with an account. An account
// generally has a private key located somewhere, which can be used to sign a
// variety of types of payloads.

// The private key may be located in memory (using a Wallet) or protected via
// some IPC layer, such as MetaMask which proxies interaction from a website to
// a browser plug-in, which keeps the private key out of the reach of the 
// website and only permits interaction after requesting permission from the
// user and receiving authorization.

// See: https://docs.ethers.org/v6/getting-started/

// Exercise 0. Load dependencies and network provider.
//////////////////////////////////////////////////////

// a. Require the `dotenv` and `ethers` packages.
// Hint: As you did in file 1_wallet and 2_provider.

// Your code here!

// b. Create a Goerli provider.

// Your code here!

// Exercise 1. Create a Signer.
///////////////////////////////

// Important! Do not use the private key of an account where actual money
// is held. Use only a test account. 

// Create with the Metamask private key saved in your .env file. No need to 
// connect to provider now.

// Verify that the address matches your Metamask address.

// Hint: a signer is a wallet.
// Hint2: if you get an error here, check that the private key begins with "0x".

// Your code here!

// Exercise 2. Sign something.
//////////////////////////////

const sign = async (message = 'Hello world') => {
    
    // Your code here!
};

// sign();

// Exercise 3. Connect to the blockchain. 
/////////////////////////////////////////

// a. Connect the signer to the Goerli network.
// Hint: .connect()

// b. Print the next nonce necessary to send a transaction.
// Hint: .getNonce()

const connect = async() => {
    
    // Your code here!
};

// connect();

// c. Replace the signer created above at exercise 1 with one that takes the 
// Goerli provider as second parameter. This is necessary even
// if you connected inside the function connect() because there might be
// some issues with the asynchronicity of when the connection is established
// and the remaning of the exercises. If unclear, just check the solution :)

// Replace the signer created above.



// Exercise 4. Send a transaction.
//////////////////////////////////

// The time has come to send a transaction programmatically! 

// a. Send some Ether from one of your accounts to another one using the
// method `sendTransaction()`. Obtain the transaction id and check on Etherscan
// when the transaction get mined.
// Hint: `sendTransaction()` returns an object with info about the transaction.
// Hint2: The `value` field is specified in XX. You could use the utility
// function `parseEther()` to format the number accordingly.

// b. Instead of looking on Etherscan, wait for the transaction to be mined,
// then compare the balance of both addresses before and after.
// Hint: `sendTransaction()` returns an object with a `wait()` method.
// Hint2: `formatEther()` can print a nicer balance.

const account2 = process.env.METAMASK_2_ADDRESS;

const sendTransaction = async () => {

    // Your code here!
};

// sendTransaction();


// Exercise 5. Meddling with Gas.
/////////////////////////////////

// Let's play around with the gas parameters to try to get into a block
// a bit cheaper.

// First we need to understand how gas works in Ethereum. 

// Begin long intro.

// A big update happened with EIP-1559, which completely re-designed how
// gas fees are computed and used.

// Here is an intro focusing on before and after EIP-1559:
// https://www.alchemy.com//blog/eip-1559

// Here is an intro focusing on how it works after EIP-1559:
// https://www.blocknative.com/blog/eip-1559-fees

// In a nutshell, before EIP-1559, one had to specify two values:
// - gasLimit: how much gas the transaction would consume (more or less)
// - gasPrice: how much you are willing to pay for the gas.

// This auction system was highly inefficient and volatile.

// The system was replaced by a mechanism in which, there is:

// - gasLimit: as before;
// - baseFee: cost per gas unit decided automatically based on the level 
//            of congestion in the previous block;
// - priorityFee: extra tip for the miners.

// From the perspective of the developer (or the Metamask user), one has to 
// specify either (or both for finer control):

// gasLimit: how much gas the transaction would consume (more or less)
// maxFeePerGas: Max total amount willing to pay (base fee + tip)
// maxPriorityFeePerGas: Amount of tip for miner.

// End long intro.

// Now let's test whether you understood how gas is used in Ethereum.

// a. Make a Ether transaction between your accounts. Even better, pretend
// to make it. How? Use `populateTransaction()` to auto-fill the gas settings,
// _as if_ you would send a transaction. Review the default gas values chosen
// by Ethers JS at that point in time and compare these values with what
//  you get as a suggestion by Metamask and by https://ethgasstation.info.
// Hint: `formatUnits` will provide a nicer printout of values in gwei/wei.

// b. Now call `getFeeData()` method and check what the suggested values are.
// Are they the same as those you get from `populateTransaction()`?


// c. Now let's get the base fee (`baseFeePerGas`) from the previous block. 
// You have now all the elements to understand how Ethers.JS chooses the 
// default value for `maxFeePerGas`.
// Hint: `getBlock("latest")` will give you the latest block.
// Hint: the simple math is also explained in one of the links above.

// a, b, c. 
const checkGasPrices = async () => {

    // Your code here!

};

// checkGasPrices();

// d. Now that you understand everything, send a new transaction that is just
// a little cheaper in terms of gas, compared to defaults.
// Get the suggested from `maxFeePerGas` from `getFeeData()` and then shave a
// few gweis.
// Hint: `maxFeePerGas` is expressed in wei, and the value you get from 
// `getFeeData()` is of type BigInt. To work with BigInt simply add n after
// a normal integer number.
// Hint2: Do you need a converter? https://eth-converter.com/

// e. Check the actual fee paid on Etherscan or in the transaction receipt: 
// is it lower than your max fee?


// d. e.
const sendCheaperTransaction = async () => {

    // Your code here!

};

// sendCheaperTransaction();



// Exercise 6. Resubmitting a transaction.
//////////////////////////////////////////

// Let's get a transaction pending in the mempool for a long time. It is 
// quite difficult to do it with Ethers.JS because it prevents to send
// transactions with too low maxFeePerGas. You could try setting a ver low
// `maxPriorityFeePerGas` but some miner might pick up your transaction 
// nonetheless (btw the bare minimum you should tip the miner is 1 wei, 
// but around 2 gwei is usually considered a safe choice).

// Let's use Metamask. Make sure you have the right options enabled: go to Settings/Advanced and tick 
// "Advanced gas controls" and "Customize transaction nonce".

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

    // Your Code here!

};

resubmitTransaction();


// c. Bonus. Repeat a+c., but this time cancel the transaction. How? Send a
// transaction with the same nonce with zero value and recipient address
// equal to sender address.

const cancelTransaction = async () => {

    // Your Code here!
};

cancelTransaction();