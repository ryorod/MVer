// contracts/MVerOriginal.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MVerOriginal is ERC721, ERC721URIStorage, ERC721Enumerable {
    uint256 private _tokenIds;

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

    constructor() ERC721("MVer Original", "KORG") {}

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
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

// contracts/MVerCollectible.sol
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

// contracts/MVerFactory.sol
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
        // 1. Deploy collectible contract
        MVerCollectible collectible = new MVerCollectible(
            address(originalContract),
            0, // Will be updated after original creation
            msg.sender,
            price,
            maxSupply,
            collectibleUri
        );

        // 2. Create original content
        uint256 tokenId = originalContract.createContent(
            title,
            genre,
            originalUri,
            address(collectible)
        );

        emit ContentCreated(
            tokenId,
            msg.sender,
            address(collectible)
        );

        return (tokenId, address(collectible));
    }
}