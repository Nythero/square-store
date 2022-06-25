const React = require('react')
const { useContext } = React
const { DispatchContext } = require('../views/Contexts.js')
const style = (color) => ({
  backgroundColor: color,
  height: '100px'
})

const PrendaEnCarrito = ({ prenda }) => {
  const dispatch = useContext(DispatchContext)
  const handleClick = () => dispatch({ type: 'remove-from-cart', payload: prenda.id })
  const handleChange = (event) => {
    const id = prenda.id
    if(event.target.value > prenda.cantidad)
      dispatch({ type: 'increase-quantity', payload: id })
    else 
      dispatch({ type: 'decrease-quantity', payload: id })
  }
  return (
    <tr>
      <td className='row align-items-center'>
        <button onClick={handleClick} className='col-1 btn px-0 mx-3' type='button'>Quitar</button>
        <div className='col-4 px-0' style={style(prenda.color)}>
        </div>
        <div className='col-6 font-weight-bold'>{prenda.nombre}</div>
      </td>
      <td className='align-middle'>
        {prenda.precio}
      </td>
      <td className='align-middle'>
        <input onChange={handleChange} min='0' type='number' value={prenda.cantidad} />
      </td>
      <td className='align-middle'>
        {prenda.precio * prenda.cantidad}
      </td>
    </tr>
  )
}

module.exports = PrendaEnCarrito
