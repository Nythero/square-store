const React = require('react')
const { Link } = require('react-router-dom')

const style = (color) => ({
  height: '500px',
  background: color
})

const Producto = ({ color, nombre, precio, link }) => {
  return (
    <div className='col-6 col-md-4 col-lg-3 px-0' >
      <Link to={link}>
        <div style={style(color)}></div>
        <p className='text-center mt-3'>{nombre}</p>
        <p className='text-center mt-3'>${precio}</p>
      </Link>
    </div>
  )
}

module.exports = Producto
