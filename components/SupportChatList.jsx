const React = require('react')
const SupportChatListOpen = require('./SupportChatListOpen.jsx')
const SupportChatListTaken = require('./SupportChatListTaken.jsx')
const { useContext } = React
const { StateContext } = require('../views/Contexts.js')
const SupportChatListHeader = require('./SupportChatListHeader.jsx')

const SupportChatList = () => {
  const visibleRooms = useContext(StateContext).chat.visibleRooms
  return (
    <div className='col-4 border g-0'>
      <SupportChatListHeader visibleRooms={visibleRooms}/>
      <ul className='list-group bg-light'>
        {
	  visibleRooms? <SupportChatListOpen /> :
            <SupportChatListTaken />
	}
      </ul>
    </div>
  )
}

module.exports = SupportChatList
