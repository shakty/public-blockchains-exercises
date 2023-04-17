// First exercises with ERC Tokens.
//////////////////////////////////////////////

// Resources:

// https://hardhat.org/tutorial/testing-contracts

// https://mochajs.org/

// https://www.chaijs.com/guide/styles/#expect


// Exercise 1. Test the Lock contract.
//////////////////////////////////////

// Hint: the test is already created.

// Exercise 2. Test the MyERC20 contract.
//////////////////////////////////////////////////////////

// This time you have to create the test file yourself!
// Hint: npx hardhat test/yourtest.js executes only your test (and not Lock).

// a. Test the deployment: name, symbol, totalSupply and owner should be 
// set correctly; the owner should have all total supply.

// b. Test transfers (including transfers that fails).
// Hint: .to.be.revertedWith(...)
// Hint2: await should be placed in front of expect.

// c. Test that the "Transfer" event is emitted with the proper arguments.
// Hint: .to.emit(...)
// Hint2: .withArgs(...);
// Hint3: to execute a method from an address different from deployer, use
// .connect(signer).

// d. Test that the mint method increases the total supply and it assigns
// the newly minted tokens to the specified address.

// e. Test the Approve pattern:
//    - approve() sets a given allowance for a delegate,
//    - transferFrom() allows a delegate to spend the allowance,
//    - transferFrom() reverts if allowance is not enough.




