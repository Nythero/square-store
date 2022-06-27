const React = require('react')

const messageKey = message => `${message}${Math.floor(Math.random() * 10000)}`

const ChatHistory = ({ history }) => {
  console.log(history)
  return (
    <div>
      {history.map(message => <p key={messageKey(message)}>{message}</p>)}
    </div>
  )
}

module.exports = ChatHistory
