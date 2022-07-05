const WebSocket = require('ws')
const chat = require('./chat.js')

let webSocketServer

const handleMessage = function(event) {
  const message = event.data
  return chat.handleMessage(this, message)
}

const decode = token => {
  const jwt = require('jsonwebtoken')
  const { SECRET } = require('./config.js')
  try {
    return jwt.verify(token, SECRET)
  }
  catch(err) {
    return null
  }
}

const handleFirstMessage = ws => event => {
  const message = event.data
  let decodedToken = decode(message)
  if(!decodedToken || !decodedToken.id)
    chat.addClient(ws)
  else
    chat.addSupport(ws)
  ws.addEventListener('message', handleMessage)
}

const handleConnection = (ws) => {
  console.log('An user connected')
  ws.addEventListener('message', handleFirstMessage(ws), { once: true })
  ws.on('close', () => console.log('An User Disconnected'))
}

const create = server => {
  webSocketServer = new WebSocket.Server({ server })

  webSocketServer.on('connection', handleConnection)
}

module.exports = {
  create
}
