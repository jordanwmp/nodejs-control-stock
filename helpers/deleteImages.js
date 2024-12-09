const fs = require('fs')
const path = require('path')
const { Images } = require('../models/associations')

const deleteImage = async (productId) => {
    try {
        const images = await Images.findAll({
            where: { product_id: productId }
        })
        console.log('IMAGE ON DELETE ', images)
        
        images.forEach((image)=>{
            const filePath = path.join(__dirname, '../public/uploads', image.image)
            fs.unlink(filePath, err => {
                if(err)
                {
                    console.log('Error on delete image ', err)
                }else{
                    console.log(`Image deletede successfully ${image.image}`)
                }
            })
        })

    } catch (error) {
        console.log('ERROR ON DELETE  IMAGE ', error)
    }
}

module.exports = deleteImage