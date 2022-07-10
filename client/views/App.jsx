const React = require('react')
const NavBar = require('../components/NavBar.jsx')
const { Routes, Route, useMatch } = require('react-router-dom')
const NotFound = require('./NotFound.jsx')
const Index = require('./Index.jsx')
const Prendas = require('./Prendas.jsx')
const Cart = require('./Cart.jsx')
const Login = require('./Login.jsx')
const Prenda = require('./Prenda.jsx')
const Dashboard = require('./Dashboard.jsx')
const Footer = require('../components/Footer.jsx')
const HideableChat = require('../components/HideableChat.jsx')
const { useReducer, useEffect } = React
const {
  DispatchContext,
  StateContext
} = require('./Contexts.js')
const Alert = require('../components/Alert.jsx')
const { stateReducer, initialState } = require('../reducers')
const PropsScript = require('../components/PropsScript.jsx')

const App = (props) => {
  const match = useMatch('/prendas/:id')
  const prendas = props.content
  const prenda = match? 
    prendas.find(p => p.id === Number(match.params.id)) :
    null
  const [state, dispatch] = useReducer(stateReducer, initialState)
  return (
    <html style={{ overflowY: 'scroll' }} lang='es'>
      <head>
        <title>Prendas Store</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, intial-scale=1" />
        <meta name="description" content="Una tienda de cuadrados" />
      </head>
      <body className='container'>
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
        <NavBar />
        <Alert />
        <Routes>
          <Route path='/prendas/:id' element={<Prenda content={prenda} />} />
          <Route path='/prendas' element={<Prendas content={prendas} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard user={state.user} />} />
          <Route path='/logout' element={null} />
          <Route path='/' element={<Index content={prendas.filter(p => p.esDestacado)} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        {!state.user && <HideableChat />}
        <Footer />
          </DispatchContext.Provider>
        </StateContext.Provider>
        <PropsScript {...props} />
        <script src='/bundle.js' />
      </body>
    </html>
  )
}

module.exports = App
