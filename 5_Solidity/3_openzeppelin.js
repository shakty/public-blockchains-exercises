
// Exercise 3. Open Zeppelin.
/////////////////////////////

// How about creating a variable of the type:

// "This contract was created at block number <BLOCK_NUMBER>"

// Where <BLOCK_NUMBER> is the actual block number at which the contract
// was deployed.

// This operation requires joining a string and a number, an operation that
// is not supported in Solidity. Generally, string manipulations should be
// avoided because they cost gas, but if you really want to do it, you can
// use a library provided by Open Zeppelin.


// Variables in Solidity are slightly different than in other programming
// languages. All variables are "public," in the sense that a copy is stored
// in the memory of each computer running an Ethereum client. So even "private"
// variables are in fact

// Private variables.

    //   let date = await hre.ethers.provider.getStorageAt(contractAddress, 0);
    //   date = parseInt(date, 16);
    //   date = new Date(date * 1000);
    //   console.log(date);

    //   let owner = await hre.ethers.provider.getStorageAt(contractAddress, 1);
    //   console.log(owner);
    //   // date = parseInt(storage, 16);
    //   // date = new Date(date * 1000);
    //   // console.log(date);
    //   let a = hre.ethers.utils.toUtf8String(owner);
    //   console.log(a);