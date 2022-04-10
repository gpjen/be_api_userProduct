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
    }
}