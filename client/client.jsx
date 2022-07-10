const React = require('react')
const ReactDOM = require('react-dom/client')
const App = require('./views/App.jsx')
const { BrowserRouter } = require('react-router-dom')

const props = window.PROPS

if(true) {
ReactDOM.hydrateRoot(document, 
  <BrowserRouter>
    <App {...props} />
  </BrowserRouter>
)
}
