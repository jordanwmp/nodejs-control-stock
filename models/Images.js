const { DataTypes } = require('sequelize')
const connection = require('../db/connection')
const Products = require('./Products')

const Images = connection.define('Images', {
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Products,
            key: 'id'
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Images