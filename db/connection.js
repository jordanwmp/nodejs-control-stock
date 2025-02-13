const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'nodestock_test',
    'root',
    '',
    // process.env.DB_NAME, 
    // process.env.DB_USER, 
    // process.env.DB_PASS, 
    {//// host: process.env.DB_HOST,
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
})

try {
    const con = async () =>{
        await sequelize.authenticate()
    }
    con()
    console.log('Database connected successfully...')
} catch (error) {
    console.log('Error on database connection ', error)
}

module.exports = sequelize