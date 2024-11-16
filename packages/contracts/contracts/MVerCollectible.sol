// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MVerCollectible is ERC1155 {
    uint256 public immutable originalTokenId;
    address public immutable originalContract;
    address public immutable creator;

    uint256 public price;
    uint256 public maxSupply;
    uint256 public totalSupply;

    event Collected(
        address indexed collector,
        uint256 amount,
        uint256 paid
    );

    constructor(
        address _originalContract,
        uint256 _originalTokenId,
        address _creator,
        uint256 _price,
        uint256 _maxSupply,
        string memory _uri
    ) ERC1155(_uri) {
        originalContract = _originalContract;
        originalTokenId = _originalTokenId;
        creator = _creator;
        price = _price;
        maxSupply = _maxSupply;
    }

    function collect(uint256 amount) external payable {
        require(totalSupply + amount <= maxSupply, "Exceeds max supply");
        require(msg.value >= price * amount, "Insufficient payment");

        // Send payment to creator
        (bool success, ) = payable(creator).call{value: msg.value}("");
        require(success, "Payment failed");

        _mint(msg.sender, 0, amount, "");
        totalSupply += amount;

        emit Collected(msg.sender, amount, msg.value);
    }
}

