'use strict'

const config = require('./config')
const express = require('express')
const middlewares = require('./middlewares')
const routes = require('./routes')
const MongoDBClient = require('./db')
const PORT = process.env.NODE_ENV === 'test' ? 8888 : config.incomingPort

const app = express()

const connect = async () => await new MongoDBClient().connect()
connect()

middlewares.init(app)

app.use('/api/v1', routes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app
