const React = require('react')
const { useEffect } = React
const apiService = require('../services/api.js')
const Chat = require('./Chat.jsx')

const SupportChat = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}

module.exports = SupportChat
