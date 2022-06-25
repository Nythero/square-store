const React = require('react')

const style = (color) => ({
  height: '500px',
  background: color
})

const PrendaCompra = ({ prenda }) => {
  return (
    <div className='col-6'>
      <div style={style(prenda.color)}></div>
    </div>
  )
}

module.exports = PrendaCompra
