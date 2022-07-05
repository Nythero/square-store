const React = require('react')

const messageKey = message => `${message}${Math.floor(Math.random() * 10000)}`

const styles = {
  sended: {
    maxWidth: '75%',
    overflowWrap: 'anywhere',
    alignSelf: 'flex-end'
  },
  received: {
    maxWidth: '75%',
    overflowWrap: 'anywhere',
    alignSelf: 'flex-start',
    backgroundColor: '#d5d5d5'
  } 
}

const classNames = {
  sended: 'rounded bg-dark text-light p-3',
  received: 'rounded p-3'
}

const historyStyle = {
  overflowY: 'scroll'
}

const ChatHistory = ({ history }) => {
  return (
    <div style={historyStyle} className='d-flex flex-column flex-grow-1'>
      {
	history.map(
	  message => (
	    <p
	      className={classNames[message.type]}
	      style={styles[message.type]}
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
