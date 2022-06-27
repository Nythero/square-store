const React = require('react')
const ChatHistory = require('./ChatHistory.jsx')
const ChatForm = require('./ChatForm.jsx')
const { useContext, useEffect } = React
const { StateContext } = require('../views/Contexts.js')
const websocket = require('../services/websocket.js')

const Chat = () => {
  const chat = useContext(StateContext).chat

  useEffect(() => {
    websocket.connect()
  })

  return (
    <div>
      <ChatHistory history={chat.history}/>
      <ChatForm chat={chat}/>
    </div>
  )
}

module.exports = Chat
