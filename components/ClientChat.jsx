const React = require('react')
const Chat = require('./Chat.jsx')
const { useState } = React
const websocket = require('../services/websocket.js')
const { DispatchContext } = require('../views/Contexts.js')
const { useContext, useEffect } = React

const startClass = `d-flex flex-column justify-content-center 
  align-items-center bg-light flex-grow-1
  `

const ClientChat = () => {
  const [chat, setChat] = useState('start')
  const dispatch = useContext(DispatchContext)

  const handleMessage = (event) => {
    const message = event.data
    dispatch({ type: 'receive-chat-message', payload: message })
  }

  const handleFirstMessage = (event) => {
    const message = event.data
    if(message === 'support-agent-connected') {
      event.target.addEventListener('message', handleMessage)
      setChat('ready')
    }
    else {
      setChat('waiting')
    }
  }

  const handleClick = () => {
    websocket.connect(null, websocket.handleClientFirstConnection)
    setChat('waiting')
  }

  switch(chat) {
    case 'ready':
      return <Chat />
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
