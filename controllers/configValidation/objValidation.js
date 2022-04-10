module.exports = {
    name: {
        type: 'string',
        min: 3,
        max: 50,
        messages: {
            string: "nama tidak valid",
            stringMin: `nama minimal 3 huruf`,
            stringMax: `nama maksimal 50 huruf`
        }
    },
    email: {
        type: 'email',
        messages: {
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
            const regEx = /^(laki-laki|perempuan)$/
            if (!val.match(regEx)) {
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
        messages: {
            required: 'password wajib diisi',
            stringMin: 'password mengandung minimal 6 karakter'
        },
        custom: (val, err) => {
            const regExPass = / /
        }
    }
}