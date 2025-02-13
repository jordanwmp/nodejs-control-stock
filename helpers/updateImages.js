const fs = require('fs')

const deleteLocalImage = require('./deleteLocalImage')
const createImage = require('./createImage')

const { Images } = require('../models/associations')

const updateImages = async (productId, newImages, deletedImages) => {
    
    if (deletedImages) {
        const del = deletedImages.split(',').map(img => img.trim());
    
        Images.destroy({
            where: {
                image: del,
                product_id: productId
            }
        })
        .then(() => {
            console.log('Images deleted');
            del.forEach(img => deleteLocalImage(img));
        })
        .catch((e) => {
            console.log('Error on delete images', e);
        });
    }
    
    if (newImages.length != 0) {
        createImage(productId, newImages)
    }
}

module.exports = updateImages