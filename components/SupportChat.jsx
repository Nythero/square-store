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

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = event.target.message.value
    const id = chat.actual
    supportWebSocket.sendMessage(message, id)
  }

  if(chat) {
    return (
      <div>
        <SupportChatList openRooms={chat.openRooms}/>
        <Chat handleSubmit={handleSubmit}/>
      </div>
    )
  }
  else
    return <p>Loading...</p>
}

module.exports = SupportChat
