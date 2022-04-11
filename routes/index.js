const express = require('express')
const router = express.Router()

//VALIDATION
const {
    registerValidation
} = require('../midleware/validator/funcValidator')

//USER
const {
    getUsers,
    userRegister
} = require('../controllers/users')

router.get('/user', getUsers)
router.post('/register', registerValidation, userRegister)

module.exports = router