const {
    users
} = require('../models')

// register CREATE
exports.userRegister = async (req, res) => {

    try {

        // CHECK DUPLICATE EMAIL
        const emailCheck = await users.findOne({
            where: {
                email: req.body.email
            }
        })

        if (emailCheck) return res.status(400).json({
            status: 'failed',
            message: 'email already exist'
        })

        // CREATE NEW USERS
        req.body.status = 'buyer'
        const newUser = await users.create(req.body)
        res.status(201).json({
            status: 'success',
            message: `${newUser.email} successfully added to database`
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