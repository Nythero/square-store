const React = require('react')
const websocket = require('../services/websocket.js')
const { useField } = require('../hooks')
const { useContext } = React
const { DispatchContext } = require('../views/Contexts.js')

const ChatForm = () => {
  const [field, resetField] = useField('message', 'text')
  const dispatch = useContext(DispatchContext)
  const handleSubmit = (event) => {
    event.preventDefault()
    const message = event.target.message.value
    websocket.send(message)
    resetField()
    dispatch({ type: 'send-chat-message-client', payload: message })
  }
  return (
    <form className='d-flex mb-0 align-self-end' onSubmit={handleSubmit}>
      <input className='form-control' {...field} />
      <button className='btn btn-outline-dark' style={{ marginLeft: "1em" }}>
        Send
      </button>
    </form>
  )
}

module.exports = ChatForm
