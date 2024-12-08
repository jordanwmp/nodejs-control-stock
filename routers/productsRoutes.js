const express = require('express')
const router = express.Router()

const ProductsController = require('../controllers/ProductsControllers')
const upload = require('../helpers/uploadImage')


router.get('/all', ProductsController.all)
router.get('/add', ProductsController.add)
router.post('/save', upload.array('images', 5), ProductsController.save)
router.get('/detail/:id', ProductsController.detail)


module.exports = router