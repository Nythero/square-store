const React = require('react')
const { useState } = React
const ClientChat = require('./ClientChat.jsx')
const HideableChatHeader = require('./HideableChatHeader.jsx')

const style = isHidden => ({
  right: '1em',
  left: 'auto',
  bottom: '1em',
  height: isHidden? 'inherit' : '75%',
  width: isHidden? 'auto' : '20%'
})

const HideableChat = () => {
  const [isHidden, setIsHidden] = useState(true)

  const handleClick = (event) => {
    setIsHidden(!isHidden)
  }

  return (
    <div className='fixed-bottom d-flex flex-column' style={style(isHidden)}>
    {
      isHidden? 
        <button className='btn btn-outline-dark mt-auto' onClick={handleClick}>
          Chat
        </button> :
        <React.Fragment>
          <HideableChatHeader handleClick={handleClick} />
          <ClientChat />
        </React.Fragment>
    }
    </div>
  )
}

module.exports = HideableChat
