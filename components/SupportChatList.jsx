const React = require('react')
const websocket = require('../services/websocket.js')
const SupportChatListElement = require('./SupportChatListElement.jsx')

const SupportChatList = ({ openRooms, changeRoom }) => {
  const handleClick = (id) => () => {
    websocket.joinRoom(id)
    changeRoom(id)
  }
  console.log(openRooms)
  return (
    <div className='col-4'>
      <ul className='list-group bg-light'>
      {
	openRooms.map(r =>
	  <SupportChatListElement
	    handleClick={handleClick(r.id)}
	    key={r.id}
	    room={r}/>
	)
      }
      </ul>
    </div>
  )
}

module.exports = SupportChatList
