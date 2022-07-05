const websocket = require('./websocket.js')

const handleMessage = dispatch => event => {
  const data = event.data
  const parsedData = JSON.parse(data)
  switch(parsedData.type) {
    case 'message':
      dispatch({ type: 'add-chat-message', payload: parsedData.payload })
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
  const msg = { type: 'message', payload: { message, sender: 'client' } }
  websocket.send(msg)
}

const clientWebsocket = {
  connect,
  sendMessage
}

module.exports = clientWebsocket
