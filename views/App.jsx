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
const { useReducer } = React
const {
  DispatchContext,
  StateContext
} = require('./Contexts.js')
const Alert = require('../components/Alert.jsx')

const objectWith = (object, objectWithValues) => {
  return Object.assign({}, object, objectWithValues)
}

const addMessageClient = (chat, message) => {
  const messageObject = { message, type: 'received' }
  const history = chat.history
  return objectWith(chat, { history: history.concat(messageObject) })
}

const addMessageSupport = (chat, message, id) => {
  const messageObject = { message, type: 'received' }
  const room = chat.rooms[id]
  const history = room.history
  const newHistory = objectWith(room, { history: history.concat(messageObject) })
  return objectWith(chat, { history: newHistory })
}

const addMessage = (user, chat, message, id) => {
  switch(userType(user)) {
    case 'support':
      return addMessageSupport(chat, message, id)
      break
    case 'client':
      return addMessageClient(chat, message)
      break
    default:
      break
  }
}

const userType = user => {
  if(!user)
    return 'client'
  return user.type
}

const stateReducer = (state, action) => {
  switch(action.type) {
    case('add-to-cart'): {
      const carrito = state.carrito
      const prenda = action.payload
      const newCarrito = (carrito.some(p => p.id === prenda.id))?
        carrito.map(p => (p.id === prenda.id)? 
	  objectWith(prenda, { cantidad: p.cantidad + 1 }) :
	  p
	) :
        carrito.concat(objectWith(prenda, { cantidad: 1 }))
      return objectWith(state, { carrito: newCarrito })
    }
    case('remove-from-cart'): {
      const carrito = state.carrito
      const id = action.payload
      const newCarrito = carrito.filter(p => p.id !== id)
      return objectWith(state, { carrito: newCarrito })
    }
    case('increase-quantity'): {
      const carrito = state.carrito
      const id = action.payload
      const newCarrito = carrito.map(p => (p.id === id)? 
	objectWith(p, { cantidad: p.cantidad + 1 }) :
	p
      )
      return objectWith(state, { carrito: newCarrito })
    }
    case('clear-cart'): {
      const carrito = []
      return objectWith(state, { carrito })
    }
    case('decrease-quantity'): {
      const carrito = state.carrito
      const id = action.payload
      const newCarrito = carrito.map(p => (p.id === id && p.cantidad > 1)? 
	objectWith(p, { cantidad: p.cantidad - 1 }) :
	p
      )
      return objectWith(state, { carrito: newCarrito })
    }
    case('show-notification'): {
      const notificacion = action.payload
      return objectWith(state, { notificacion })
    }
    case('hide-notification'): {
      const notificacion = { tipo: '', mensaje: '' }
      return objectWith(state, { notificacion })
    }
    case('login'): {
      const user = action.payload
      return objectWith(state, { user })
    }
    case('logout'): {
      const user = null
      return objectWith(state, { user })
    }
    case('connect-chat-user'): {
      const chat = { history: [] }
      return objectWith(state, { chat })
    }
    case('connect-chat-support'): {
      const chat = { openRooms: [] }
      return objectWith(state, { chat })
    }
    case('set-avaliable-rooms'): {
      const openRooms = action.payload
      const chat = state.chat
      const newChat = objectWith(chat, { openRooms })
      return objectWith(state, { chat: newChat })
    }
    case('send-chat-message'): {
      const { message, id } = action.payload
      const msg = { message, type: 'sended' }
      const chat = addMessage(state.chat, msg, id)
      return objectWith(state, { chat })
    }
    case('receive-chat-message'): {
      const { message, id } = action.payload
      const msg = { message, type: 'received' }
      const chat = addMessage(state.chat, msg, id)
      return objectWith(state, { chat })
    }
    default:
      return state
  }
}

const initialState = {
  carrito: [],
  notificacion: { tipo: '', mensaje: '' },
  chat: null,
  user: null
}

const App = (props) => {
  const match = useMatch('/prendas/:id')
  const prendas = props.content
  const prenda = match? 
    prendas.find(p => p.id === Number(match.params.id)) :
    null
  const [state, dispatch] = useReducer(stateReducer, initialState)
  return (
    <html style={{ overflowY: 'scroll' }}>
      <head>
        <title>Prendas Store</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
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
        <script dangerouslySetInnerHTML={{
	  __html: 'window.PROPS=' + JSON.stringify(props)
	}}/>
        <script src='/public/bundle.js' />
      </body>
    </html>
  )
}

module.exports = App
