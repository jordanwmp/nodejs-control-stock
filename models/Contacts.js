const { DataTypes } = require('sequelize')
const connection = require('../db/connection')
const Supplies = require('./Supplies')

const Contacts = connection.define('Contacts', {
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
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

module.exports = Contacts