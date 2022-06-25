const React = require('react')
const { Link } = require('react-router-dom')
const SearchBar = require('./SearchBar.jsx')
const NavLink = require('./NavLink.jsx')

const navWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  lineHeight: 4
}

const NavBar = () => {
  return (
    <div className='d-flex justify-content-center'>
      <nav className='navbar'>
        <NavLink to='/' title='Logo' />
        <NavLink to='/prendas' title='Prendas' />
        <NavLink to='/cart' title='Carrito' />
        <NavLink to='/login' title='Login' />
        <SearchBar />
      </nav>
    </div>
  )
}

module.exports = NavBar
