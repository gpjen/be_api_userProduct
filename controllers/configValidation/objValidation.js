module.exports = {
    name: {
        type: 'string',
        min: 3,
        max: 50,
        messages: {
            required: 'nama wajib diisi',
            string: 'nama tidak valid',
            stringMin: `nama minimal 3 huruf`,
            stringMax: `nama maksimal 50 huruf`
        }
    },
    email: {
        type: 'email',
        messages: {
            required: 'email wajib diisi',
            email: 'email tidak valid'
        }
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
        }
    },
    jenis_kelamin: {
        type: 'string',
        messages: {
            required: 'gender wajib diisi',
        },
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
        }
    },
    password: {
        type: 'string',
        min: 6,
        messages: {
            required: 'password wajib diisi',
            stringMin: 'password mengandung minimal 6 karakter'
        },
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

        }
    },
    status: {
        type: 'string',
        optional: true,
        messages: {
            string: 'status berupa huruf'
        },
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
        }
    }
}