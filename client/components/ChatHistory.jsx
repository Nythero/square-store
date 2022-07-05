const React = require('react')
const { useContext } = React
const { StateContext } = require('../views/Contexts.js')

const messageKey = message => `${message}${Math.floor(Math.random() * 10000)}`

const style = (message, user) => {
  if(userType(user) === message.sender)
    return {
      maxWidth: '75%',
      overflowWrap: 'anywhere',
      alignSelf: 'flex-end'
    }
  else
    return {
      maxWidth: '75%',
      overflowWrap: 'anywhere',
      alignSelf: 'flex-start',
      backgroundColor: '#d5d5d5'
    } 
}

const className = (message, user) => {
  if(userType(user) === message.sender)
    return 'rounded bg-dark text-light p-3'
  else
    return 'rounded p-3'
}

const historyStyle = {
  overflowY: 'scroll'
}

const userType = user => {
  if(!user)
    return 'client'
  return user.type
}

const ChatHistory = ({ history }) => {
  const user = useContext(StateContext).user
  console.log(history)
  return (
    <div style={historyStyle} className='d-flex flex-column flex-grow-1'>
      {
	history.map(
	  message => (
	    <p
	      className={className(message, user)}
	      style={style(message, user)}
	      key={messageKey(message.message)}>
	      {message.message}
	    </p>
	  )
	)
      }
    </div>
  )
}

module.exports = ChatHistory
