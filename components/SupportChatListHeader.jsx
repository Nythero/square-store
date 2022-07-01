const React = require('react')
const { useContext } = React
const { DispatchContext } = require('../views/Contexts.js')

const isVisibleRoom = (visibleRooms, rooms) => visibleRooms === rooms

const className = (visibleRooms, rooms) => {
  const base = 'col-6 text-center py-3 '
  if(isVisibleRoom(visibleRooms, rooms))
    return base + 'bg-light'
  else
    return base + ''
}

const style = (visibleRooms, rooms) => {
  if(isVisibleRoom(visibleRooms, rooms))
    return {}
  else
    return { cursor: 'pointer' }
}

const SupportChatListHeader = ({ visibleRooms }) => { 
  const dispatch = useContext(DispatchContext)
  const [OPEN, TAKEN] = [true, false]
  const handleClick = (rooms) => () => {
    if(!isVisibleRoom(visibleRooms, rooms))
      dispatch({ type: 'toggle-chat-visible-rooms' })
  }
  return (
    <div className='row g-0'>
      <div
        style={style(visibleRooms, OPEN)}
        onClick={handleClick(OPEN)}
        className={className(visibleRooms, OPEN)}>
        Chats Libres
      </div>
      <div 
        style={style(visibleRooms, TAKEN)}
        onClick={handleClick(TAKEN)}
        className={className(visibleRooms, TAKEN)}>
        Chats Abiertos
      </div>
    </div>
  )
}

module.exports = SupportChatListHeader
