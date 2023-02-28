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

require('dotenv').config();
const ethers = require("ethers");

// b. Create a Goerli provider.

const providerKey = process.env.INFURA_KEY;

const goerliInfuraUrl = `${process.env.INFURA_GOERLI}${providerKey}`;
const goerliProvider = new ethers.JsonRpcProvider(goerliInfuraUrl);

// Exercise 1. Create a Signer.
///////////////////////////////

// Important! Do not use the private key of an account where actual money
// is held. Use only a test account. 

// Create with the Metamask private key saved in your .env file. No need to 
// connect to provider now.

// Verify that the address matches your Metamask address.

// Hint: a signer is a wallet.
// Hint2: if you get an error here, check that the private key begins with "0x".

let signer = new ethers.Wallet(process.env.METAMASK_1_PRIVATE_KEY);
console.log(signer.address);

// Exercise 2. Sign something.
//////////////////////////////

const sign = async (message = 'Hello world') => {
    
    // Signing the message
    const signature = await signer.signMessage(message);

    const verifiedSigner = ethers.verifyMessage(message, signature);
    
    if (verifiedSigner === signer.address) {
        console.log('Signature is valid.');
    }
    else {
        console.log('Signature is NOT valid.');
    }

    let anotherMessage = 'Give me 5 ETH';

    const verifiedSigner2 = ethers.verifyMessage(anotherMessage, signature);
    
    if (verifiedSigner2 === signer.address) {
        console.log('Tampered signature is valid.');
    }
    else {
        console.log('Tampered signature is NOT valid.');
    }
};

// sign();

// Exercise 3. Connect to the blockchain. 
/////////////////////////////////////////

// a. Connect the signer to the Goerli network.
// Hint: .connect()

// b. Print the next nonce necessary to send a transaction.
// Hint: .getNonce()

const connect = async() => {
    signer = await signer.connect(goerliProvider);
    // console.log(signer);

    let nonce = await signer.getNonce();
    // Equivalent to.
    // let nonce = await goerliProvider.getTransactionCount("unima.eth");
    console.log('The nonce is', nonce);
};

// connect();

// c. Replace the signer created above at exercise 1 with one that takes the 
// Goerli provider as second parameter. This is necessary even
// if you connected inside the function connect() because there might be
// some issues with the asynchronicity of when the connection is established
// and the remaning of the exercises. If unclear, just check the solution :)

// Replace the signer created above.
signer = new ethers.Wallet(process.env.METAMASK_1_PRIVATE_KEY, goerliProvider);


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

    let b1 = await goerliProvider.getBalance(signer.address);
    let b2 = await goerliProvider.getBalance(account2);
    b1 = ethers.formatEther(b1);
    b2 = ethers.formatEther(b2);

    tx = await signer.sendTransaction({
        to: account2,
        value: ethers.parseEther("0.01")
    });

    // console.log(tx);
    
    console.log('Transaction is in the mempool...');
    await tx.wait();

    console.log('Transaction mined!');

    let updatedB1 = await goerliProvider.getBalance(signer.address);
    let updatedB2 = await goerliProvider.getBalance(account2);
    updatedB1 = ethers.formatEther(updatedB1);
    updatedB2 = ethers.formatEther(updatedB2);

    console.log('Balance for', signer.address, 'changed from', b1, 'to', updatedB1);
    console.log('Balance for', account2, 'changed from', b2, 'to', updatedB2);
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
    
        // console.log(tx);
    
        console.log('Gas Limit', tx.gasLimit);
        console.log('Max Fee per Gas (GWEI)', ethers.formatUnits(tx.maxFeePerGas, 'gwei'));
        console.log('Max Priority Fee (GWEI)', ethers.formatUnits(tx.maxPriorityFeePerGas, 'gwei'));

        console.log('---');
        const feeData = await goerliProvider.getFeeData();
        // console.log(feeData)
    
        console.log('Legacy Gas Price (GWEI)', ethers.formatUnits(feeData.gasPrice, 'gwei'));
        console.log('Max Fee per Gas (GWEI)', ethers.formatUnits(feeData.maxFeePerGas, 'gwei'));
        console.log('Max Priority Fee (GWEI)', ethers.formatUnits(feeData.maxPriorityFeePerGas, 'gwei'));
        
        console.log('');
        const lastBlock = await goerliProvider.getBlock("latest");
        console.log('Base Fee Previous Block (GWEI)', ethers.formatUnits(lastBlock.baseFeePerGas, 'gwei'));

        // maxFeePerGas = (2 * baseFeePerGas) + maxPriorityFeePerGas
        console.log('');

    }, 1000);

};

// checkGasPrices();


// d. e.
const sendCheaperTransaction = async () => {


    const feeData = await goerliProvider.getFeeData();
    // console.log(feeData)

    console.log('Legacy Gas Price (GWEI)', ethers.formatUnits(feeData.gasPrice, 'gwei'));
    console.log('Max Fee per Gas (GWEI)', ethers.formatUnits(feeData.maxFeePerGas, 'gwei'));
    console.log('Max Priority Fee (GWEI)', ethers.formatUnits(feeData.maxPriorityFeePerGas, 'gwei'));

    tx = await signer.sendTransaction({
        to: account2,
        value: ethers.parseEther("0.01"),
        maxFeePerGas: feeData.maxFeePerGas - 5000000000n
    });

    console.log('Transaction is in the mempool...');
    let receipt = await tx.wait();
    console.log(receipt);
    console.log('Transaction mined!');

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

     // If there is a transaction in the mempool, it returns the same nonce,
    // otherwise the _next_ one.
    let nonce = await signer.getNonce();
    // Equivalent to:
    // let nonce = await goerliProvider.getTransactionCount(signer.address);

    // Note: the line below will return the _next_ nonce when there is
    // already a transaction in the mempool.
    // let nextNonce = await signer.getNonce("pending");

    console.log('Nonce is:', nonce);

    const feeData = await goerliProvider.getFeeData();
    
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

   const feeData = await goerliProvider.getFeeData();
   
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

cancelTransaction();
