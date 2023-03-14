// Ethers JS: First interaction with (not) UniMa blockchain.
////////////////////////////////////////////////////////////

// Exercise 0. Load dependencies and network provider.
//////////////////////////////////////////////////////

// a. Require the `dotenv` and `ethers` packages.
// Hint: As you did multiple times now.

require('dotenv').config();
const ethers = require("ethers");

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

const notUniMaUrl = process.env.NOT_UNIMA_URL_1;
const notUniMaProvider = new ethers.JsonRpcProvider(notUniMaUrl);

// Exercise 2. Let's query the provider.
////////////////////////////////////////

// (not) UniMa Blockchain si too long. Let's call it NUMA.
// Print to console the network name, chain id, and block number of NUMA.

const networkInfo = async () => {
    let net = await notUniMaProvider.getNetwork();
    console.log('NUMA Info:');
    console.log('Network name: ', net.name);
    console.log('Network chain id: ', Number(net.chainId));

    let blockNumber = await notUniMaProvider.getBlockNumber();
    console.log('Block number: ', blockNumber);
};

// networkInfo();


// Exercise 3. Connect a signer to the (not) UniMa blockchain.
//////////////////////////////////////////////////////////////

// a. Use the same non-sensitive private key used in 3_signer.js.


const signer = new ethers.Wallet(process.env.METAMASK_1_PRIVATE_KEY,
                                 notUniMaProvider);

// b. Print the next nonce necessary to send a transaction.
// Hint: .getNonce()

const getNonce = async() => {

    let nonce = await signer.getNonce();
    console.log('Your nonce is ' + nonce);
};

// getNonce();

// Checkpoint. Is the nonce in the (not) Unima blockchain different
// than in Goerli?


// Exercise 4. Check gas.
/////////////////////////

// a. Let's get some gas from the faucet. What is the faucet's address? 
// Check the slides in ILIAS.
// Hint: only accessible within UniMa network.

// b. Check your balance on UniMa network.

const checkBalance = async () => {

    let balance = await notUniMaProvider.getBalance(signer.address);

    console.log('My balance is ' + ethers.formatEther(balance) + ' NUMETH.');
};

// checkBalance();

// Exercise 5. Send a transaction.
//////////////////////////////////

// Send some Ether from one of your accounts to another one on NUMA.

const account2 = process.env.METAMASK_2_ADDRESS;

const sendTransaction = async () => {

    let b1 = await notUniMaProvider.getBalance(signer.address);
    let b2 = await notUniMaProvider.getBalance(account2);
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

    let updatedB1 = await notUniMaProvider.getBalance(signer.address);
    let updatedB2 = await notUniMaProvider.getBalance(account2);
    updatedB1 = ethers.formatEther(updatedB1);
    updatedB2 = ethers.formatEther(updatedB2);

    console.log('Balance for', signer.address, 'changed from', b1, 'to', updatedB1);
    console.log('Balance for', account2, 'changed from', b2, 'to', updatedB2);
};

// sendTransaction();

// Checkpoint. Can you send your ETH from NUMA to Goerli?

