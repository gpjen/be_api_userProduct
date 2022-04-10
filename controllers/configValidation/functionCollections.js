// IMPORT PACKAGE
const Validator = require('fastest-validator')

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
validationRegister = (data) => {
    const schema = {
        name,
        email,
        phone,
        jenis_kelamin,
        password,
        status

    }
    const check = v.compile(schema)
    return check(data)

}

console.log('result => ', validationRegister({
    name: 'gandi jen',
    email: 'gpj@gmail.com',
    phone: '0821-9855-4482',
    jenis_kelamin: 'laki-laki',
    password: 'Ambon33n',
    status: ''
}));