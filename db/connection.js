const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'nodestock_test',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
    })

try {
    const con = async () => {
        await sequelize.authenticate()
    }
    con()
    console.log('Database connected successfully...')
} catch (error) {
    console.log('Error on database connection ', error)
}

module.exports = sequelize