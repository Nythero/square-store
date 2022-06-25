const React = require('react')
const { Link } = require('react-router-dom')

const NavLink = ({ to, title }) => {
  return <Link className='nav-link link-dark' to={to}>{title}</Link>
}

module.exports = NavLink
