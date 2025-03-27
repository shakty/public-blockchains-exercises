// Loading path module for operations with file paths.
const path = require('path');

// Ethers JS: Signers: Gas and Transactions.
////////////////////////////////////////////


// These are bonus exercises!

// Exercise 1. Meddling with Gas.
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