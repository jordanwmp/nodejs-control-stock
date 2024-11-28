const { DataTypes } = require('sequelize')
const connection = require('../db/connection')

const Categories = connection.define('Categories', {
    category:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Categories