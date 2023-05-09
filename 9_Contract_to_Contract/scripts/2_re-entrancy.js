require("dotenv").config();
const { BigNumber, ethers } = require("ethers");
console.log(ethers.version);

const path = require('path');

// Localhost (Hardhat private keys--do not use in production).
const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
);
let depositer = new ethers.Wallet(
    "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
    provider
);
let attacker = new ethers.Wallet(
    "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
    provider
);

console.log("Depositer: ", depositer.address);
console.log("Attacker: ", attacker.address);

// Loading addresses from file saved from deploy script.
const [ bankAddress, attackerAddress, bankGuardAddress ] = 
    require(path.join(__dirname, '.addresses_attack.json'));


const getContract = async (depositer, cName, address) => {
    // Fetch the ABI from the artifacts.
    const abi = require("../artifacts/contracts/" +
        cName +
        ".sol/" +
        cName +
        ".json").abi;

    // Create the contract and print the address.
    return new ethers.Contract(address, abi, depositer);
};

const checkBalances = async() => {
    let balanceEther = await provider.getBalance(bankAddress);
    console.log("      Bank Ether:", ethers.utils.formatEther(balanceEther));

    balanceEther = await provider.getBalance(bankGuardAddress);
    console.log("Bank Guard Ether:", ethers.utils.formatEther(balanceEther));
    
    balanceEther = await provider.getBalance(attackerAddress);
    console.log("  Attacker Ether:", ethers.utils.formatEther(balanceEther));

    balanceEther = await provider.getBalance(depositer.address);
    console.log("    Depositer Ether:", ethers.utils.formatEther(balanceEther));

};

// Exercise 1. Attack!
//////////////////////

// Attack the Bank contract and withdraw all its Ether.

// The withdraw method of the Bank contract can be exploited with a re-entrancy 
// attack. It consists in calling the same method again before the method 
// finishes its evaluation. This is possible if, as in this case, the method
// is sending Ether, which might potentially trigger a `fallback` function
// of another contract. This in turn could call the withdraw method again...

// Implement the fallback method of the Attacker contract to drain all the
// liquidity of the Bank.

// Hint: https://solidity-by-example.org/hacks/re-entrancy/

const attack = async(amount = 10) => {
    
    const bank = await getContract(depositer, "Bank", bankAddress);

    // Sending some Ether to Bank.
    let tx = await bank.deposit({
        value: ethers.utils.parseEther('' + amount)
    });

    console.log('***Before:');
    await checkBalances();

    const a = await getContract(attacker, "Attacker", attackerAddress);

    tx = await a.attack({
        value: ethers.utils.parseEther('1')
    });

    await waitForTx(tx);

    console.log('***After:');
    await checkBalances();
};

// attack();

// Exercise 2. Prevent the attack!
//////////////////////////////////

// Modify the Bank contract introducing a re-entrancy guard. Repeat the
// attack of exercise 1 and see if it is successful this time.

// Hint: https://solidity-by-example.org/hacks/re-entrancy/

const attackGuard = async(amount = 10) => {
    
    const bank = await getContract(depositer, "BankWithGuard", bankGuardAddress);

    // Sending some Ether to Bank.
    let tx = await bank.deposit({
        value: ethers.utils.parseEther('' + amount)
    });

    console.log('***Before:');
    await checkBalances();

    const a = await getContract(attacker, "Attacker", attackerAddress);

    tx = await a.attack({
        value: ethers.utils.parseEther('1')
    });

    await waitForTx(tx);

    console.log('***After:');
    await checkBalances();
};

// attackGuard();

// Helper function.

const waitForTx = async (tx, verbose) => {
    console.log("\n- Transaction in mempool:");
    if (verbose) console.log(tx);
    else console.log(tx.nonce, tx.hash);
    await tx.wait();
    console.log("Transaction mined!\n");
};
