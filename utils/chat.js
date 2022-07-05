let id = 0

const room = (consultant) => ({
  consultant: consultant,
  support: null,
  history: [],
  id: id++
})

const avaliableSupports = []

const openRooms = {}

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
  const openRoomsDTO = map(openRooms, r => roomDTO(r))
  const message = { type: 'avaliable-rooms', payload: openRoomsDTO }
  ws.send(JSON.stringify(message))
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
  const payload = {
    message: message.payload,
    id: room.id
  }
  return {
    type: message.type,
    payload
  }
}

const sendMessage = (ws, message, room) => {
  if(room.consultant === ws && room.support) {
    const msg = JSON.stringify(clientMessage(message, room))
    room.support.send(msg)
  }
  else if (room.support === ws && room.consultant) {
    const msg = JSON.stringify(message)
    room.consultant.send(msg)
  }
  else
    console.log('The room is not full')
}

const isMember = ws => r => r.consultant === ws || r.support === ws

const find = (object, findFunction) => {
  const values = Object.values(object)
  return values.find(findFunction)
}

const handleMessage = (ws, msg) => {
  const parsedMessage = JSON.parse(msg)
  switch(parsedMessage.type) {
    case 'join-room':
      if(avaliableSupports.find(s => s === ws)) {
	const id = parsedMessage.payload
        const room = openRooms[id]
	room.support = ws
	const message = { type:'support-agent-connected' }
	room.consultant.send(JSON.stringify(message))
      }
    case 'message':
      const room = find(openRooms, isMember(ws))
      sendMessage(ws, parsedMessage, room)
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
