const React = require('react')
const { useContext } = React
const { StateContext } = require('../views/Contexts.js')

const liClassName = 'list-group-item d-flex justify-content-around align-items-center border-0 border-top py-3'

const SupportChatListElement = ({ handleClick, room }) => {
  const chat = useContext(StateContext).chat
  return (
    <li className={liClassName}>
      <p className='mb-0'>Un usuario requiere asistencia</p>
      {
	<button className='btn p-0'
          onClick={handleClick}
          key={room.id}>Dar Soporte</button>
      }
    </li>
  )
}

module.exports = SupportChatListElement
