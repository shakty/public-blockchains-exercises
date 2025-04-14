// Ethers JS: Quiz Contract.
////////////////////////////

// Note: this script includes reading from command-line and it might not
// work well with Code Runner. Please run inside a terminal.

// Load dependencies.
/////////////////////

const path = require("path");

const ethers = require("ethers");

// Adjust path to your .env file.
const pathToDotEnv = path.join(__dirname, "..", "..", ".env");
console.log(pathToDotEnv);
require("dotenv").config({ path: pathToDotEnv });

const notUniMaUrl = process.env.NOT_UNIMA_URL_1;
const notUniMaProvider = new ethers.JsonRpcProvider(notUniMaUrl);

const signer = new ethers.Wallet(
  process.env.METAMASK_1_PRIVATE_KEY,
  notUniMaProvider
);
const pathToABI = path.join(
  __dirname,
  "..",
  "artifacts",
  "contracts",
  "Assignment3.1_Token.sol",
  "Assignment3p1Token.json"
);
console.log(pathToABI);
const ABI = require(pathToABI).abi;
// The address of the Quiz contract.
const contractAddress = "0xBb2A674a641F7EbE4f76b3cE78Da5D143F6D6F84";

const tokenContract = new ethers.Contract(contractAddress, ABI, signer);

async function main() {
  const totalSupply = await tokenContract.totalSupply();
  console.log("Total supply:", ethers.formatUnits(totalSupply, 18));

  const balanceMe = await tokenContract.balanceOf(
    "0x475a3dA9349DfdD61C1462Ab907520FeEDBb3d91"
  );
  console.log("My balance:", ethers.formatUnits(balanceMe, 18));

  const balanceAccount2 = await tokenContract.balanceOf(
    "0xcE7eA14cEd2aF10058089F5a1D3773ef0391E3cB"
  );

  console.log("Blacklisting account 2");
  const tx = await tokenContract.blacklistAddress(
    "0xcE7eA14cEd2aF10058089F5a1D3773ef0391E3cB"
  );
  await tx.wait();
  console.log("Blacklisting done!");
  console.log("Checking if blacklisted");
  let bl = await tokenContract.isBlacklisted(
    "0xce7ea14ced2af10058089f5a1d3773ef0391e3cb"
  );
  if (bl) console.log("Correctly blacklisted");

  console.log("Unblacklisting account 2");
  const tx2 = await tokenContract.unblacklistAddress(
    "0xcE7eA14cEd2aF10058089F5a1D3773ef0391E3cB"
  );
  await tx2.wait();

  let bl2 = await tokenContract.isBlacklisted(
    "0xce7ea14ced2af10058089f5a1d3773ef0391e3cb"
  );
  console.log("Blacklisted", bl2);
  if (bl2) console.log("Not unblacklisted correctly");
  else console.log("Correctly unblacklisted");
  /* console.log("Account 2 balance:", ethers.formatUnits(balanceAccount2, 18));

  const tx = await tokenContract.transfer(
    "0xcE7eA14cEd2aF10058089F5a1D3773ef0391E3cB",
    ethers.parseEther("0.001")
  );
  await tx.wait();
  console.log("Transfer done!");

  const newBalanceMe = await tokenContract.balanceOf(
    "0x475a3dA9349DfdD61C1462Ab907520FeEDBb3d91"
  );
  console.log("My new balance:", ethers.formatUnits(newBalanceMe, 18));

  const newBalanceAccount2 = await tokenContract.balanceOf(
    "0xcE7eA14cEd2aF10058089F5a1D3773ef0391E3cB"
  );
  console.log(
    "Account 2 new balance:",
    ethers.formatUnits(newBalanceAccount2, 18)
  );

  console.log("Blacklisting address2");

  const tx2 = await tokenContract.blacklistAddress(
    "0xcE7eA14cEd2aF10058089F5a1D3773ef0391E3cB"
  );
  tx2.wait();
  console.log("Blacklisting done!"); 

  console.log("Testing transfer to blacklisted address");

    const tx3 = await tokenContract.transfer(
    "0xcE7eA14cEd2aF10058089F5a1D3773ef0391E3cB",
    ethers.parseEther("0.001")
  );
  await tx3.wait();
  console.log("Transfer done!"); 
*/
  /* console.log("Unblacklisting address2");

  const tx4 = await tokenContract.unblacklistAddress(
    "0xcE7eA14cEd2aF10058089F5a1D3773ef0391E3cB"
  );

  await tx4.wait();
  console.log("Unblacklisting done!");

  console.log("Testing transfer to unblacklisted address");

  const tx5 = await tokenContract.transfer(
    "0xcE7eA14cEd2aF10058089F5a1D3773ef0391E3cB",
    ethers.parseEther("0.001")
  );

  await tx5.wait();
  console.log("Transfer done!"); */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
