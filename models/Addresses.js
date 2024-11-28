const { DataTypes } = require('sequelize')
const connection = require('../db/connection')
const Supplies = require('./Supplies')

const Addresses = connection.define('Addresses', {
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    neighbor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.CHAR(2),
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idSupply:{
        type: DataTypes.INTEGER,
        references: {
            model: Supplies,
            key: 'id'
        }
    }
})

module.exports = Addresses