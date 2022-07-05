let id = 0

const room = (consultant) => ({
  consultant: consultant,
  support: null,
  history: [],
  id: id++
})

const avaliableSupports = []

const openRooms = {}

const takenRooms = {}

const closedRooms = {}

const roomDTO = room => ({
  id: room.id,
  history: room.history
})

const value = kv => kv[1]

const key = kv => kv[0]

const map = (object, mapFunction) => {
  const entries = Object.entries(object)
  const newValue = kv => mapFunction(value(kv))
  const newEntries = entries.map(kv => [key(kv), newValue(kv)])
  return Object.fromEntries(newEntries)
}

const addSupport = (ws) => {
  avaliableSupports.push(ws)
  const roomsDTO = rooms => map(rooms, r => roomDTO(r))
  const message1 = { type: 'avaliable-rooms', payload: roomsDTO(openRooms) }
  const message2 = { type: 'taken-rooms', payload: roomsDTO(takenRooms) }
  ws.send(JSON.stringify(message1))
  ws.send(JSON.stringify(message2))
}

const notifyNewOpenRoom = (ws, newRoom) => {
  const message = { type: 'new-open-room', payload: roomDTO(newRoom) }
  avaliableSupports.forEach(s => s.send(JSON.stringify(message)))
}

const addClient = (ws) => {
  const newRoom = room(ws)
  openRooms[newRoom.id] = newRoom
  notifyNewOpenRoom(ws, newRoom)
}

const clientMessage = (message, room) => {
  const objectWith = require('./objectWith.js')
  const payload = objectWith(message.payload, { id: room.id })
  return objectWith(message, { payload })
}

const sendMessage = (ws, message, room) => {
  if(room.consultant === ws && room.support) {
    const msg = JSON.stringify(clientMessage(message, room))
    console.log(msg)
    room.support.send(msg)
    room.history.push({ message: msg, sender: 'client' })
  }
  else if (room.support === ws && room.consultant) {
    const msg = JSON.stringify(message)
    console.log(msg)
    room.consultant.send(msg)
    room.history.push({ message: msg, sender: 'support' })
  }
  else
    console.log('The room is not full')
}

const isMember = ws => r => r.consultant === ws || r.support === ws

const find = (object, findFunction) => {
  const values = Object.values(object)
  return values.find(findFunction)
}

const takeOpenRoom = (room, ws) => {
  room.support = ws
  delete openRooms[room.id]
  takenRooms[room.id] = room
}

const roomOf = (ws, message) => {
  const userType = message.payload.sender
  switch(userType) {
    case 'client':
      return find(takenRooms, isMember(ws))
    case 'support':
      const id = message.payload.id
      return takenRooms[id]
    default:
      return null
  }
}

const handleMessage = (ws, msg) => {
  const parsedMessage = JSON.parse(msg)
  console.log(parsedMessage)
  switch(parsedMessage.type) {
    case 'join-room':
      if(avaliableSupports.find(s => s === ws)) {
        const id = parsedMessage.payload
        const room = find(openRooms, r => r.id === id)
        takeOpenRoom(room, ws)
	const message = { type:'support-agent-connected' }
	room.consultant.send(JSON.stringify(message))
      }
      break
    case 'message':
      const room = roomOf(ws, parsedMessage)
      sendMessage(ws, parsedMessage, room)
      break
    default:
      break
  }
}

const chat = {
  addSupport,
  addClient,
  sendMessage,
  handleMessage
}

module.exports = chat
