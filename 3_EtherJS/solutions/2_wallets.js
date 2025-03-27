// EthersJS: Wallets.
////////////////////

// Ethers JS:
// https://docs.ethers.org/v6/


function exit() {
  console.log('Exercise ' + exercise + ' completed.');
  process.exit(0);
  console.log('I will not be printed to console :(');
}

// Exercise 1. Create a Random Wallet.
//////////////////////////////////////
exercise = '1a';

const ethers = require("ethers");

// a. Create a random wallet and print the address, the private key,
// and the mnenomic phrase.

const wallet = ethers.Wallet.createRandom();

console.log();
console.log("Address:", wallet.address);
console.log("Private key:", wallet.privateKey);
console.log("Mnemonic:", wallet.mnemonic.phrase);
console.log();

exit();
return;

// b. Bonus. Print the derivation path of the wallet and check that it is
// equal to `baseDevPath`. 

exercise = '1b';

let baseDevPath = "m/44'/60'/0'/0/";

// Wait is the derivation path? 
// Basically, the mnemonic alone isn't enough to determine an address
// and you need this extra bit of information. You may learn more here:
// https://www.youtube.com/watch?v=tPCN3nDVzZI
// Also:
// https://vault12.com/securemycrypto/crypto-security-basics/what-is-bip39/


console.log("Derivation path:", wallet.path);

// exit();

// Exercise 2. Bonus. Create a Hierarchical Deterministic Wallet.
/////////////////////////////////////////////////////////////////
console.log();
exercise = 2;

// From the same wallet, you can derive a deterministic sequence of addresses.
// First, pick a mnemonic, then create a hierarchical deterministic wallet, 
// finally print the first 10 addresses and private keys generated.
// Hint: You need to append an index to the derivation path.

let mnemonic = wallet.mnemonic.phrase;

let path, myWallet;
for (let i = 0; i < 10; i++) {
  path = `${baseDevPath}${i}`;
  myWallet = ethers.HDNodeWallet.fromPhrase(mnemonic, path);
  console.log("Address", i, myWallet.address);
  console.log("Private key", i, myWallet.privateKey);
}

exit();