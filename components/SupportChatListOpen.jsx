const React = require('react')
const { useContext } = React
const { 
  StateContext,
  DispatchContext
} = require('../views/Contexts.js')
const SupportChatListOpenElement = require('./SupportChatListOpenElement.jsx')
const websocket = require('../services/websocket.js')

const SupportChatListOpen = () => {
  const openRooms = useContext(StateContext).chat.openRooms
  const dispatch = useContext(DispatchContext)

  const changeRoom = (id) => {
    dispatch({ type: 'set-actual-chat-room', payload: id})
  }

  const handleClick = (id) => () => {
    websocket.joinRoom(id)
    changeRoom(id)
  }

  return openRooms.map(r =>
    <SupportChatListOpenElement
      handleClick={handleClick(r.id)}
      key={r.id}
      room={r}/>
  )
}

module.exports = SupportChatListOpen
