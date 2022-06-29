const React = require('react')

const HideableChatHeader = ({ handleClick }) => {
  return (
    <div className='bg-dark text-white d-flex'>
      <p className='flex-grow-1 text-center mb-0 align-self-center'
        style={{ paddingLeft: '40px' }}>Square Store</p>
      <button onClick={handleClick}
        className='btn btn-link text-white'
        style={{ fontWeight: 800 }}>__</button>
    </div>
  )
}

module.exports = HideableChatHeader
