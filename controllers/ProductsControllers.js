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
                model: Products,
                include: [
                    {
                        model: Images
                    }
                ]
            }],
            plain: true
        })

        const products = user.Products.map((res) => {
            //return res.dataValues
            const productData = res.dataValues
            productData.image = res.Images.map(image => image.dataValues.image)[0]
            return productData
        })

        // console.log('PRODUCTS ', products)

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

            if (req.files && req.files.length > 0) {
                const imagePaths = req.files.map(file => file.filename)
                const imageRecords = imagePaths.map(name => ({
                    product_id: newProduct.id,
                    image: name
                }))
                await Images.bulkCreate(imageRecords)
            }
            req.flash('message', 'Product added successfully')
            res.redirect('/products/all')
        } catch (error) {
            console.log('Error on save products and images ', error)
        }
    }

    static async detail(req, res) {

        const productId =  23//req.params.id
        console.log('P ID ', JSON.stringify(productId))

        try {
            let images = []
            const products = await Products.findOne(
                { 
                    where: { id: productId }, 
                    include: [
                        {
                            model: Images
                        }
                    ],
                    plain: true 
            })
            
            const product = products.dataValues
            console.log('PRODUCT ', product)
           
            if (product) { 
                // Mapear os objetos de imagens associados ao produto 
                images = product.Images.map((img) => img.dataValues); 
                console.log('IMAGES ', images); 
            } else { 
                console.log('Product not found'); 
            }

            res.render('products/detail', { product, images })

        } catch (error) {
            console.log('Error on get detail page ', error)
        }
    }
}

module.exports = ProductsController