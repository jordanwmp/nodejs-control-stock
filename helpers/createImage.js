const { Images } = require('../models/associations')

const createImage = async (productId, arrImages) => {
    const imagesRecords = arrImages.map((img) => {
        return { product_id: productId, image: img.filename }
    })

    await Images.bulkCreate(imagesRecords)
        .then(() => {
            console.log('Images created successfully')
        })
        .catch((err) => {
            console.log('Error on create images')
        })
}

module.exports = createImage