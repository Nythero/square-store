const websocket = require('./websocket.js')

const handleMessage = dispatch => event => {
    const data = event.data
    const parsedData = JSON.parse(data)
    switch(parsedData.type) {
      case 'avaliable-rooms':
	dispatch({ type: 'set-avaliable-rooms', payload: parsedData.payload })
	break
      case 'new-avaliable-room':
	dispatch({ type: 'add-avaliable-room', payload: parsedData.payload })
      case 'message':
        dispatch({ type: 'receive-chat-message', payload: parsedData.payload })
	break
      default:
	console.log(data)
	return
    }
  }

const connect = (user, dispatch) => {
  websocket.connect(user, handleMessage(dispatch))
  dispatch({ type: 'connect-chat-support' })
}

const sendMessage = (message, id) => {
  const msg = { type: 'message', payload: { id, message } }
  websocket.send(msg)
}

const supportWebsocket = {
  connect
}

module.exports = supportWebsocket
