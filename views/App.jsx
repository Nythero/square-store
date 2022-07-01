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
const objectWith = require('../utils/objectWith.js')


const addMessageClient = (chat, payload) => {
  const message = payload
  const history = chat.history
  return objectWith(chat, { history: history.concat(message) })
}

const addMessageSupportRoom = (room, message) => {
  console.log(room)
  const history = room.history
  const newHistory = history.concat(message)
  return objectWith(room, { history: newHistory })
}

const addMessageSupportOpenRooms = (openRooms, message, id) => {
  console.log(openRooms)
  const room = openRooms[id]
  const newRoom = addMessageSupportRoom(room, message)
  return openRooms.map(
    r => (r.id === id)? newRoom : r
  )
}

const addMessageSupport = (chat, payload) => {
  const { id } = payload
  const message = {
    message: payload.message,
    type: payload.type
  }
  const openRooms = addMessageSupportOpenRooms(chat.openRooms, message, id)
  return objectWith(chat, { openRooms })
}

const addMessage = (user, chat, payload) => {
  switch(userType(user)) {
    case 'support':
      return addMessageSupport(chat, payload)
      break
    case 'client':
      return addMessageClient(chat, payload)
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
  console.log(state, action)
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
      const chat = { openRooms: [], actual: null }
      return objectWith(state, { chat })
    }
    case('set-avaliable-rooms'): {
      const openRooms = action.payload
      const chat = state.chat
      const newChat = objectWith(chat, { openRooms })
      return objectWith(state, { chat: newChat })
    }
    case('send-chat-message'): {
      const message = action.payload
      const chat = addMessage(state.user, state.chat, message)
      console.log('send-chat-message')
      return objectWith(state, { chat })
    }
    case('receive-chat-message'): {
      const message = action.payload
      const chat = addMessage(state.user, state.chat, message)
      return objectWith(state, { chat })
    }
    case('set-actual-chat-room'): {
      const id = action.payload
      const chat = objectWith(state.chat, { actual: id })
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
