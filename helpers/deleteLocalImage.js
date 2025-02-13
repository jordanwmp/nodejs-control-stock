const fs =  require('fs')
const path = require('path')

const deleteLocalImage = (imageName) =>{
    try {
        const filePath = path.join(__dirname, '../public/uploads', imageName)
        fs.unlink(filePath, (err)=>{
            if(err){
                console.log('Local image not delete ', err)
            }else{
                console.log('Local image delete successfully')
            }
        })
    } catch (error) {
        console.log('Error on delete local image ', error)   
    }
}

module.exports = deleteLocalImage