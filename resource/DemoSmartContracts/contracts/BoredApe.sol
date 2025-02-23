// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


/**
 * @title Bored Ape NFT
 * @dev A super basic "NFT-like" contract for demo CRUD operations.
 *      NOT an ERC-721 or any official standard, just for learning!
 */
contract BoredApe {
    // Define the NFT structure
    struct NftItem {
        string name;
        string description;
        string imageUrl;
    }

    // Mapping from ID to NftItem
    mapping(uint => NftItem) public items;
    
    // Counter for unique IDs
    uint public nextId;

    // Events for better tracking
    event NftCreated(uint indexed tokenId, string name, string imageUrl);
    event NftUpdated(uint indexed tokenId, string newName, string newDescription);
    
    /**
     * @dev Create a new "NftItem" and store it in 'items'
     * @param _name The name of the NFT
     * @param _description A description of the NFT
     * @param _imageUrl URL pointing to the NFT's image
     * @return tokenId The ID assigned to the newly created item
     */
    function createNft(
        string memory _name,
        string memory _description,
        string memory _imageUrl
    ) public returns (uint) {
        uint tokenId = nextId;
        items[tokenId] = NftItem(_name, _description, _imageUrl);
        emit NftCreated(tokenId, _name, _imageUrl);
        nextId++;
        return tokenId;
    }
    
    /**
     * @dev Retrieve an NftItem by ID
     * @param _id The ID of the item to retrieve
     * @return name The name of the item
     * @return description The description of the item
     * @return imageUrl The image URL of the item
     */
    function readNft(uint _id) public view returns (
        string memory name,
        string memory description,
        string memory imageUrl
    ) {
        return (items[_id].name, items[_id].description, items[_id].imageUrl);
    }

    /**
     * @dev Update an existing NftItem's data
     * @param _id The ID of the item to update
     * @param _newName The new name
     * @param _newDescription The new description
     */
    function updateNft(
        uint _id,
        string memory _newName,
        string memory _newDescription
    ) public {
        items[_id].name = _newName;
        items[_id].description = _newDescription;
        emit NftUpdated(_id, _newName, _newDescription);
    }


    /**
     * @dev Get total number of NFTs created
     * @return total The total number of NFTs (nextId + 1)
     */
    function getTotalNfts() public view returns (uint) {
        return nextId;
    }
}
