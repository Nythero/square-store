let ws

const sendAuthentification = (user, handleMessage, options) => (event) => {
  const token = user? user.token : ''
  ws.send(token)
  event.target.addEventListener('message', handleMessage, options)
}

const protocol = () => (location.protocol === 'https:')? 'wss' : 'ws'

const connect = (user, handleMessage, options = {}) => {
  if(ws)
    return
  ws = new WebSocket(`${protocol()}://${location.hostname}:${location.port}`)
  ws.addEventListener('open', sendAuthentification(user, handleMessage, options))
  ws.addEventListener('error', (err) => console.log(err))
}

const close = () => {
  if(!ws)
    return
  ws = ws.close()
}

const send = (message) => {
  if(!ws)
    return
  ws.send(JSON.stringify(message))
}

const joinRoom = id => {
  const message = { type: 'join-room', payload: id }
  ws.send(JSON.stringify(message))
}

const websocket = {
  connect,
  close,
  send,
  joinRoom
}

module.exports = websocket
