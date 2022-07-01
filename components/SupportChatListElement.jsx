const React = require('react')
const { useContext } = React
const { StateContext } = require('../views/Contexts.js')

const liClassName = 'list-group-item d-flex justify-content-around align-items-center'
const liStyle = { height: "10%" }

const SupportChatListElement = ({ handleClick, room }) => {
  const chat = useContext(StateContext).chat
  return (
    <li className={liClassName} style={liStyle}>
      <p className='mb-0'>Un usuario requiere asistencia</p>
      {
	<button className='btn'
          onClick={handleClick}
          key={room.id}>Dar Soporte</button>
      }
    </li>
  )
}

module.exports = SupportChatListElement
