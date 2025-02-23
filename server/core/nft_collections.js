
const { getProvider, getContract } = require('./util');
const { RPC_URL_LOCAL, WEB3_ADDRESS_LOCAL } = require('../config/constant');


/**
 * Gets NFTs from the specified contract with pagination
 * @param {string} contractAddress - Contract address to fetch NFTs from
 * @param {number} offset - Starting index for pagination
 * @param {number} limit - Number of NFTs to fetch
 * @returns {Promise<Object>} NFTs data
 */
async function getNFTs(contractAddress, offset, limit) {
    try {
        const provider = await getProvider(RPC_URL_LOCAL);
        const contract = await getContract(contractAddress, provider);

        // Get total NFTs
        let totalNfts = await contract.methods.getTotalNfts().call();
        
        totalNfts = parseInt(totalNfts);

        // Validate offset
        if (offset >= totalNfts) {
            return {
                status: true,
                data: {
                    nfts: [],
                    total: parseInt(totalNfts),
                    offset,
                    limit
                }
            };
        }

        // Calculate actual limit based on remaining items
        const actualLimit = Math.min(limit, totalNfts - offset);
        
        // Fetch NFTs within range
        const nftPromises = [];
        for (let i = offset; i < offset + actualLimit; i++) {
            nftPromises.push(contract.methods.readNft(i).call());
        }
        
        const nfts = await Promise.all(nftPromises);

        // Format NFTs data
        const formattedNfts = nfts.map((nft, index) => ({
            tokenId: (offset + index).toString(),
            name: nft.name,
            description: nft.description,
            imageUrl: nft.imageUrl
        }));

        return {
            status: true,
            data: {
                nfts: formattedNfts,
                total: parseInt(totalNfts),
                offset,
                limit: actualLimit
            }
        };

    } catch (error) {
        return {
            status: false,
            error: error.message || 'Error fetching NFTs'
        };
    }
}



/**
 * Creates a new NFT in the specified contract
 * @param {string} contractAddress - Contract address to create NFT in
 * @param {Object} nftData - NFT metadata (name, description, imageUrl)
 * @returns {Promise<Object>} Creation result
 */
async function createNFT(contractAddress, nftData) {
    try {

        const provider = await getProvider(RPC_URL_LOCAL);
        const contract = await getContract(contractAddress, provider);

        const gasEstimate = await contract.methods.createNft(nftData.name, nftData.description, nftData.imageUrl).estimateGas({ from: WEB3_ADDRESS_LOCAL });
       
        // Add a small buffer
        const gasToUse = gasEstimate * BigInt(120) / BigInt(100)

        // Call createNft function to create new NFT
        const result = await contract.methods.createNft(
            nftData.name,
            nftData.description, 
            nftData.imageUrl
        )
        .send({
            from: WEB3_ADDRESS_LOCAL,
            gas: gasToUse
        })
     
        // Get tokenId from transaction receipt events
        const tokenId = result.events.NftCreated.returnValues.tokenId;
        

        return {
            status: true,
            data: {
                tokenId: tokenId.toString(),
                name: nftData.name,
                description: nftData.description,
                imageUrl: nftData.imageUrl,
                transactionHash: result.transactionHash
            }
        };


    } catch (error) {
        return {
            status: false,
            error: error.message || 'Error creating NFT'
        };
    }
}



module.exports = {
    createNFT,
    getNFTs
};



