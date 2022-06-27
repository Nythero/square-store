const api = require('./api')
const express = require('express')
const app = express()
const routes = require('./routes/index.jsx')

app.use('/public', express.static('public'))
app.use('/api', api)
app.use('/', routes)
app.use((req, res) => res.status(404).end())

module.exports = app
