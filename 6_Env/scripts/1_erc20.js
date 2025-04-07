// First exercises with ERC Tokens.
//////////////////////////////////////////////

// Resources:

// https://ethereum.org/en/developers/docs/standards/tokens/

// https://ethereum.org/en/developers/docs/standards/tokens/erc-20/

// https://eips.ethereum.org/EIPS/eip-20


// Exercise 1. Make sure you environment is set up.
///////////////////////////////////////////////////

// Implement an ERC-20 token.

// a. Easier. From the template:

// contracts/ERC_20_template.sol

// b. Harder. From scratch.

// c. Deploy your token to your favorite net and test it:

// Try to execute the transfer and the transferFrom methods.

require('dotenv').config();
const hre = require("hardhat");
const ethers = hre.ethers
const contracts = require("../ignition/deployments/chain-31337/deployed_addresses.json")
console.log(ethers.version);

// Update info to match your contract.
const cAddress = contracts['MyERC20Module#MyERC20'];
const cName = "MyERC20";

// const notUniMaUrl = process.env.NOT_UNIMA_URL_1;
// const notUniMaProvider = new ethers.JsonRpcProvider(notUniMaUrl);

const hardhatProvider = ethers.provider

// The deployer is the first address in the `accounts` field inside a 
// network declaration in hardhat.config.js. 

// For instance, if this the declation of the unima network:

// unima: {
//     url: ...,
//     accounts: [ "0x1...", "0x2..." ],
// }

// The deployer is the address beginning with "0x1...", unless otherwise
// specified by in the deploy script.

const getContract = async(signer) => {

    // Adjust path as needed.
    // Fetch the ABI from the artifacts.
    // It assumes that the contractname is the same as file name.
    const cABI = require("../artifacts/contracts/" + cName + 
                           ".sol/" + cName + ".json").abi;

    // Create the contract and print the address.
    const c = new ethers.Contract(cAddress, cABI, signer);

    console.log(cName + " address: ", c.target);

    return c;
};

const transfer = async () => {
  let signers = await ethers.getSigners()
  let deployer = signers[10]

  const sender = deployer.address
  const receiver = signers[0].address
  const numTokens = 1_000n
  const contract = await ethers.getContractAt('MyERC20', cAddress, deployer)

  console.log(await contract.name())
  console.log(await contract.balanceOf(sender))
  console.log(await contract.totalSupply())

  const tx = await contract.transfer(receiver, numTokens)
  console.log('transaction in mempool...')
  await tx.wait()
  console.log('transaction mined')
};

// transfer();

const transferFrom = async () => {
  let signers = await ethers.getSigners()
  let deployer = signers[10]
  const contract = await getContract(deployer)

  let delegate = signers[2]
  const tx = await contract.approve(delegate.address, 1_000_000n)
  console.log('transaction in mempool...')
  await tx.wait()
  console.log('transaction mined')

  const contract2 = contract.connect(delegate)
  const tx2 = await contract2.transferFrom(deployer, signers[0].address, 50_000n)
  console.log('second transaction in mempool...')
  await tx2.wait()
  console.log('second transaction mined')
};

// transferFrom();



// Checkpoint. What is purpose of the variable decimals?
// Here is a good explanation from OpenZeppelin:
// https://docs.openzeppelin.com/contracts/5.x/erc20#a-note-on-decimals


// Exercise 2. Mint method.
///////////////////////////

// Add a mint method to the contract so that the owner (i.e., the deployer) 
// can increase the total supply and assign the new supply to an address of 
// choice (can't be the null address).

const mint = async (amount) => {
  let signers = await ethers.getSigners()
  let deployer = signers[10]
  let receiver = signers[2].address
  const contract = await getContract(deployer)
  console.log(await contract.totalSupply())
  const tx = await contract.mint(receiver, amount)
  await tx.wait()
  console.log(await contract.totalSupply())
};

// mint(1000);




