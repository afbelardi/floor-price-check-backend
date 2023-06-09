const mongoose = require('mongoose');


const nftSchema = mongoose.Schema({
    collectionName: {
        type: String, 
        required: true
    },
    floorPrice: {
        type: String,
        required: true
    },
    targetFloorPrice: {
        type: String,
        required: true
    }
});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;