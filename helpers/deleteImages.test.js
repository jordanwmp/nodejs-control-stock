const { Images } = require('../models/associations')
const deleteLocalImage = require('./deleteLocalImage')
const deleteImage = require('./deleteImages')

jest.mock('../models/associations', ()=>({
    Images: {
        findAll: jest.fn()
    }
}))

jest.mock('./deleteLocalImage', ()=> jest.fn())

describe('deleteImages', ()=>{

    beforeEach(()=>{
        Images.findAll.mockClear()
        deleteLocalImage.mockClear()
    })

    it('should delete images from a product', async () => {
        const mockImages = [
            { filename: 'image1.jpg' },
            { filename: 'image2.jpg' }
        ]
        Images.findAll.mockResolvedValue(mockImages)

        await deleteImage(1)

        expect(Images.findAll).toHaveBeenCalledTimes(1)
        expect(Images.findAll).toHaveBeenCalledWith({
            where: { product_id: 1 }
        })
        expect(deleteLocalImage).toHaveBeenCalledTimes(mockImages.length)
        mockImages.forEach((image) => {
            expect(deleteLocalImage).toHaveBeenCalledWith(image)
        })
    })

    it('should verify errors on search by images', async () => {
        const error = new Error('Erro ao buscar imagens')
        Images.findAll.mockRejectedValue(error)

        await deleteImage(1)

        expect(Images.findAll).toHaveBeenCalledTimes(1)
        expect(Images.findAll).toHaveBeenCalledWith({
            where: { product_id: 1 }
        })
        expect(deleteLocalImage).not.toHaveBeenCalled()
    })

})