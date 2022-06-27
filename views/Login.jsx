const React = require('react')
const { useField } = require('../hooks')
const InputField = require('../components/InputField.jsx')

const Login = () => {
  const [username, resetUsername] = useField('username', 'text')
  const [password, resetPassword] = useField('password', 'password')
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputField {...username} />
        <InputField {...password} />
        <button className='btn btn-outline-dark mt-3' >Login</button>
      </form>
    </div>
  )
}

module.exports = Login
