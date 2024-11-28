const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodestock', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Database connected successfully...')
} catch (error) {
    console.log('Error on database connection ', error)
}

module.exports = sequelize