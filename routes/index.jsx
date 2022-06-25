const Router = require('express').Router()
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { matchRoutes } = require('react-router-dom')
const { StaticRouter } = require('react-router-dom/server')
const App = require('../views/App.jsx')
const prendas = require('../api/squareData.json')
const routes = require('./routes.js')

const site = (location, props) => {
  return (
    <StaticRouter location={location}>
      <App {...props}/>
    </StaticRouter>
  )
}

Router.get('*', (req, res) => {
  const content = { content: prendas }
  const html = ReactDOMServer.renderToString(site(req.url, content))
  res.send(html)
})

module.exports = Router
