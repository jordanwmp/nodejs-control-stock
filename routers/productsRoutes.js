const express = require('express')
const router = express.Router()

const ProductsController = require('../controllers/ProductsControllers')
const upload = require('../helpers/uploadImage')

router.post('/save', upload.array('images', 5), ProductsController.save)
router.get('/all', ProductsController.all)
router.get('/add', ProductsController.add)


module.exports = router