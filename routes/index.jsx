const Router = require('express').Router()
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { matchRoutes } = require('react-router-dom')
const routes = require('./routes.jsx')

Router.get('*', (req, res) => {
  const props = { title: 'React Server Side Rendering',
    initialNumber: req.params
  }
  const matchedRoutes = matchRoutes(routes, req.url)
  const firstMatched = matchedRoutes[0]
  if(firstMatched.route.path === '*')
    res.status(404)
  const component = matchedRoutes[0].route.component
  const html = ReactDOMServer.renderToString(React.createElement(component, props))
  res.send(html)
})

module.exports = Router
