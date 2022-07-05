const React = require('react')
const { Link } = require('react-router-dom')
const SearchBar = require('./SearchBar.jsx')
const NavLink = require('./NavLink.jsx')
const { useContext } = React
const { StateContext } = require('../views/Contexts.js')
const LogoutButton = require('./LogoutButton.jsx')

const navWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  lineHeight: 4
}

const NavBar = () => {
  const user = useContext(StateContext).user
  return (
    <div className='d-flex justify-content-center'>
      <nav className='navbar'>
        <NavLink to='/' title='Logo' />
        <NavLink to='/prendas' title='Prendas' />
        <NavLink to='/cart' title='Carrito' />
        {
	  user?
	    <React.Fragment>
	      <NavLink to='/dashboard' title='Dashboard' />
	      <LogoutButton />
	    </React.Fragment> :
            <NavLink to='/login' title='Login' />
        }
        <SearchBar />
      </nav>
    </div>
  )
}

module.exports = NavBar
