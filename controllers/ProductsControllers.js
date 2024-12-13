const {
    Products,
    Users,
    Categories,
    Supplies,
    Images
} = require('../models/associations')

const deleteImage = require('../helpers/deleteImages')
const updateImage = require('../helpers/updateImages')

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

        const productId = req.params.id
        console.log('P ID ', productId, req.params)

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
            // console.log('PRODUCT ', product)

            if (product) {
                // Mapear os objetos de imagens associados ao produto 
                images = product.Images.map((img) => img.dataValues);
                // console.log('IMAGES ', images); 
            } else {
                console.log('Product not found');
            }

            res.render('products/detail', { product, images })

        } catch (error) {
            console.log('Error on get detail page ', error)
        }
    }

    static async edit(req, res) {
        const id = req.params.id
        try {
            const paramns = {
                where: { id: id },
                include: [
                    {
                        model: Images
                    }
                ],
                plain: true
            }

            let images = []
            const product = (await Products.findOne(paramns)).dataValues

            console.log('PRODUCTS FOR EDIT ', product)

            if (product) {
                images = product.Images.map(img => img.dataValues)
                console.log('IMAGES ', images)
            } else {
                console.log('empty images for edit product')
            }

            const suppliers = (await Supplies.findAll()).map(sup => sup.get({ plain: true }))
            const categories = (await Categories.findAll()).map(cat => cat.get({ plain: true }))

            console.log('SUPPLIERS ', suppliers)
            console.log('CATEGORIES ', categories)

            res.render('products/edit', { product, images, suppliers, categories })

        } catch (error) {
            console.log('Erro on get product to edit page ', error)
        }
    }

    static async update(req, res) {
        console.log('BODY ', req.body)
        console.log('FILES ', req.files)
        const { id, product, description, price, category_id, supplier_id, user_id, removedImages } = req.body
        const files = req.files
        if(!id) return
        try {
            const productUpdate = {
                product,
                description,
                price,
                category_id,
                supplier_id,
                user_id
            }
            await Products.update(productUpdate, { where: { id: id } })
            .then(()=>{
                console.log('It will update images on database')
                updateImage(id, files, removedImages)
            })
            .then(()=>{
                req.flash('message', 'Product updated successfully')
                req.session.save(()=>{
                    res.redirect(`/products/detail/${id}`)
                })
            })
            .catch((err)=>[
                console.log('Error on update product ', err)
            ])
        } catch (error) {
            console.log('Error on update  product ', error)
        }
    }

    static async delete(req, res) {
        const { id } = req.body
        try {

            await deleteImage(id)

            await Products.destroy({
                where: { id: id }
            })
            req.flash('message', 'Product deleted successfully')
            // res.redirect('/products/all')
            res.render('products/products')
        } catch (error) {
            console.log('error on delete product ', error)
        }
    }
}

module.exports = ProductsController