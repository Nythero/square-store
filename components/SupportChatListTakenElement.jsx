const React = require('react')
const { useContext } = React
const { DispatchContext } = require('../views/Contexts.js')

const lastHistoryMessage = history => {
  const lastIndex = history.length - 1
  return history[lastIndex]
}

const liClassName = 'list-group-item d-flex justify-content-around align-items-center border-0 border-top py-3'

const lastMessage = room => lastHistoryMessage(room.history)

const style = {
  cursor: 'pointer'
}

const SupportChatListTakenElement = ({ room }) => {
  const dispatch = useContext(DispatchContext)
  const handleClick = () => {
    dispatch({ type: 'set-actual-chat-room', payload: room.id })
  }
  return (
    <li className={liClassName} style={style} onClick={handleClick}>
      {lastMessage(room) || 'Puedes comunicarte con el cliente'}
    </li>
  )
}

module.exports = SupportChatListTakenElement
