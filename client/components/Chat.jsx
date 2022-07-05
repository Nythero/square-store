const React = require('react')
const ChatHistory = require('./ChatHistory.jsx')
const ChatForm = require('./ChatForm.jsx')
const { useContext, useEffect } = React
const { StateContext } = require('../views/Contexts.js')

const chatStyle = {
  minHeight: 0
}

const Chat = ({ sendMessage, chat }) => {
  if(chat)
    return (
      <div 
        style={chatStyle}
        className='d-flex flex-column border bg-light p-3 flex-grow-1'>
        <ChatHistory history={chat.history}/>
        <ChatForm sendMessage={sendMessage}/>
      </div>
    )
  else
    return <p>Loading ...</p>
}

module.exports = Chat
