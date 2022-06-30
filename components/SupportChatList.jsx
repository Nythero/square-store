const React = require('react')
const websocket = require('../services/websocket.js')

const SupportChatList = ({ openRooms }) => {
  const handleClick = (id) => () => {
    websocket.joinRoom(id)
  }
  return (
    <div>
      {openRooms.map(r => <button onClick={handleClick(r.id)} key={r.id}>{r.id}</button>)}
    </div>
  )
}

module.exports = SupportChatList
