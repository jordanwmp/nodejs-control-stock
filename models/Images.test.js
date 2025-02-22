const connection = require('../db/connection')
const Supplies = require('./Supplies')
const Users = require('./Users')
const Categories = require('./Categories')
const Products = require('./Products')
const Images = require('./Images')

beforeAll(async () => {
  try {
    await connection.sync()
    Categories.init(connection)
    Users.init(connection)
    Supplies.init(connection)
    Products.init(connection)
    Images.init(connection)
  } catch (error) {
    console.log('Erro during setup ', error)
  }
})

afterAll(async () => {
  try {
    await connection.close()
  } catch (error) {
    console.log('Error during teardown ', error)
  }
})

/** 
 * ####### PRODUTO ########
 * product varchar(255) 
  description longtext 
  price decimal(10,2) 
  category_id int 
  supplier_id int 
  user_id int

  ####### USERs #######
  firstname varchar(255) 
  lastname varchar(255) 
  password varchar(255) 
  email

  ####### SUPPLY  ######
  supplier
 */


describe('Images Model', () => {

  it('should create an image instance correctly', async () => {

    const category = await Categories.create({
      category: 'Casa',
      description: 'Produtos para casa'
    })

    const code = new Date().getTime()

    const users = await Users.create({
      firstname: 'John',
      lastname: 'Doe',
      password: '123',
      email: code + '@email.com'
    })

    const supply = await Supplies.create({
      supplier: 'Lojas Rosário'
    })

    const product = await Products.create({
      product: 'Celular',
      description: 'Smarthphone Samsung 128GB',
      price: 100.00,
      category_id: category.id,
      supplier_id: supply.id,
      user_id: users.id
    })

    const image = await Images.create({
      product_id: product.id,
      image: 'img1.png'
    })

    expect(image.product_id).toBe(product.id)
    expect(image.image).toBe('img1.png')

  })

  it('should validate required fields', async () => {
    try {
      await Images.create({})
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError')
    }
  })

  it('should create an image instance correctly', async () => {

    const category = await Categories.create({
      category: 'Casa',
      description: 'Produtos para casa'
    })

    const code = new Date().getTime()

    const users = await Users.create({
      firstname: 'John',
      lastname: 'Doe',
      password: '123',
      email: code + '@email.com'
    })

    const supply = await Supplies.create({
      supplier: 'Lojas Rosário'
    })

    const product = await Products.create({
      product: 'Celular',
      description: 'Smarthphone Samsung 128GB',
      price: 100.00,
      category_id: category.id,
      supplier_id: supply.id,
      user_id: users.id
    })

    const image = await Images.create({
      product_id: product.id,
      image: 'img1.png'
    })

    expect(image.product_id).toBe(product.id)
  })

})

//describe
//it
