// IMPORT PACKAGE
const Validator = require('express-validator')
const {
    users
} = require('../../models')

// SUPORT VARIABLE AND CUSTOM MESSAGE
const v = new Validator({
    useNewCustomCheckerFunction: true,
    messages: {
        required: "'{field}' wajib diisi'",
        stringMin: "panjang '{field}' minimal {actual}'",
        stringMax: "panjang '{field}' maksimal {actual}'",
        phoneNumber: 'format telepon tidak didukung ex: +62821-0000-0000 / 6282100000000',
        gender: 'gender tidak didukung ex: laki-laki / perempuan',
        passFormat: 'password harus mengandung huruf besar, huruf kecil dan angka',
        statusUser: 'status user tidak diketahui',
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
    let errorReq = check(req.body)

    try {
        // CHECK DUPLICATE EMAIL
        const emailCheck = await users.findOne({
            where: {
                email: req.body.email
            }
        })
        // CHECK DUPLICATE PHONE
        const phoneCheck = await users.findOne({
            where: {
                phone: req.body.phone
            }
        })
        if (emailCheck) {
            errorReq = [...errorReq, {
                type: 'dataEmail',
                field: 'email',
                message: 'email already exist'
            }]
        }
        if (phoneCheck) {
            errorReq = [...errorReq, {
                type: 'dataPhone',
                field: 'phone',
                message: 'phone number already exist'
            }]
        }

        // SEND ERROR VALIDATION
        if (errorReq !== true || dataError.length > 0) return res.status(400).json({
            status: 'failed',
            error: errorReq
        })

        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// FALIDATION LOGIN
exports.validationLogin = (req, res, next) => {


    next()
}