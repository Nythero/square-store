const Component = require('../views/Component.jsx')
const NotFound = require('../views/NotFound.jsx')

const routes = [
  {
    path: '/',
    component: Component,
    exact: true
  },
  {
    path: '*',
    component: NotFound
  }
]

module.exports = routes
