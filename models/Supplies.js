const { DataTypes } = require('sequelize')
const connection = require('../db/connection')

const Supplies = connection.define('Supplies', {
    supplier: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Supplies