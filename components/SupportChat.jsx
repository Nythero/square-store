const React = require('react')
const apiService = require('../services/api.js')
const Chat = require('./Chat.jsx')
const { useContext, useEffect } = React
const { StateContext, DispatchContext } = require('../views/Contexts.js')
const supportWebsocket = require('../services/supportWebsocket.js')
const SupportChatList = require('./SupportChatList.jsx')

const SupportChat = () => {
  const { user, chat } = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    supportWebsocket.connect(user, dispatch)
  }, [])

  const sendMessage = (message) => {
    const id = chat.actual
    supportWebsocket.sendMessage(message, id)
    const payload = {
      message,
      type: 'sended',
      id
    }
    dispatch({ type: 'send-chat-message', payload })
  }

  const changeRoom = (id) => {
    dispatch({ type: 'set-actual-chat-room', payload: id})
  }

  if(chat) {
    return (
      <div>
        <SupportChatList openRooms={chat.openRooms} changeRoom={changeRoom} />
        <Chat sendMessage={sendMessage}/>
      </div>
    )
  }
  else
    return <p>Loading...</p>
}

module.exports = SupportChat
