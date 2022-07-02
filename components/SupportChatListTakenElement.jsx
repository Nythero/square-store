const React = require('react')
const { useContext } = React
const { DispatchContext } = require('../views/Contexts.js')

const lastHistoryMessage = history => {
  const lastIndex = history.length - 1
  return history[lastIndex]
}

const lastMessage = room => lastHistoryMessage(room.history)

const style = {
  cursor: 'pointer'
}

const SupportChatListTakenElement = ({ room }) => {
  const dispatch = useContext(DispatchContext)
  const handleClick = () => {
    dispatch({ type: 'set-actual-chat-room', payload: room.id })
  }
  console.log(room)
  return (
    <li style={style} onClick={handleClick}>
      {lastMessage(room) || 'Puedes comunicarte con el cliente'}
    </li>
  )
}

module.exports = SupportChatListTakenElement
