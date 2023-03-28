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

nftRouter.get('/:id', async (req, res) => {
    try {   
        const foundNFT = await NFT.findById(req.params.id)
        res
            .status(200)
            .json(foundNFT)
    } catch (error) {
        res
            .status(400)
            .json(error)
    }
});

//READ ALL

nftRouter.get('/', async (req, res) => {
    try {
        const foundNFTS = await NFT.find({})
        res
            .status(200)
            .json(foundNFTS)

    } catch(error) {
        res
            .status(400)
            .json(error)
    }
})







// UPDATE

nftRouter.put('/:id', async (req, res) => {
    try {
        const foundNFT = await NFT.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res
            .status(200)
            .json(foundNFT)
    } catch(error) {
        res
            .status(400)
            .json(error)
    }
})



//DESTROY

nftRouter.delete('/:id', async (req, res) => {
    try {
        const deletedNFT = await NFT.findByIdAndDelete(req.params.id);
        res
            .status(200)
            .send("Deleted");
    } catch(error) {
        res
            .status(400)
            .json(error)
    }
})


module.exports = nftRouter;