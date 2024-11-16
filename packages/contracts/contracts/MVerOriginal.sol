// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MVerOriginal is ERC721URIStorage, ERC721Enumerable {
    uint256 private _tokenIds;
    address public factory;

    struct OriginalContent {
        string title;
        string genre;
        uint256 createdAt;
        uint256 likes;
        address collectibleContract;
        address creator;
    }

    mapping(uint256 => OriginalContent) public originals;
    mapping(uint256 => mapping(address => bool)) private _hasLiked;
    mapping(address => uint256[]) public creatorContent;

    event ContentCreated(
        uint256 indexed tokenId,
        address indexed creator,
        string title,
        string genre,
        address collectibleContract
    );

    event ContentLiked(
        uint256 indexed tokenId,
        address indexed liker,
        uint256 newLikeCount
    );

    constructor() ERC721("MVer Original", "MVERO") {}

    function setFactory(address _factory) external {
        require(factory == address(0), "Factory already set");
        require(_factory != address(0), "Invalid factory address");
        factory = _factory;
    }

    function createContent(
        string memory title,
        string memory genre,
        string memory uri,
        address collectibleContract
    ) external returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);

        originals[newTokenId] = OriginalContent({
            title: title,
            genre: genre,
            createdAt: block.timestamp,
            likes: 0,
            collectibleContract: collectibleContract,
            creator: msg.sender
        });

        creatorContent[msg.sender].push(newTokenId);

        emit ContentCreated(
            newTokenId,
            msg.sender,
            title,
            genre,
            collectibleContract
        );

        return newTokenId;
    }

    function updateCollectibleContract(uint256 tokenId, address collectibleContract) external {
        require(msg.sender == factory, "Only factory can update");
        require(_ownerOf(tokenId) != address(0), "Content doesn't exist");
        originals[tokenId].collectibleContract = collectibleContract;
    }

    function likeContent(uint256 tokenId) external {
        require(_ownerOf(tokenId) != address(0), "Content doesn't exist");
        require(!_hasLiked[tokenId][msg.sender], "Already liked");
        
        originals[tokenId].likes++;
        _hasLiked[tokenId][msg.sender] = true;

        emit ContentLiked(tokenId, msg.sender, originals[tokenId].likes);
    }

    function hasLiked(uint256 tokenId, address user) public view returns (bool) {
        return _hasLiked[tokenId][user];
    }

    function getLikes(uint256 tokenId) public view returns (uint256) {
        require(_ownerOf(tokenId) != address(0), "Content doesn't exist");
        return originals[tokenId].likes;
    }

    function setApprovalForFactory(bool approved) external {
        setApprovalForAll(factory, approved);
    }

    // Required overrides...
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
