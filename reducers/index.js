const objectWith = require('../utils/objectWith.js')

const addMessageClient = (chat, payload) => {
  const message = payload
  const history = chat.history
  return objectWith(chat, { history: history.concat(message) })
}

const addMessageSupportRoom = (room, message) => {
  const history = room.history
  const newHistory = history.concat(message)
  return objectWith(room, { history: newHistory })
}

const addMessageSupportOpenRooms = (openRooms, message, id) => {
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

module.exports = {
  initialState,
  stateReducer
}
