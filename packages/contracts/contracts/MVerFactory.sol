// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MVerOriginal.sol";
import "./MVerCollectible.sol";

contract MVerFactory {
    MVerOriginal public immutable originalContract;

    event ContentCreated(
        uint256 indexed originalTokenId,
        address indexed creator,
        address collectibleContract
    );

    constructor(address _originalContract) {
        originalContract = MVerOriginal(_originalContract);
    }

    function createContent(
        string memory title,
        string memory genre,
        string memory originalUri,
        string memory collectibleUri,
        uint256 price,
        uint256 maxSupply
    ) external returns (uint256, address) {
        // Check if factory is approved
        require(
            originalContract.isApprovedForAll(msg.sender, address(this)),
            "Factory not approved"
        );

        // 1. Create original content first
        uint256 tokenId = originalContract.createContent(
            title,
            genre,
            originalUri,
            address(0) // Temporary address, will be updated
        );

        // 2. Deploy collectible contract with the correct tokenId
        MVerCollectible collectible = new MVerCollectible(
            address(originalContract),
            tokenId,
            msg.sender,
            price,
            maxSupply,
            collectibleUri
        );

        // 3. Update the collectible contract address in the original content
        originalContract.updateCollectibleContract(tokenId, address(collectible));

        emit ContentCreated(
            tokenId,
            msg.sender,
            address(collectible)
        );

        return (tokenId, address(collectible));
    }
}