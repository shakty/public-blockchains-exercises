
// Loading path module for operations with file paths.
const path = require('path');

// Ethers JS: Providers.
////////////////////////

// A Provider is a read-only connection to the blockchain, which allows
// querying the blockchain state, such as accout, block or transaction
// details, querying event logs or evaluating read-only code using call.

// See: https://docs.ethers.org/v6/getting-started/

// Exercise 0. Require the `dotenv` and `ethers` package.
/////////////////////////////////////////////////////////

// Hint: As you did in file 1_wallet.

// Require packages.

pathToDotEnv = path.join(__dirname, '..', '..', '.env');
// console.log(pathToDotEnv);
require("dotenv").config({ path: pathToDotEnv });

const ethers = require("ethers");


// Exercise 1. Connect to Mainnet (a.k.a welcome async!).
/////////////////////////////////////////////////////////

// Whenever you interact with a blockchain you are in the "async" domain. 

// In JavaScript, you generally use "promises" to handle asynchronous   
// code execution. There are two ways of working with promises:
//
// 1. .then() notation (standard Promises)
// 2. async/await pattern (newer notation)
//
// Important! You can use promises anywhere in your code, but you can use 
// "await" only inside an "async" function. This makes things a bit more
// complicated, but not too much.
// 
// If this is new to you, you can read more about these here:
// https://javascript.info/async

// You can also check the 2_JS_Async folder for exercises on asynchronous 
// code in JavaScript.

// a. Create a JSON RPC provider and connect to the Ethereum Mainnet.  

// Hint: check EthersJS docs for the method `JsonRpcProvider` and what 
// parameters it needs (nested hint: you need something from the .env file).

const providerKey = process.env.ALCHEMY_KEY;

const mainnetUrl = `${process.env.ALCHEMY_MAINNET_API_URL}${providerKey}`;
const mainnetProvider = new ethers.JsonRpcProvider(mainnetUrl);

// b. Verify that the network's name is "mainnet" and the chain id is 1.

// Hint: the value of chain id returned by Ethers JS is of type "BigInt". 
// As the name suggests, that is a very a data type capable of holding very
// large (integer) numbers. Remember to cast it to Number for a nicer display.
// https://javascript.info/bigint 

// b1. Use the async/await pattern to do the job.


// This is an asynchronous anonymous self-executing function. It is a ugly
// construct, but it allows you to use await inside its body.
// (async () => {
//     let net = await mainnetProvider.getNetwork();
//     console.log('Async/Await!');
//     console.log('Provider\'s network name: ', net.name);
//     console.log('Provider\'s network chain id: ', Number(net.chainId));
// })();

// However, the async function could also be named, and the result is:
const network = async () => {
    let net = await mainnetProvider.getNetwork();
    console.log('Async/Await!');
    console.log('Provider\'s network name: ', net.name);
    console.log('Provider\'s network chain id: ', Number(net.chainId));
};

// which you can then call:
// network();

// The second (less compact) notation has the advantage that we can invoke
// the code only when needed, so it is preferred in this exercise sheet.

// b2. Bonus. Re-write the code above using the promise standard notation.

// Promises.
// mainnetProvider.getNetwork().then(net => {
//     console.log('Promise!');
//     console.log('Provider\'s network name: ', net.name);
//     console.log('Provider\'s network chain id: ', Number(net.chainId));
// });


// Checkpoint. We use `return` to terminate the execution insted
// of process.exit(). Why?
// return;


// Exercise 2. Block Number.
////////////////////////////

// a. Get the latest block number from the Ethereum mainnet. Then compare it
// with the value displayed on Etherscan.io.

// // Look up the current block number
const blockNum = async () => {
    let blockNumber = await mainnetProvider.getBlockNumber();
    console.log('Mainnet block number: ', blockNumber);
};

// blockNum();

// b. The Ethereum mainnet is one of the most secure blockchains in the world.
// The testnets of Ethereum are a bit less secure because they might have 
// experimental features, but also because they are replaced often and so
// they have a shorter chain. How shorter?

// Connect to the Sepolia test net, get the latest block number and print
// the difference in chain length with mainnet.

const sepoliaUrl = `${process.env.ALCHEMY_SEPOLIA_API_URL}${providerKey}`;
// console.log(sepoliaUrl);
const sepoliaProvider = new ethers.JsonRpcProvider(sepoliaUrl);


// Look up the current block number in Mainnet and Sepolia.
const blockDiff = async () => {
    let blockNumberM = await mainnetProvider.getBlockNumber();
    console.log('Mainnet block number: ', blockNumberM);

    let blockNumberS = await sepoliaProvider.getBlockNumber();
    console.log('Sepolia block number: ', blockNumberS);

    console.log('Mainnet is ' + (blockNumberM - blockNumberS) +
                ' blocks ahead');
}

// blockDiff();


// Exercise 3. Block time.
//////////////////////////

// How long does it take to get a new block?

// a. Here is an elaborate solution to measure the time passed between
// two blocks. Review the function below, in particular:

// - the ternary operator,
// - the built-in Date object,
// - the setInterval and clearInterval functions

// Run the function once for Mainnet and once for Sepolia. Do you get similar
// results?

