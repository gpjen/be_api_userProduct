module.exports = {
    name: {
        type: 'string',
        min: 3,
        max: 50,
    },
    email: {
        type: 'email',
    },
    phone: {
        type: 'string',
        optional: true,
        custom: (val, err) => {
            const regExPhone = /(^\+?[0-9-]{5,15}$)/
            if (!val || val == "") {
                return val
            } else if (!val.match(regExPhone)) {
                err.push({
                    type: 'phoneNumber'
                })
                return false
            }
            return val
        }
    },
    jenis_kelamin: {
        type: 'string',
        custom: (val, err) => {
            const regExGender = /^(laki-laki|perempuan)$/
            if (!val || val == "") {
                return val
            } else if (!val.match(regExGender)) {
                err.push({
                    type: 'gender'
                })
                return false
            }
            return val
        }
    },
    password: {
        type: 'string',
        min: 6,
        custom: (val, err) => {
            const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/
            if (!val || val == "") {
                return val
            }
            if (!val.match(regExPass)) {
                err.push({
                    type: 'passFormat'
                })
                return false
            }
            return val
        }
    },
    status: {
        type: 'string',
        optional: true,
        custom: (val, err) => {
            const regExStatus = /^(admin|buyer|seller)$/
            if (!val || val == "") {
                return val
            } else if (!val.match(regExStatus)) {
                err.push({
                    type: 'statusUser'
                })
                return false
            }
            return val
        }
    }
}