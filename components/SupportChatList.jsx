const React = require('react')
const websocket = require('../services/websocket.js')

const SupportChatList = ({ openRooms, changeRoom }) => {
  const handleClick = (id) => () => {
    websocket.joinRoom(id)
    changeRoom(id)
  }
  return (
    <div>
      {openRooms.map(r => <button onClick={handleClick(r.id)} key={r.id}>{r.id}</button>)}
    </div>
  )
}

module.exports = SupportChatList
