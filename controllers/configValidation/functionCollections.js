// IMPORT PACKAGE
const Validator = require('fastest-validator')
const {
    name,
    email,

} = require('./objValidation.js')

// SUPORT VARIABLE
const v = new Validator()


validationRegister = (data) => {

    const schema = {
        name,
        email
    }

    const check = v.compile(schema)

    return check(data)

}


console.log(validationRegister({
    name: 'gandi jen',
    email: 'gpjmail.com'
}));