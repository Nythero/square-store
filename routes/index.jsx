const Router = require('express').Router()
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { matchRoutes } = require('react-router-dom')
const { StaticRouter } = require('react-router-dom/server')
const App = require('../client/views/App.jsx')
const prendas = require('../api/squareData.json')
const routes = require('./routes.js')

const site = (location, props) => {
  return (
    <StaticRouter location={location}>
      <App {...props}/>
    </StaticRouter>
  )
}

const appendDoctype = html => `<!DOCTYPE html>${html}`

Router.get('*', (req, res) => {
  const content = { content: prendas, nonce: req.nonce }
  const html = ReactDOMServer.renderToString(site(req.url, content))
  res.send(appendDoctype(html))
})

module.exports = Router
