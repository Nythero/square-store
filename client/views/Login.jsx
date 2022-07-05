const React = require('react')
const { useField } = require('../hooks')
const InputField = require('../components/InputField.jsx')
const apiService = require('../services/api.js')
const { useContext } = React
const { 
  DispatchContext,
  StateContext
} = require('./Contexts.js')
const { Navigate } = require('react-router-dom')

const Login = () => {
  const [username, resetUsername] = useField('username', 'text')
  const [password, resetPassword] = useField('password', 'password')
  const dispatch = useContext(DispatchContext)
  const user = useContext(StateContext).user
  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = await apiService.login(
      username.value, 
      password.value
    )
    dispatch({ type: 'login', payload: user })
    resetUsername()
    resetPassword()
  }
  return (
    <div>
      {
	user && <Navigate to='/' replace={true} />
      }
      <form onSubmit={handleSubmit}>
        <InputField {...username} />
        <InputField {...password} />
        <button className='btn btn-outline-dark mt-3' >Login</button>
      </form>
    </div>
  )
}

module.exports = Login
