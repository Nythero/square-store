const React = require('react')
const AgregarAlCarrito = require('./AgregarAlCarrito.jsx')

const Compra = ({ prenda }) => {
  return (
    <div className='col-6'>
      <h1>{prenda.nombre}</h1>
      <h2>${prenda.precio}</h2>
      <AgregarAlCarrito prenda={prenda}/>
    </div>
  )
}

module.exports = Compra
