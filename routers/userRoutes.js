const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.get('/login', UserController.login)
router.post('/access', UserController.access)
router.post('/register', UserController.create)
router.get('/register', UserController.register)
router.get('/logout', UserController.logout)

module.exports = router