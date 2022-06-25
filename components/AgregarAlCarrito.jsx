const React = require('react')
const { useContext } = React
const { DispatchContext } = require('../views/Contexts.js')
const showNotification = require('../utils/showNotification.js')

const AgregarAlCarrito = ({ prenda }) => {
  const dispatch = useContext(DispatchContext)
  const handleClick = (event) => {
    dispatch({ type: 'add-to-cart', payload: prenda })
    const notificacion = {
      tipo:'alert-success',
      mensaje: `Agregado ${prenda.nombre} al carrito.` }
    showNotification(dispatch, notificacion)
  }
  return (
    <button onClick={handleClick}
      className='btn btn-light'
      type='button'>Agregar Al Carrito</button>
  )
}

module.exports = AgregarAlCarrito
