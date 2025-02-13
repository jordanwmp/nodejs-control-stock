const { Images } = require('../models/associations')
const deleteLocalImage = require('./deleteLocalImage')
const createImage = require('./createImage')
const updateImages = require('./updateImages')

jest.mock('../models/associations', () => ({
    Images: { destroy: jest.fn() }
}))

jest.mock('./deleteLocalImage', () => jest.fn())
jest.mock('./createImage', () => jest.fn())

describe('updateImages', () => {

    beforeEach(() => {
        Images.destroy.mockClear()
        deleteLocalImage.mockClear()
        createImage.mockClear()
    })

    it('should delete images and call deleteLocalImage', async () => {
        const productId = 1
        const newImages = []
        const deletedImages = 'image1.jpg, image2.jpg'

        Images.destroy.mockResolvedValue()

        await updateImages(productId, newImages, deletedImages)

        expect(Images.destroy).toHaveBeenCalledTimes(1)
        expect(Images.destroy).toHaveBeenCalledWith({
            where: {
                image: ['image1.jpg', 'image2.jpg'],
                product_id: productId
            }
        })
        expect(deleteLocalImage).toHaveBeenCalledTimes(2)
        expect(deleteLocalImage).toHaveBeenCalledWith('image1.jpg')
        expect(deleteLocalImage).toHaveBeenCalledWith('image2.jpg')
    })


    it('should create images if new images is empty', async () => {
        const productId = 1
        const newImages = [
            { filename: 'newImage1.jpg' },
            { filename: 'newImage2.jpg' }
        ]
        const deletedImages = ''

        createImage.mockResolvedValue()

        await updateImages(productId, newImages, deletedImages)

        expect(createImage).toHaveBeenCalledTimes(1)
        expect(createImage).toHaveBeenCalledWith(productId, newImages)
    })

    it('should veirfy errors on delete images', async () => {
        
        const productId = 1
        const newImages = []
        const deletedImages = 'image1.jpg, image2.jpg'
        const error = new Error('Erro ao deletar imagens')

        Images.destroy.mockRejectedValue(error)

        await updateImages(productId, newImages, deletedImages)

        expect(Images.destroy).toHaveBeenCalledTimes(1)
        expect(Images.destroy).toHaveBeenCalledWith({
            where: {
                image: ['image1.jpg', 'image2.jpg'],
                product_id: productId
            }
        })
        expect(deleteLocalImage).not.toHaveBeenCalled()
    })

})
