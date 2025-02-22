const connection = require('../db/connection')
const Supplies = require('./Supplies')
const Contacts = require('./Contacts')

beforeAll(async () => {
  try {
    await connection.sync();
    await Supplies.init(connection)
    await Contacts.init(connection)
  } catch (error) {
    console.log('Error during setup', error)
  }
})

afterAll(async () => {
  try {
    await connection.close()
  } catch (error) {
    console.log('Error during teardown', error)
  }
})

describe('Contacts Model', () => {

  it('should create and contact instance corretly', async () => {

    const supply = await Supplies.create({
      supplier: 'Supermercado Rosário'
    })

    const contact = await Contacts.create({
      phone: '9999-9999',
      email: 'exemplo@email.com',
      idSupply: supply.id
    })

    expect(contact.phone).toBe('9999-9999')
    expect(contact.email).toBe('exemplo@email.com')
    expect(contact.idSupply).toBe(supply.id)

  })

  it('should validate required fields', async () => {
    try {
      await Contacts.create({})
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError')
    }
  })

  it('should create contact with associations', async () => {

    const supply = await Supplies.create({
      supplier: 'Loja Rosário'
    })

    const contact = await Contacts.create({
      phone: '9999-0000',
      email: 'example@email.com',
      idSupply: supply.id
    })

    expect(contact.idSupply).toBe(supply.id)

  })
})

//describe
//it