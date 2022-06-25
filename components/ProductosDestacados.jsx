const React = require('react')
const Producto = require('./Producto.jsx')

const ProductosDestacados = ({ destacados }) => {
  return (
    <section className='row g-0'>
      {destacados.map(p => <Producto key={p.id} {...p} />)}
    </section>
  )
}

module.exports = ProductosDestacados
