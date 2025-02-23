const { Web3 } = require('web3');
const axios = require('axios');
const { RPC_URL_LOCAL, CHAIN_ID_LOCAL, COLLECTION_ADDRESSES_ABI_MAP } = require('../config/constant');





/**
 * Fetches ABI information for a given contract address using Alchemy API
 * @param {string} contractAddress - Ethereum contract address
 * @returns {Promise<Object>} Contract ABI data
 */
async function getContractABI(contractAddress) {
    try {
        // Check if contract address exists in our mapping
        if (!(contractAddress in COLLECTION_ADDRESSES_ABI_MAP)) {
            throw new Error('Contract address not found in supported collections');
        }

        // Return the ABI for the contract address
        return {
            success: true,
            abi: COLLECTION_ADDRESSES_ABI_MAP[contractAddress]
        };

    } catch (error) {
        return {
            success: false,
            error: error.message || 'Error fetching contract ABI'
        };
    }
}





/**
 * Returns a Web3 provider instance connected to local network
 * @param {string} rpcUrl - RPC URL for the network
 * @returns {Promise<Web3>} Web3 provider instance
 */
async function getProvider(rpcUrl) {
    try {
        const web3 = new Web3(rpcUrl);
        
        // Test the connection
        const isConnected = await web3.eth.net.isListening();
        if (isConnected) {
            console.log('Provider created successfully');
        }
        return web3;
    } catch (error) {
        throw new Error(`Failed to initialize provider: ${error.message}`);
    }
}




/**
 * Creates and returns a contract instance
 * @param {string} contractAddress - Contract address
 * @param {Web3} web3 - Web3 instance 
 * @returns {Promise<Object>} Contract instance
 */
async function getContract(contractAddress, web3) {
    try {
        const abiResponse = await getContractABI(contractAddress);
        if (!abiResponse.success) {
            throw new Error(`Failed to get ABI: ${abiResponse.error}`);
        }


        const contract = new web3.eth.Contract(
            abiResponse.abi,
            contractAddress
        );
        
        return contract;
    } catch (error) {
        throw new Error(`Failed to create contract instance: ${error.message}`);
    }
}


module.exports = {
    getContractABI,
    getProvider,
    getContract
};
