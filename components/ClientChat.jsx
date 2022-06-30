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
    const data = event.data
    const parsedData = JSON.parse(data)
    console.log(parsedData)
    switch(parsedData.type) {
      case 'message':
        dispatch({ type: 'receive-chat-message-client', payload: parsedData.payload })
      default:
	break
    }
  }

  const handleFirstMessage = (event) => {
    const data = event.data
    const parsedData = JSON.parse(data)
    console.log(parsedData)
    if(parsedData.type === 'support-agent-connected') {
      event.target.addEventListener('message', handleMessage)
      dispatch({ type: 'connect-chat-user' })
      setChat('ready')
    }
    else {
      setChat('waiting')
    }
  }

  const handleClick = () => {
    websocket.connect(null, handleFirstMessage, { once: true })
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
