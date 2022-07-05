const React = require('react')
const { useContext } = React
const { 
  StateContext 
} = require('../views/Contexts.js')

const Alert = () => {
  const notificacion = useContext(StateContext).notificacion
  return (
    <div className={`alert ${notificacion.tipo}`}>
      {notificacion.mensaje}
    </div>
  )
}

module.exports = Alert
