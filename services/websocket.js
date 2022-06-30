let ws

const sendAuthentification = (user, handleMessage, options) => (event) => {
  const token = user? user.token : ''
  ws.send(token)
  event.target.addEventListener('message', handleMessage, options)
}

const connect = (user, handleMessage, options = {}) => {
  if(ws)
    return
  ws = new WebSocket(`ws://${location.hostname}:3000`)
  ws.addEventListener('open', sendAuthentification(user, handleMessage, options))
}

const close = () => {
  if(!ws)
    return
  ws = ws.close()
}

const send = (message) => {
  if(!ws)
    return
  const msg = { type: 'message', payload: message }
  ws.send(JSON.stringify(msg))
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
