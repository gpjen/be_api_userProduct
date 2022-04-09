// IMPORT MODULE
require('dotenv/config')
const express = require('express')
const morgan = require('morgan')
const {
    sequelize
} = require('./models')

// IMPORT SCRIPT
const routes = require('./routes')

// VARIABELS
const app = express()
const port = process.env.APP_PORT || 3000

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
        await sequelize.authenticate()
        console.log(`success connecting to database`);
    } catch (error) {
        console.log(error.message);
    }
    console.log(`server running on port ${port}`);
})