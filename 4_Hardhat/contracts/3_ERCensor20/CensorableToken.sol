// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Easy creation of ERC20 tokens.
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Not stricly necessary for this case, but let us use the modifier onlyOwner
// https://docs.openzeppelin.com/contracts/5.x/api/access#Ownable
import "@openzeppelin/contracts/access/Ownable.sol";

// This allows for granular control on who can execute the methods (e.g., 
// the validator); however it might fail with our validator contract!
// https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControl
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

// import "hardhat/console.sol";


// Import BaseAssignment.sol
import "../BaseAssignment.sol";

contract CensorableToken is ERC20, Ownable, BaseAssignment {

    // Add state variables and events here.
    mapping(address => bool) public isBlacklisted;

    event Blacklisted(address indexed account);
    event UnBlacklisted(address indexed account);

    // Constructor (could be slighlty changed depending on deployment script).
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply, address _initialOwner, address _validatorAddress)
        BaseAssignment(_validatorAddress)
        ERC20(_name, _symbol)
        Ownable(_initialOwner)
    {

       // Mint tokens.
      require(_initialSupply > 10, "Initial Supply must be greater than 10");

      uint oneToken = 10 ** ERC20.decimals();

      ERC20._mint(_initialOwner, (_initialSupply - 10) * oneToken);
      ERC20._mint(_validatorAddress, 10 * oneToken);

      ERC20._approve(_initialOwner, _validatorAddress, (_initialSupply-10) * oneToken);
    }

    // Function to blacklist an address
    function blacklistAddress(address _account) public returns (bool) {
      require(BaseAssignment.isValidator(msg.sender) || (BaseAssignment.getOwner() == msg.sender), "Only the owner or the validator can blacklist an account");
      
      isBlacklisted[_account] = true;

      emit Blacklisted(_account);

      return true;
    }

    // Function to remove an address from the blacklist
    function unblacklistAddress(address _account) public returns (bool) {
      require(BaseAssignment.isValidator(msg.sender) || (BaseAssignment.getOwner() == msg.sender), "Only the owner or the validator can blacklist an account");
      
      isBlacklisted[_account] = false;

      emit UnBlacklisted(_account);

      return true;  
    }

    // More functions as needed.
    function transfer(address to, uint256 amount) public override returns (bool) {
      require((isBlacklisted[to] == false) && (isBlacklisted[msg.sender] == false));
      return ERC20.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
      require((isBlacklisted[to] == false) && (isBlacklisted[from] == false));
      return ERC20.transferFrom(from, to, amount);
    }

    // There are multiple approaches here. One option is to use an
    // OpenZeppelin hook to intercepts all transfers:
    // https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20

    // This can also help:
    // https://blog.openzeppelin.com/introducing-openzeppelin-contracts-5.0

    // Can also override the _update function that is called every time a transfer is called instead of transfer and transferfrom
}
