let ws

const connect = () => {
  if(ws)
    return
  ws = new WebSocket(`ws://${location.hostname}:3000`)

  ws.addEventListener('open', console.log('Connected'))

  return ws
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

const websocket = { connect, close, send }

module.exports = websocket
