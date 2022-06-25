require('babel-register')({
	presets: ['react']
})
const express = require('express')
const app = express()
const routes = require('./routes/index.jsx')
const api = require('./api')

app.use('/public', express.static('public'))
app.use('/api', api)
app.use('/', routes)
app.use((req, res) => res.status(404).end())

app.listen(3000, console.log('Listening at http://localhost:3000'))
