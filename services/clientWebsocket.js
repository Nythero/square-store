const websocket = require('./websocket.js')
const objectWith = require('../utils/objectWith.js')

const handleMessage = dispatch => event => {
  const data = event.data
  const parsedData = JSON.parse(data)
  switch(parsedData.type) {
    case 'message': 
      const payload = objectWith(parsedData.payload, { type: 'received' })
      dispatch({ type: 'receive-chat-message', payload })
    default:
      break
  }
}

const handleFirstMessage = (dispatch, setChat) => (event) => {
  const data = event.data
  const parsedData = JSON.parse(data)
  if(parsedData.type === 'support-agent-connected') {
    event.target.addEventListener('message', handleMessage(dispatch))
    dispatch({ type: 'connect-chat-user' })
    setChat('ready')
  }
  else {
    setChat('waiting')
  }
}

const connect = (dispatch, setChat) => {
  websocket.connect(null, handleFirstMessage(dispatch, setChat), { once: true })
}

const sendMessage = message => {
  const msg = { type: 'message', payload: message }
  websocket.send(msg)
}

const clientWebsocket = {
  connect,
  sendMessage
}

module.exports = clientWebsocket
