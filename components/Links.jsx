const React = require('react')
const { Link } = require('react-router-dom')

const Links = () => {
  return (
    <div className='col-12 col-md-4'>
      <h4 className='my-3' >LINKS DE INTERÉS</h4>
      <ul className='list-group'>
        <li className='list-group-item'><Link className='link' to='/'>Inicio</Link></li>
        <li className='list-group-item'><Link className='link' to='/prendas'>Prendas</Link></li>
        <li className='list-group-item'><Link className='link' to='/cart'>Carrito</Link></li>
      </ul>
    </div>
  )
}

module.exports = Links
