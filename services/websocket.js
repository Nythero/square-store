let ws

const sendAuthentification = (user, handleMessage) => (event) => {
  const token = user? user.token : ''
  ws.send(token)
  event.target.addEventListener('message', handleMessage)
}

const connect = (user, handleMessage) => {
  if(ws)
    return
  ws = new WebSocket(`ws://${location.hostname}:3000`)
  ws.addEventListener('open', sendAuthentification(user, handleMessage))
}

const close = () => {
  if(!ws)
    return
  ws = ws.close()
}

const send = (message) => {
  if(!ws)
    return
  ws.send(message)
}

const websocket = {
  connect,
  close,
  send
}

module.exports = websocket
