require('babel-register')({
  presets: ['react']
})
const http = require('http')
const app = require('./app.js')
const { PORT } = require('./utils/config.js')

const server = http.createServer(app)

require('./utils/websocket.js').create(server)

server.listen(PORT, console.log(`Listening at http://localhost:${PORT}`))
