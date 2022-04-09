// IMPORT MODULE
const express = require('express')
require('dotenv/config')

const app = express()


const port = process.env.APP_PORT

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        routes: {
            method: req.method,
            path: `${req.headers.host}${req.path}`
        }
    })
})

app.listen(port, async () => {
    try {
        console.log(`server running on port ${port}`);
    } catch (error) {
        res.stetus(500).json({
            status: 'failed',
            message: error.message
        })
    }
})