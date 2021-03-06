const React = require('react')
const apiService = require('../services/api.js')
const { useContext } = React
const { DispatchContext } = require('../views/Contexts.js')
const websocket = require('../services/websocket.js')

const LogoutButton = () => {
  const dispatch = useContext(DispatchContext)
  const handleClick = () => {
    dispatch({ type: 'logout' })
    websocket.close()
  }
  return <button className='btn btn-link text-decoration-none link-dark' type='button' onClick={handleClick}>Logout</button>
}

module.exports = LogoutButton
