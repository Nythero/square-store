const React = require('react')
const { useContext } = React
const { 
  StateContext,
  DispatchContext
} = require('../views/Contexts.js')
const SupportChatListOpenElement = require('./SupportChatListOpenElement.jsx')
const websocket = require('../services/websocket.js')

const SupportChatListOpen = () => {
  const openRoomsObject = useContext(StateContext).chat.openRooms
  const openRooms = Object.values(openRoomsObject)
  const dispatch = useContext(DispatchContext)

  const handleClick = (id) => () => {
    websocket.joinRoom(id)
    dispatch({ type: 'take-open-room', payload: id })
    dispatch({ type: 'set-actual-chat-room', payload: id})
    dispatch({ type: 'toggle-chat-visible-rooms' })
  }

  return openRooms.map(r =>
    <SupportChatListOpenElement
      handleClick={handleClick(r.id)}
      key={r.id}
      room={r}/>
  )
}

module.exports = SupportChatListOpen
