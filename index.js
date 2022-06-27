require('babel-register')({
  presets: ['react']
})
const WebSocket = require('ws')
const http = require('http')
const app = require('./app.js')

const server = http.createServer(app)
const webSocketServer = new WebSocket.Server({ server })

webSocketServer.on('connection', (wss) => {
  console.log('An user connected')
  wss.on('message', (message) => console.log(message.toString('utf8')))
  wss.on('close', () => console.log('An User Disconnected'))
})

server.listen(3000, console.log('Listening at http://localhost:3000'))
