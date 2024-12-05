const express = require('express')
const router = express.Router()

const ProductsController = require('../controllers/ProductsControllers')

router.get('/all', ProductsController.all)

module.exports = router