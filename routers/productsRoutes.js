const express = require('express')
const router = express.Router()

const ProductsController = require('../controllers/ProductsControllers')
const upload = require('../helpers/uploadImage')


router.get('/all', ProductsController.all)
router.get('/add', ProductsController.add)
router.get('/detail/:id', ProductsController.detail)
router.delete('/delete', ProductsController.delete)
router.post('/save', upload.array('images', 5), ProductsController.save)

module.exports = router