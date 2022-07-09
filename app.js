const api = require('./api')
const express = require('express')
const app = express()
const routes = require('./routes/index.jsx')
const helmet = require('helmet')
const { NODE_ENV } = require('./utils/config.js')

if(NODE_ENV === 'production')
  app.use(helmet())
app.use(express.static('public'))
app.use('/api', api)
app.use('/', routes)
app.use((req, res) => res.status(404).end())

module.exports = app
