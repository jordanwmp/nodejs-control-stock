const {
    Products,
    Users,
    Categories,
    Supplies,
    Images
} = require('../models/associations')


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

        console.log('products '.products)

        let empty = true
        if (products.length != 0) {
            empty = false
        }

        res.render('products/products', { products, empty })
    }

    static async add(req, res) {

        let suppliers = await Supplies.findAll()
        let categories = await Categories.findAll()

        suppliers = suppliers.map(supplier => supplier.get({ plain: true }))
        categories = categories.map(category => category.get({ plain: true }))

        console.log(suppliers)
        console.log(categories)

        res.render('products/add', { suppliers, categories })
    }

    static async save(req, res) {

        const {
            product,
            description,
            price,
            category_id,
            supplier_id,
            user_id
        } = req.body

        try {

            const newProduct = await Products.create({
                product,
                description,
                price,
                category_id,
                supplier_id,
                user_id
            })

            if(req.files && req.files.length > 0)
            {
                const imagePaths = req.files.map(file => file.filename)
                const imageRecords = imagePaths.map(name => ({
                    product_id: newProduct.id,
                    image: name
                })) 
                await Images.bulkCreate(imageRecords)
            }
            res.redirect('/products/all')
        } catch (error) {
            console.log('Error on save products and images ', error)
        }
    }
}

module.exports = ProductsController