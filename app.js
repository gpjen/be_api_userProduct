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
app.use((req, res, next) => {
    const err = new Error(`${req.method} => ${req.headers.host}${req.path} not found`)
    err.status = 404
    next(err)
})

// ERRORS HANDLING
app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500).json({
        status: 'failed',
        message: err.message
    })

})

app.listen(port, async () => {
    try {
        await sequelize.authenticate()
        console.log(`success connecting to database`);
    } catch (error) {
        console.log({
            status: 'failed to connect database',
            message: error.message
        });
    }
    console.log(`server running on port ${port}`);
})