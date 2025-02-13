// const mockConsole = require('jest-mock-console').default
const { Images } = require('../models/associations')
const createImage = require('./createImage')

jest.mock('../models/associations', ()=>({
    Images:{
        bulkCreate: jest.fn()
    }
}))

describe('createImage', ()=>{
    
    beforeEach(()=>{
        Images.bulkCreate.mockClear()
    })

    it('should create a image with success', async ()=>{
        Images.bulkCreate.mockResolvedValue()

        const productId = 1
        const arrImages = [
            { filename: 'image1.jpg' },
            { filename: 'image2.jpg' }
        ]

        await createImage(productId, arrImages)
        expect(Images.bulkCreate).toHaveBeenCalledTimes(1)
        expect(Images.bulkCreate).toHaveBeenCalledWith([
            { product_id: productId, image: 'image1.jpg' },
            { product_id: productId, image: 'image2.jpg' }
        ])
    })  

    it('should verify errors on create image', async () => {
        const error = new Error('Erro ao criar imagens')
        Images.bulkCreate.mockRejectedValue(error)

        const productId = 1
        const arrImages = [
            { filename: 'image1.jpg' },
            { filename: 'image2.jpg' }
        ]
        console.log = jest.fn(); // Mock console.log
        await createImage(productId, arrImages)

        expect(Images.bulkCreate).toHaveBeenCalledTimes(1)
        expect(console.log).toHaveBeenCalledWith('Error on create images')

    })
})