// Loading path module for operations with file paths.
const path = require('path');

// Ethers JS: Signers: Gas and Transactions.
////////////////////////////////////////////

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

// a, b, c. 
const checkGasPrices = async () => {


    setInterval(async () => {
        let tx = await signer.populateTransaction({
            to: account2,
            value: ethers.parseEther("0.01"),
        });
    
        console.log(tx);
    
        console.log('Gas Limit', tx.gasLimit);
        console.log('Max Fee per Gas (GWEI)', ethers.formatUnits(tx.maxFeePerGas, 'gwei'));
        console.log('Max Priority Fee (GWEI)', ethers.formatUnits(tx.maxPriorityFeePerGas, 'gwei'));

        console.log('---');
        const feeData = await sepoliaProvider.getFeeData();
        console.log(feeData)
    
        console.log('Legacy Gas Price (GWEI)', ethers.formatUnits(feeData.gasPrice, 'gwei'));
        console.log('Max Fee per Gas (GWEI)', ethers.formatUnits(feeData.maxFeePerGas, 'gwei'));
        console.log('Max Priority Fee (GWEI)', ethers.formatUnits(feeData.maxPriorityFeePerGas, 'gwei'));
        
        console.log('');
        const lastBlock = await sepoliaProvider.getBlock("latest");
        console.log('Base Fee Previous Block (GWEI)', ethers.formatUnits(lastBlock.baseFeePerGas, 'gwei'));

        // maxFeePerGas = (2 * baseFeePerGas) + maxPriorityFeePerGas
        console.log('');

    }, 6000);

};

// checkGasPrices();


// d. e.
const sendCheaperTransaction = async () => {


    const feeData = await sepoliaProvider.getFeeData();
    // console.log(feeData)

    console.log('Legacy Gas Price (GWEI)', ethers.formatUnits(feeData.gasPrice, 'gwei'));
    console.log('Max Fee per Gas (GWEI)', ethers.formatUnits(feeData.maxFeePerGas, 'gwei'));
    console.log('Max Priority Fee (GWEI)', ethers.formatUnits(feeData.maxPriorityFeePerGas, 'gwei'));

    // 
    const fivePercentCheaper = BigInt(Math.floor(Number(feeData.maxFeePerGas) * 0.05));

    tx = await signer.sendTransaction({
        to: account2,
        value: ethers.parseEther("0.01"),
        maxFeePerGas: feeData.maxFeePerGas - fivePercentCheaper
    });

    console.log('Transaction is in the mempool...');
    let receipt = await tx.wait();
    console.log(receipt);
    console.log('Transaction mined!');

};

sendCheaperTransaction();

