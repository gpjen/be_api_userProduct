const express = require('express')
const router = express.Router()

//USER
const {
    getUsers,
    userRegister
} = require('../controllers/users')

router.get('/user', getUsers)
router.post('/user', userRegister)

module.exports = router