const React = require('react')
const { useContext } = React
const { 
  StateContext
} = require('../views/Contexts.js')
const SupportChatListTakenElement = require('./SupportChatListTakenElement.jsx')

const SupportChatListTaken = () => {
  const takenRoomsObject = useContext(StateContext).chat.takenRooms
  const takenRooms = Object.values(takenRoomsObject)
  return takenRooms.map(r => <SupportChatListTakenElement key={r.id} room={r}/>)
}

module.exports = SupportChatListTaken
