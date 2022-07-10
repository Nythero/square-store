const api = require('./api')
const express = require('express')
const app = express()
const routes = require('./routes/index.jsx')
const helmet = require('helmet')
const { NODE_ENV, NONCE, PORT } = require('./utils/config.js')
const cors = require('cors')
const objectWith = require('./utils/objectWith.js')
const nonceGen = require('./utils/nonceGen.js')

const directives = objectWith({}, helmet.contentSecurityPolicy.getDefaultDirectives())

if(NODE_ENV !== 'production')
  delete directives['upgrade-insecure-requests']
delete directives['script-src-attr']
directives['script-src'] = ["'self'", req => `'nonce-${req.nonce}'`]
directives['connect-src'] = [
  req => `wss://${req.hostname}:${PORT}`,
  "'self'"
]

app.use((req, res, next) => {
  req.nonce = nonceGen()
  next()
})
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: false,
    directives
  }
}))
app.use(cors())
app.use(express.static('public'))
app.use('/favicon.ico', (req, res) => res.status(204).end())
app.use('/api', api)
app.use('/', routes)
app.use((req, res) => res.status(404).end())
app.use((err, req, res, next) => console.log(err))

module.exports = app
