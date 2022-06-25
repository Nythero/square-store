const React = require('react')
const { useContext } = React
const { DispatchContext } = require('../views/Contexts.js')
const showNotification = require('../utils/showNotification.js')

const FinalizarCompra = ({ prendasEnCarrito }) => {
  const dispatch = useContext(DispatchContext)

  const subtotal = prendasEnCarrito.reduce(
    (total, p) => total + (p.cantidad * p.precio),
    0
  )
  const envio = (subtotal >= 100)? 'Gratis' : '$30'
  const handleClick = () => {
    dispatch({ type: 'clear-cart' })
    const notificacion = {
      tipo: 'alert-success',
      mensaje: 'Comprado con éxito. Muchas Gracias!'
    }
    //Here Should Go Checkout Logic
    showNotification(dispatch, notificacion)
  }
  return (
    <div className='col-6'>
      <h4>Finalizar Compra</h4>
      <table className='table'>
        <tbody>
          <tr>
            <th>Subtotal</th>
            <td>{subtotal}</td>
          </tr>
          <tr>
            <th>Envío</th>
            <td>{envio}</td>
          </tr>
        </tbody>
      </table>
      <button className='btn btn-outline-dark' type='button' onClick={handleClick}>Finalizar Compra</button>
    </div>
  )
}

module.exports = FinalizarCompra
