// IMPORT PACKAGE
const Validator = require('fastest-validator')
const {
    name,
    email,
    phone,
    jenis_kelamin,
    password
} = require('./objValidation.js')

// SUPORT VARIABLE
const v = new Validator({
    useNewCustomCheckerFunction: true,
    messages: {
        phoneNumber: 'format telepon tidak didukung ex: +62821-0000-0000 / 6282100000000',
        gender: 'gender tidak didukung ex: laki-laki / perempuan',
        passFormat: 'password harus mengandung huruf besar, huruf kecil dan angka'
    }
})


validationRegister = (data) => {
    const schema = {
        name,
        email,
        phone,
        jenis_kelamin,
        password
    }
    const check = v.compile(schema)
    return check(data)

}


console.log('result => ', validationRegister({
    name: 'gandi jen',
    email: 'gpj@gmail.com',
    phone: '',
    jenis_kelamin: 'perempuan',
    password: "backsb"
}));