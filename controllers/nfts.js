const NFT = require('../models/NFT');
const express = require('express');
const nftRouter = express.Router();
const axios = require('axios');
const app = express();



// CREATE

nftRouter.post('/', async (req, res) => {
    try {
        const newNFT = await NFT.create(req.body)

        res
            .status(200)
            .send(newNFT)
    } catch (error) {
        res
            .status(400)
            .json(error)
    }
})




// READ







// UPDATE



//DESTROY


module.exports = nftRouter;