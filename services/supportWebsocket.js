const websocket = require('./websocket.js')
const objectWith = require('../utils/objectWith.js')

const handleMessage = dispatch => event => {
    const data = event.data
    const parsedData = JSON.parse(data)
    switch(parsedData.type) {
      case 'avaliable-rooms':
	dispatch({ type: 'set-open-rooms', payload: parsedData.payload })
	break
      case 'new-open-room':
	dispatch({ type: 'add-open-room', payload: parsedData.payload })
	break
      case 'message':
        const payload = objectWith(parsedData.payload, { type: 'received' })
        dispatch({ type: 'receive-chat-message', payload })
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
  connect,
  sendMessage
}

module.exports = supportWebsocket
