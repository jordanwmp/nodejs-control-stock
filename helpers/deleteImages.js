const fs = require('fs')
const { Images } = require('../models/associations')
const deleteLocalImage  = require('./deleteLocalImage')

const deleteImage = async (productId) => {
    try {
        const images = await Images.findAll({
            where: { product_id: productId }
        })

        images.forEach((image) => {
            deleteLocalImage(image)
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = deleteImage