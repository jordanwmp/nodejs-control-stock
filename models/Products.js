const { DataTypes } = require('sequelize')
const connection = require('../db/connection')
const Categories = require('./Categories')
const Supplies = require('./Supplies')

const Products = connection.define('Products', {
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Categories,
            key: 'id'
        }
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Supplies,
            key: 'id'
        }
    }  
})

module.exports = Products