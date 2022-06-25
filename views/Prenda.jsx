const React = require('react')
const { useEffect, useState } = React
const PrendaCompra = require('../components/PrendaCompra.jsx')
const Compra = require('../components/Compra.jsx')

const Prenda = ({ content }) => {
  return (
    <div className='row'>
      <PrendaCompra prenda={content}/>
      <Compra prenda={content}/>
    </div>
  )
}

module.exports = Prenda
