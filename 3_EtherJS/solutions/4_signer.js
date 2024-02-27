// Loading path module for operations with file paths.
const path = require('path');

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

pathToDotEnv = path.join(__dirname, '..', '..', '.env');
// console.log(pathToDotEnv);
require("dotenv").config({ path: pathToDotEnv });

const ethers = require("ethers");

// b. Create a sepolia provider.

const providerKey = process.env.ALCHEMY_KEY;

const sepoliaUrl = `${process.env.ALCHEMY_SEPOLIA_API_URL}${providerKey}`;
// console.log(sepoliaUrl);
const sepoliaProvider = new ethers.JsonRpcProvider(sepoliaUrl);

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

// a. Connect the signer to the Sepolia network.
// Hint: .connect()

// b. Print the next nonce necessary to send a transaction.
// Hint: .getNonce()

const connect = async() => {
    signer = await signer.connect(sepoliaProvider);
    // console.log(signer);

    let nonce = await signer.getNonce();
    // Equivalent to.
    // let nonce = await sepoliaProvider.getTransactionCount("unima.eth");
    console.log('The nonce is', nonce);
};

// connect();

// c. Replace the signer created above at exercise 1 with one that takes the 
// sepolia provider as second parameter. This is necessary even
// if you connected inside the function connect() because there might be
// some issues with the asynchronicity of when the connection is established
// and the remaning of the exercises. If unclear, just check the solution :)

// Replace the signer created above.
signer = new ethers.Wallet(process.env.METAMASK_1_PRIVATE_KEY, sepoliaProvider);


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

    let b1 = await sepoliaProvider.getBalance(signer.address);
    let b2 = await sepoliaProvider.getBalance(account2);
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

    let updatedB1 = await sepoliaProvider.getBalance(signer.address);
    let updatedB2 = await sepoliaProvider.getBalance(account2);
    updatedB1 = ethers.formatEther(updatedB1);
    updatedB2 = ethers.formatEther(updatedB2);

    console.log('Balance for', signer.address, 'changed from', b1, 'to', updatedB1);
    console.log('Balance for', account2, 'changed from', b2, 'to', updatedB2);
};

// sendTransaction();

