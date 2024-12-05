const Categories = require('./Categories')
const Supplies = require('./Supplies')
const Users = require('./Users')
const Contacts = require('./Contacts')
const Addresses = require('./Addresses')
const Products = require('./Products')
const Images = require('./Images')

//CATEGORY - PRODUCT RELATIONSHIP
Categories.hasMany(Products, { foreignKey: 'category_id' })
Products.belongsTo(Categories, { foreignKey: 'category_id' })

//SUPPLY - CONTACTS RELASHIONSHIP   
Supplies.hasMany(Contacts, { foreignKey: 'idSupply' })
Contacts.belongsTo(Supplies, { foreignKe: 'idSupply' })

//SUPPLY - ADDRESSES RELATIONSHIP
Supplies.hasMany(Addresses, { foreignKey: 'idSupply' })
Addresses.belongsTo(Supplies, { foreignKey: 'idSupply' })

// SUPPLY PRODUCT RELASHIONSHIP
Supplies.hasMany(Products, { foreignKey: 'supplier_id' })
Products.belongsTo(Supplies, { foreignKey: 'supplier_id' })

//PRODUCT IMAGE RELATIONSHIP
Products.hasMany(Images, { foreignKey: 'product_id' })
Images.belongsTo(Products, { foreignKey: 'product_id' })

//PRODUCT USER RELATIONSHIP
Users.hasMany(Products, {foreignKey: 'user_id'})
Products.belongsTo(Users, {foreignKey: 'user_id'})

module.exports = {
    Categories,
    Supplies,
    Users,
    Contacts,
    Addresses,
    Products,
    Images
}

