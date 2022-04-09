// IMPORT MODULE
require('dotenv/config')
const express = require('express')
const morgan = require('morgan')

const routes = require('./routes')



const app = express()
const port = process.env.APP_PORT

// MIDLEWARE
app.use(express.json())
app.use(morgan('dev'))

// ROUTES
app.use('/api/v1', routes)



// ROUTES HANDLING
app.use((req, res) => {
    res.status(200).json({
        status: 'failed',
        message: 'this path is not registered',
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