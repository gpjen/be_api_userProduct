// IMPORT PACKAGE
const Validator = require('fastest-validator')
const {
    users
} = require('../../models')

// SUPORT VARIABLE AND CUSTOM MESSAGE
const v = new Validator({
    useNewCustomCheckerFunction: true,
    messages: {
        phoneNumber: 'format telepon tidak didukung ex: +62821-0000-0000 / 6282100000000',
        gender: 'gender tidak didukung ex: laki-laki / perempuan',
        passFormat: 'password harus mengandung huruf besar, huruf kecil dan angka',
        statusUser: 'status user tidak diketahui'
    }
})

// IMPORT OBJ VALIDATION SET
const {
    name,
    email,
    phone,
    jenis_kelamin,
    password,
    status
} = require('./objValidation.js')


// VALIDATION REGISTER
exports.validationRegister = async (req, res, next) => {
    const schema = {
        name,
        email,
        phone,
        jenis_kelamin,
        password,
        status

    }
    const check = v.compile(schema)
    const error = check(req.body)

    // CHECK DUPLICATE EMAIL
    let errMsg = []
    const emailCheck = await users.findOne({
        where: {
            email: req.body.email
        },
        attributes: ['email']
    })

    emailCheck ? error.push('email already exist') : true

    // CHECK DUPLICATE PHONE
    const phoneCheck = await users.findOne({
        where: {
            phone: req.body.phone
        },
        attributes: ['phone']
    })

    phoneCheck ? error.push('phone number already exist') : true


    if (error !== true) return res.status(400).json({
        status: 'failed',
        error
    })
    next()
}