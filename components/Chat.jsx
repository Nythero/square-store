const React = require('react')
const ChatHistory = require('./ChatHistory.jsx')
const ChatForm = require('./ChatForm.jsx')
const { useContext, useEffect } = React
const { StateContext } = require('../views/Contexts.js')

const Chat = () => {
  const { chat } = useContext(StateContext)
  console.log(chat)

  if(chat)
    return (
      <div className='d-flex flex-column border rounded bg-light p-3 flex-grow-1'>
        <ChatHistory history={[]}/>
        <ChatForm chat={chat}/>
      </div>
    )
  else
    return <p>Loading ...</p>
}

module.exports = Chat
