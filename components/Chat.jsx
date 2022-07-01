const React = require('react')
const ChatHistory = require('./ChatHistory.jsx')
const ChatForm = require('./ChatForm.jsx')
const { useContext, useEffect } = React
const { StateContext } = require('../views/Contexts.js')

const history = chat => {
  if(chat.history)
    return chat.history
  else if (chat.openRooms[chat.actual])
    return chat.openRooms[chat.actual].history
  else
    return []
}

const Chat = ({ sendMessage }) => {
  const { chat } = useContext(StateContext)

  if(chat)
    return (
      <div className='d-flex flex-column border rounded bg-light p-3 flex-grow-1'>
        <ChatHistory history={history(chat)}/>
        <ChatForm chat={chat} sendMessage={sendMessage}/>
      </div>
    )
  else
    return <p>Loading ...</p>
}

module.exports = Chat
