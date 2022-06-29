const React = require('react')
const ChatHistory = require('./ChatHistory.jsx')
const ChatForm = require('./ChatForm.jsx')
const { useContext, useEffect } = React
const { StateContext } = require('../views/Contexts.js')
const websocket = require('../services/websocket.js')

const Chat = () => {
  const { chat, user } = useContext(StateContext)

  useEffect(() => {
    websocket.connect(user, handleMessage)
  })

  return (
    <div className='d-flex flex-column border rounded bg-light p-3 flex-grow-1'>
      <ChatHistory history={chat.history}/>
      <ChatForm chat={chat}/>
    </div>
  )
}

module.exports = Chat
