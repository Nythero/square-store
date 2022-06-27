const React = require('react')
const websocket = require('../services/websocket.js')
const { useField } = require('../hooks')
const { useContext } = React
const { DispatchContext } = require('../views/Contexts.js')

const ChatForm = () => {
  const [field, resetField] = useField('text')
  const dispatch = useContext(DispatchContext)
  const handleSubmit = (event) => {
    event.preventDefault()
    const message = event.target.message.value
    websocket.send(message)
    resetField()
    dispatch({ type: 'send-chat-message', payload: message })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name='message' {...field} />
      <button />
    </form>
  )
}

module.exports = ChatForm
