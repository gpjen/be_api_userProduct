const express = require('express')
const router = express.Router()

//USER
router.get('/oke', (req, res) => {
    res.json({
        message: 'mantap'
    })
})



module.exports = router