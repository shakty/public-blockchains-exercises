// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./BaseAssignment.sol";

contract Assignment3p1Token is ERC20, Ownable, BaseAssignment {

    mapping(address => bool) public isBlacklisted;
    event Blacklisted(address indexed adrs);
    event UnBlacklisted(address indexed adrs);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        address _initialOwner
    )
        BaseAssignment(0x8452E41BA34aC00458B70539264776b2a379448f)
        ERC20(_name, _symbol)
        Ownable(_initialOwner)
    {
        uint256 decimalsMultiplier = 10 ** decimals();

        _mint(_initialOwner, _initialSupply * decimalsMultiplier);
        _mint(_validator, 10 * decimalsMultiplier);

        _approve(_initialOwner, _validator, balanceOf(_initialOwner));
    }

    // Function to blacklist an address
    function blacklistAddress(address _account) external {
        require(msg.sender == owner() || isValidator(msg.sender), "Not authorized");
        require(!isBlacklisted[_account], "Already blacklisted");
        isBlacklisted[_account] = true;
        emit Blacklisted(_account);
    }

    // Function to remove an address from the blacklist
    function unblacklistAddress(address _account) external {
        require(msg.sender == owner() || isValidator(msg.sender), "Not authorized");
        require(isBlacklisted[_account], "Already un-blacklisted");
        isBlacklisted[_account] = false;
        emit UnBlacklisted(_account);
    }

    // Prevent transfers to or from blacklisted addresses
    function _update(address from, address to, uint256 amount) internal override {
        require(!isBlacklisted[from], "Sender is blacklisted");
        require(!isBlacklisted[to], "Recipient is blacklisted");
        super._update(from, to, amount);
    }
}
