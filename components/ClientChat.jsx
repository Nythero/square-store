const React = require('react')
const Chat = require('./Chat.jsx')
const { useState } = React
const websocket = require('../services/websocket.js')
const clientWebsocket = require('../services/clientWebsocket.js')
const { DispatchContext } = require('../views/Contexts.js')
const { useContext, useEffect } = React

const startClass = `d-flex flex-column justify-content-center 
  align-items-center bg-light flex-grow-1
  `

const ClientChat = () => {
  const [chat, setChat] = useState('start')
  const dispatch = useContext(DispatchContext)

  const handleClick = () => {
    clientWebsocket.connect(dispatch, setChat)
    setChat('waiting')
  }
  
  const sendMessage = (message) => {
    clientWebsocket.sendMessage(message)
    dispatch({ type: 'send-chat-message', payload: { message, type: 'sended' } })
  }

  switch(chat) {
    case 'ready':
      return <Chat sendMessage={sendMessage}/>
    case 'start':
      return (
	<div className={startClass}>
          <p>¿Quiere hablar con alguien de soporte?</p>
          <button onClick={handleClick} 
	    className='btn btn-outline-dark'>Conectar</button>
	</div>
      )
    case 'waiting':
      return (
        <div className='d-flex justify-content-center bg-light flex-grow-1'>
          <p className='align-self-center'>
            Esperando a alguien de soporte...
          </p>
        </div>
      )
    default:
      return null
  }
}

module.exports = ClientChat
