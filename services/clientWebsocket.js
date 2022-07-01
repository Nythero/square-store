const websocket = require('./websocket.js')

const handleMessage = dispatch => event => {
  const data = event.data
  const parsedData = JSON.parse(data)
  switch(parsedData.type) {
    case 'message':
      dispatch({ type: 'receive-chat-message', payload: parsedData.payload })
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

const clientWebsocket = {
  connect
}

module.exports = clientWebsocket
