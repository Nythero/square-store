const React = require('react')
const ReactDOM = require('react-dom/client')
const Component = require('./Component.jsx')
const { BrowserRouter } = require('react-router-dom')

const props = window.PROPS

if(true)
  ReactDOM.createRoot(document).render(
    <BrowserRouter>
      <Component {...props} />
    </BrowserRouter>
  )
