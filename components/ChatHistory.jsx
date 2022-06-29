const React = require('react')

const messageKey = message => `${message}${Math.floor(Math.random() * 10000)}`

const mapAlignment = type => {
  if (type === 'received')
    return 'flex-start'
  else if (type === 'sended')
    return 'flex-end'
}

const style = (type) => {
  const alignment = mapAlignment(type)
  return {
    maxWidth: '75%',
    overflowWrap: 'anywhere',
    alignSelf: mapAlignment(type)
  }
}

const classNames = {
  sended: 'rounded bg-dark text-light p-3',
  received: 'rounded bg-light p-3'
}

const ChatHistory = ({ history }) => {
  return (
    <div className='d-flex flex-column flex-grow-1'>
      {
	history.map(
	  message => (
	    <p 
	      className={classNames[message.type]}
	      style={style(message.type)}
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
