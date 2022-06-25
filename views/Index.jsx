const React = require('react')
const Servicios = require('../components/Servicios.jsx')
const ProductosDestacados = require('../components/ProductosDestacados.jsx')

const Index = ({ content }) => {
  return (
    <div>
      <Servicios />
      <ProductosDestacados destacados={content}/>
    </div>
  )
}

module.exports = Index
