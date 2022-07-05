const React = require('react')
const { useContext } = React
const { 
  StateContext 
} = require('../views/Contexts.js')
const PrendaEnCarrito = require('../components/PrendaEnCarrito.jsx')
const FinalizarCompra = require('../components/FinalizarCompra.jsx')

const Cart = () => {
  const prendasEnCarrito = useContext(StateContext).carrito
  return (
    <div className='row justify-content-end'>
      <table className='table col-12'>
        <tbody>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
          {prendasEnCarrito.map(p => <PrendaEnCarrito key={p.id} prenda={p} />)}
        </tbody>
      </table>
      <FinalizarCompra prendasEnCarrito={prendasEnCarrito}/>
    </div>
  )
}

module.exports = Cart
