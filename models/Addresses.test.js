//1. IMPORTANDO ARQUIVOS
const connection = require('../db/connection');
const Supplies = require('./Supplies'); // Caminho correto para a model Supplies
const Addresses = require('./Addresses'); // Caminho correto para a model Addresses

beforeAll(async () => {
  try {
    // Sincronize o banco de dados
    await connection.sync({ force: true });
    // Inicialize as models com a conexão existente
    await Supplies.init(connection);
    await Addresses.init(connection);

  } catch (error) {
    console.log('Error during setup:', error);
  }
});

afterAll(async () => {
  try {
    // Feche a conexão com o banco de dados
    await connection.close();
  } catch (error) {
    console.log('Error during teardown:', error);
  }
});

describe('Adresses Model', () => {

  it('should create an address instance correctly', async () => {

    const supply = await Supplies.create({ supplier: 'Supermercado Maranhão' });

    const address = await Addresses.create({
      street: 'Rua das Flores',
      neighbor: 'Centro',
      number: '123',
      city: 'São Luís',
      state: 'MA',
      code: '65000-000',
      idSupply: supply.id
    })

    expect(address.street).toBe('Rua das Flores')
    expect(address.neighbor).toBe('Centro')
    expect(address.number).toBe('123')
    expect(address.city).toBe('São Luís')
    expect(address.state).toBe('MA')
    expect(address.code).toBe('65000-000')
    expect(address.idSupply).toBe(supply.id)

  })

  it('should validate required fields', async () => {
    try {
      await Addresses.create({})
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError')
    }
  })

  it('should create an address with associations', async () => {

    const supply = await Supplies.create({
      supplier: 'Banco Maranhão'
    })

    const address = await Addresses.create({
      street: 'Rua das Flores',
      neighbor: 'Centro',
      number: '123',
      city: 'São Luís',
      state: 'MA',
      code: '65000-000',
      idSupply: supply.id
    })

    expect(address.idSupply).toBe(supply.id)

  })

})

//describe
//it
