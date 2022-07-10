const React = require('react')
const { useEffect } = React
const isBrowser = require('../utils/isBrowser.js')

const PropsScript = props => {
  const nonce = isBrowser()? '' : props.nonce
  return (
    <script nonce={nonce} dangerouslySetInnerHTML={{
      __html: 'window.PROPS=' + JSON.stringify(props)
    }}/>
  )
}

module.exports = PropsScript
