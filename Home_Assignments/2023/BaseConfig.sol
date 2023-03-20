// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/*=============================================
=                 Base Config                 =
=============================================*/

import "./ConfigStorage.sol";

contract BaseConfig {
    address private configContractAddress;

    function initAdmin(
        address _configContractAddress,
        string memory _contractName
    ) public {
        configContractAddress = _configContractAddress;

        ConfigStorage configContact = getConfigStorage();
        configContact.addContractAdmin(address(this), _contractName);
    }

    function getConfigStorage() public view returns (ConfigStorage) {
        return ConfigStorage(configContractAddress);
    }

    function withdrawFunds(address payable _to, uint256 _value) public payable {
        require(
            getConfigStorage().isAdmin(msg.sender),
            "Only contract admin can withdraw funds"
        );

        require(_to != address(0), "Invalid address");

        require(
            _to == msg.sender ||
                _to == tx.origin ||
                getConfigStorage().isAdmin(_to),
            "Funds can only be withdrawn to admin, msg.sender or tx.origin"
        );

        require(_value >= address(this).balance, "Insufficient funds");

        (bool success, ) = _to.call{value: _value}("");
        require(success, "Transfer failed.");
    }
}

/*=====            End of Admin        ======*/
