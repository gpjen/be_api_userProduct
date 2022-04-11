const express = require('express')
const router = express.Router()

// VALIDATIONS
const {
    validationRegister
} = require('../controllers/configValidation/functionCollections')

//USER
const {
    getUsers,
    userRegister
} = require('../controllers/users')

router.get('/user', getUsers)
router.post('/user', validationRegister, userRegister)

module.exports = router