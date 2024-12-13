const express = require('express')
const router = express.Router()

const ProductsController = require('../controllers/ProductsControllers')
const upload = require('../helpers/uploadImage')


router.put('/update', upload.array('images', 5), ProductsController.update)
router.get('/all', ProductsController.all)
router.get('/add', ProductsController.add)
router.get('/detail/:id', ProductsController.detail)
router.post('/save', upload.array('images', 5), ProductsController.save)
router.get('/edit/:id', ProductsController.edit)
router.delete('/delete', ProductsController.delete)

module.exports = router