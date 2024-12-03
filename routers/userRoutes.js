const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.get('/login', UserController.login)
router.post('/access', UserController.access)
router.get('/register', UserController.register)
router.post('/register', UserController.create)

module.exports = router