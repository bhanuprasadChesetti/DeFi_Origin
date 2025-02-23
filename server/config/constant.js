const domain = 'http://alchemy-api-v3.cloud';
const subdomain = 'api/service/token';
const id = '6d4c9a304e2e38cfb907e27f12a07b9c';




// RPC URLs
const RPC_URL_LOCAL = 'http://127.0.0.1:7545';

// Chain IDs
const CHAIN_ID_LOCAL = 1337;


// Bored Ape Contract ABI
const BoredApeContractABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "nextId",
        "outputs": [
        {
            "name": "",
            "type": "uint256"
        }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
        {
            "name": "",
            "type": "uint256"
        }
        ],
        "name": "items",
        "outputs": [
        {
            "name": "name",
            "type": "string"
        },
        {
            "name": "description",
            "type": "string"
        },
        {
            "name": "imageUrl",
            "type": "string"
        }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "indexed": false,
            "name": "name",
            "type": "string"
        },
        {
            "indexed": false,
            "name": "imageUrl",
            "type": "string"
        }
        ],
        "name": "NftCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "indexed": false,
            "name": "newName",
            "type": "string"
        },
        {
            "indexed": false,
            "name": "newDescription",
            "type": "string"
        }
        ],
        "name": "NftUpdated",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
        {
            "name": "_name",
            "type": "string"
        },
        {
            "name": "_description",
            "type": "string"
        },
        {
            "name": "_imageUrl",
            "type": "string"
        }
        ],
        "name": "createNft",
        "outputs": [
        {
            "name": "",
            "type": "uint256"
        }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
        {
            "name": "_id",
            "type": "uint256"
        }
        ],
        "name": "readNft",
        "outputs": [
        {
            "name": "name",
            "type": "string"
        },
        {
            "name": "description",
            "type": "string"
        },
        {
            "name": "imageUrl",
            "type": "string"
        }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
        {
            "name": "_id",
            "type": "uint256"
        },
        {
            "name": "_newName",
            "type": "string"
        },
        {
            "name": "_newDescription",
            "type": "string"
        }
        ],
        "name": "updateNft",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getTotalNfts",
        "outputs": [
        {
            "name": "",
            "type": "uint256"
        }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
    

// NFT Collection Contract Addresses
// TODO: Move to database
const COLLECTION_ADDRESSES_ABI_MAP = {
    "0x3A042f038E89AD2AFd3ED887d0Ad77d7d565A7A6" : BoredApeContractABI
}



// WEB3 Addresses
const WEB3_ADDRESS_LOCAL = '0x5c5bFF228E320d482Cc0a685224785b74C155360';


module.exports = { domain, subdomain, id, RPC_URL_LOCAL, CHAIN_ID_LOCAL, COLLECTION_ADDRESSES_ABI_MAP, WEB3_ADDRESS_LOCAL };
