
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { ethers } = require("ethers"); 
const { createNFT, getNFTs } = require('../../core/nft_collections');



// Validate GET NFTs API query parameters
const validateGetNfts = Joi.object({
    collection_contract_address: Joi.string().required().trim().pattern(/^0x[a-fA-F0-9]{40}$/),
    offset: Joi.number().integer().min(0).default(0),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }).unknown(false); 
  
 


// @route    GET api/bhanuapitest
// @desc     Get NFTs for given collection contract address
// @access   Public
router.get('/', async (req, res) => {

    try {


        // Validate query parameters  
        const { error, value: validatedParams } = validateGetNfts.validate(req.query);
        if (error) {
        return res.status(400).json({ 
                status: 'error',
                msg: 'Invalid query parameters',
                error: error.message 
            });
        }

        const { collection_contract_address, offset, limit } = validatedParams;
        

        // Fetch NFTs 
        const result = await getNFTs(collection_contract_address, offset, limit);

        if (!result.status) {
            return res.status(400).json({
                status: 'error',
                msg: 'Failed to fetch NFTs',
                error: result.error
            });
        }

        res.json({
            status: true,
            msg: 'NFTs fetched successfully',
            data: result.data
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});




// Validation schema for NFT creation
const validateCreateNft = Joi.object({
  name: Joi.string()
    .required()
    .min(1)
    .max(100)
    .trim()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 1 characters', 
      'string.max': 'Name cannot exceed 100 characters'
    }),
  description: Joi.string()
    .optional()
    .allow('')
    .max(1000)
    .trim()
    .messages({
      'string.max': 'Description cannot exceed 1000 characters'
    }),
  imageUrl: Joi.string()
    .required()
    .uri()
    .trim()
    .messages({
      'string.empty': 'Image URL is required',
      'string.uri': 'Image URL must be a valid URL'
    }),
  contractAddress: Joi.string()
    .required()
    .trim()
    .pattern(/^0x[a-fA-F0-9]{40}$/)
    .messages({
      'string.empty': 'Contract address is required',
      'string.pattern.base': 'Contract address must be a valid Ethereum address'
    })
}).unknown(false);


// @route    POST api/bhanuapitest
// @desc     Create a new NFT item
// @access   Public
router.post('/', async (req, res) => {
    try {

        // Validate request body
        const { error, value: validatedParams } = validateCreateNft.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                msg: 'Invalid request body',
                error: error.message
            });
        }

        const { name, description, imageUrl, contractAddress } = validatedParams;

        // Call createNFT function from nft_collections.js
        const result = await createNFT(contractAddress, {
            name,
            description, 
            imageUrl
        });

        if (!result.status) {
            return res.status(400).json({
                status: 'error',
                msg: 'Failed to create NFT',
                error: result.error
            });
        }

        // Return the created NFT data
        res.json({
            status: true,
            msg: 'NFT created successfully',
            data: result.data
        });

        return;

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: 'error',
            msg: 'Error creating NFT',
            error: err.message
        });
    }
});



module.exports = router;

