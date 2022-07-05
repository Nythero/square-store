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

const addMessageSupportTakenRooms = (takenRooms, message, id) => {
  const room = takenRooms[id]
  const newRoom = addMessageSupportRoom(room, message)
  const aux = {}
  aux[id] = newRoom
  return objectWith(takenRooms, aux)
}

const addMessageSupport = (chat, payload) => {
  const { id } = payload
  const message = {
    message: payload.message,
    type: payload.type
  }
  const takenRooms = addMessageSupportTakenRooms(chat.takenRooms, message, id)
  return objectWith(chat, { takenRooms })
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

const value = kv => kv[1]

const filterMap = (map, mapFunction) => {
  const entries = Object.entries(map)
  const filteredEntries = entries.filter(kv => mapFunction(value(kv)))
  return Object.fromEntries(filteredEntries)
}

const addRoom = (rooms, room) => {
  const aux = {}
  aux[room.id] = room
  return objectWith(rooms, aux)
}

const takeOpenRoom = (chat, id) => {
  const room = chat.openRooms[id]
  const openRooms = filterMap(chat.openRooms, r => r.id !== id)
  const takenRooms = addRoom(chat.takenRooms, room)
  return objectWith(chat, { openRooms, takenRooms })
}

const addOpenRoom = (chat, room) => {
  const openRooms = chat.openRooms
  const newOpenRooms = addRoom(openRooms, room)
  return objectWith(chat, { openRooms: newOpenRooms })
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
      const [OPEN, TAKEN] = [true, false]
      const chat = { 
	openRooms: {},
	takenRooms: {},
	actual: null,
	visibleRooms: OPEN
      }
      return objectWith(state, { chat })
    }
    case('set-open-rooms'): {
      const openRooms = action.payload
      const chat = state.chat
      const newChat = objectWith(chat, { openRooms })
      return objectWith(state, { chat: newChat })
    }
    case('send-chat-message'): {
      const message = action.payload
      const chat = addMessage(state.user, state.chat, message)
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
    case('toggle-chat-visible-rooms'): {
      const visibleRooms = state.chat.visibleRooms
      const chat = objectWith(state.chat, { visibleRooms: !visibleRooms })
      return objectWith(state, { chat })
    }
    case('take-open-room'): {
      const id = action.payload
      const chat = takeOpenRoom(state.chat, id)
      return objectWith(state, { chat })
    }
    case('add-open-room'): {
      const room = action.payload
      const chat = addOpenRoom(state.chat, room)
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
