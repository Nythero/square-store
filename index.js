require('babel-register')({
  presets: ['react']
})
const http = require('http')
const app = require('./app.js')
require('./services/websocket.js')

const server = http.createServer(app)

require('./websocket.js').create(server)

server.listen(3000, console.log('Listening at http://localhost:3000'))
