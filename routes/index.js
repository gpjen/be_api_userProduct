const express = require('express')
const router = express.Router()

// VALIDATIONS
const {
    validationRegister,
    validationLogin
} = require('../controllers/configValidation/functionCollections')

//USER
const {
    getUsers,
    userRegister
} = require('../controllers/users')

router.get('/user', getUsers)
router.post('/register', validationRegister, userRegister)
// router.post('/login', validationLogin, userLogin)

module.exports = router