// Asynchronous functions with pre-defined input parameters.
const checkBlockTime = async (providerName = "mainnet", blocks2check = 3) => {

    // JS Ternary Operator.
    let provider = providerName.toLowerCase() === "mainnet" ? 
        mainnetProvider : sepoliaProvider;

    // Get initial block number and timestamp.
    let d = Date.now();
    let blockNumber = await provider.getBlockNumber();
    console.log(providerName, 'Current Block num:', blockNumber);

    // Keep track of how many blocks to check.
    let blocksChecked = 0;

    // Poll the blockchain every second to check for a new block number.
    let myInterval = setInterval(async () => {

        let newBlockNumber = await provider.getBlockNumber();
        
        // Compare block numbers.
        if (newBlockNumber !== blockNumber) {
            // Check time.
            let d2 = Date.now();
            let timeDiff = d2 - d;
            console.log(providerName, "New Block num:", newBlockNumber);
            console.log(providerName, "It took: ", timeDiff);
            
            // Update loop variables.
            d = d2;
            if (++blocksChecked >= blocks2check) {
                clearInterval(myInterval);
            }
            blockNumber = newBlockNumber;
        }

    }, 1000);
    
};

// checkBlockTime("Mainnet");

// checkBlockTime("Sepolia");

// b. Bonus. The checkBlockTime function can be rewritten more efficiently 
// using the Observer pattern offer by EtherS JS and listening to the 
// "block" event. See:
// https://docs.ethers.org/v5/api/providers/provider/#Provider--event-methods

// Do it! 
// Hint: setInterval/clearInterval are replaced by on/off calls.

const checkBlockTime2 = async (providerName = "mainnet", blocks2check = 3) => {

    // JS Ternary Operator.
    let provider = providerName.toLowerCase() === "mainnet" ? 
        mainnetProvider : sepoliaProvider;

    // Get initial block number and timestamp.
    let d = Date.now();
    // Keep track of how many blocks to check.
    let blocksChecked = 0;

    provider.on("block", newBlockNumber => {
        
        // Check time.
        let d2 = Date.now();
        let timeDiff = d2 - d;
        console.log(providerName, "New Block num:", newBlockNumber);
        console.log(providerName, "It took: ", timeDiff);
        
        // Update loop variables.
        d = d2;

        if (++blocksChecked >= blocks2check) {
            provider.off("block");
        }
    })
};

// checkBlockTime2("mainnet");

// return;

// c. Now that you know the answer, you can check the 
// "Ethereum Average Block Time Chart": https://etherscan.io/chart/blocktime


// Exercise 4. Block info.
//////////////////////////

// a. Look up the last block in Mainnet and print it to console.
// Hint: first get the last block number, and then use .getBlock(blockNumber).

// b. How many transactions does the block contains?

// c. Pick a transaction and examine its receipt.
// Hint: use getTransactionReceipt().

// d. Transactions can be prefetched, so that you save one blockchain call.
// Hint: pass `true` as second parameter to .getBlock(blockNumber, true).

const blockInfo = async () => {
    let blockNumber = await mainnetProvider.getBlockNumber();
    let block = await mainnetProvider.getBlock(blockNumber);
    console.log(block);

    let tx = await block.getTransaction(0);
    console.log(tx);
    let txHash = block.transactions[0];

    const txReceipt = await mainnetProvider.getTransactionReceipt(txHash);
    console.log(txReceipt);
    console.log('A transaction from', txReceipt.to, 'to', txReceipt.from);

    // Long list...
    block = await mainnetProvider.getBlock(blockNumber, true);
    console.log(block.prefetchedTransactions);

};

// blockInfo();

// Exercise 5. ENS names.
//////////////////////////

// Resolve the name 'unima.eth' on the Goerli network, then lookup the
// address.

const ens = async () => {
    let unimaAddress = await sepoliaProvider.resolveName('unima.eth');
    console.log(unimaAddress);

    let ensName = await sepoliaProvider.lookupAddress(unimaAddress);
    console.log(ensName);
};

// ens();


// Exercise 6. Get ETH balance.
///////////////////////////////

// a. Ask for the Ether balance of "unima.eth". 
// Hint: remember to be on the Goerli net.

// b. Format the balance nicely with the formatEther utility.

// c. Compare the ETH balance for the ENS name "unima.eth" and the balance
// its address (after resolving it). Are they the same?

// d. Bonus. What is the balance for the address of Vitalik Buterin, the 
// creator of Ethereum? 
// Hint: try vitalik.eth

const balance = async (ensName = "unima.eth") => {

    // Get the balance for "unima.eth".
    let bal = await sepoliaProvider.getBalance(ensName);
    // console.log(bal);

    // Nicely formatted.
    console.log(ensName, "has", ethers.formatEther(bal), "ETH");

    // Check the balance is the same when resolving the ens address.
    let unimaAddress = await sepoliaProvider.resolveName(ensName);
    let bal2 = await sepoliaProvider.getBalance(unimaAddress);
    
    console.log('Are the two balances equal?', bal === bal2 ? 'Yes' : 'No');

};

// balance("vitalik.eth");

