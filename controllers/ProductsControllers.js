// const Users = require('../models/Users')
// const Products = require('../models/Products')

const { Products, Users } = require('../models/associations')

const { Op } = require('sequelize')

class ProductsController {

    static async all(req, res) {

        const userId = req.session.userid

        const user = await Users.findOne({
            where: { id: userId },
            include: [{
                model: Products
            }],
            plain: true
        })

        console.log('user ', user)
        
        const products = user.Products.map((res) => {
            return res.dataValues
        })

        console.log('products '. products)

        let empty = true
        if(products.length != 0)
        {
            empty = false
        }

        res.render('products/products', { products, empty })
    }

}

module.exports = ProductsController