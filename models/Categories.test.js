//1. IMPORTA ARQUIVIS
const connection = require('../db/connection')
const Categories = require('./Categories')

beforeAll(async () => {
  try {

    await connection.sync({ force: true })
    await Categories.init(connection)

  } catch (error) {
    console.log('Error during setup ', error)
  }
})

afterAll(async () => {
  try {
    await connection.close()
  } catch (error) {
    console.log('Error during teardown', error)
  }
})

describe('Categories Models', () => {

  it('should create a category instance correctly', async () => {

    const category = await Categories.create({
      category: 'Eletrodomestico',
      description: 'Os melhores eletrônicos para a sua casa'
    })

    expect(category.category).toBe('Eletrodomestico')
    expect(category.description).toBe('Os melhores eletrônicos para a sua casa')

  })

  it('should validate required fields', async () => {
    try {
      await Categories.create({})
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError')
    }
  })

})


//describe
//it