const React = require('react')
const apiService = require('../services/api.js')
const Chat = require('./Chat.jsx')
const { useContext, useEffect } = React
const { StateContext, DispatchContext } = require('../views/Contexts.js')
const websocket = require('../services/websocket.js')
const SupportChatList = require('./SupportChatList.jsx')

const SupportChat = () => {
  const { user, chat } = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const handleMessage = (event) => {
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

  useEffect(() => {
    websocket.connect(user, handleMessage)
    dispatch({ type: 'connect-chat-support' })
  }, [])

  if(chat) {
    return (
      <div>
        <SupportChatList openRooms={chat.openRooms}/>
        <Chat />
      </div>
    )
  }
  else
    return <p>Loading...</p>
}

module.exports = SupportChat
