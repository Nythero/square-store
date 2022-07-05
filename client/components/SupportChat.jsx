const React = require('react')
const apiService = require('../services/api.js')
const Chat = require('./Chat.jsx')
const { useContext, useEffect } = React
const { StateContext, DispatchContext } = require('../views/Contexts.js')
const supportWebsocket = require('../services/supportWebsocket.js')
const SupportChatList = require('./SupportChatList.jsx')
const NoChat = require('./NoChat.jsx')

const visibleRooms = chat => chat.visibleRooms?
  chat.openRooms :
  chat.takenRooms

const currentRoom = chat => visibleRooms(chat)[chat.actual]

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
      sender: 'support',
      id
    }
    dispatch({ type: 'add-chat-message', payload })
  }

  if(chat) {
    return (
      <div className='row h-75 flex-nowrap'>
        <SupportChatList />
        <div className='col-8 d-flex justify-content-stretch'>
          {
	    (chat.actual !== null)?
              <Chat 
                sendMessage={sendMessage}
                chat={currentRoom(chat)}/> :
	      <NoChat />
	  }
        </div>
      </div>
    )
  }
  else
    return <p>Loading...</p>
}

module.exports = SupportChat
