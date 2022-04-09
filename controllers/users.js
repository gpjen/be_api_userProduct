// IMPORT PACKEGE
const bcrypt = require('bcrypt')

// IMPORT MODELS
const {
    users
} = require('../models')

// register CREATE
exports.userRegister = async (req, res) => {

    try {
        const newData = req.body
        newData.status = newData.status || 'buyer'

        // CHECK DUPLICATE EMAIL
        let errMsg = []
        const emailCheck = await users.findOne({
            where: {
                email: newData.email
            },
            attributes: ['email']
        })

        emailCheck ? errMsg.push('email already exist') : true

        // CHECK DUPLICATE PHONE
        const phoneCheck = await users.findOne({
            where: {
                phone: newData.phone
            },
            attributes: ['phone']
        })

        phoneCheck ? errMsg.push('phone number already exist') : true

        if (emailCheck || phoneCheck) {
            return res.status(400).json({
                status: 'failed',
                message: errMsg
            })
        }

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10)
        newData.password = await bcrypt.hashSync(newData.password, salt)

        // CREATE NEW USERS
        const newUser = await users.create(newData)
        res.status(201).json({
            status: 'success',
            message: `${newUser.name} registered successfully`
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: 'failed',
            message: error.message
        })
    }



}

// login

// get users
exports.getUsers = async (req, res) => {
    try {
        const data = await users.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'isDelete']
            }
        })

        if (data.length <= 0) return res.json({
            status: 'success',
            data: 'no data'
        })

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failed',
            message: error.message
        })
    }
}

// get user by Id

// delete user by id