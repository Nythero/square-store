let id = 0

const room = (consultant) => ({
  consultant: consultant,
  support: null,
  history: [],
  id: id++
})

const avaliableSupports = []

const openRooms = []

const closedRooms = []

const roomDTO = room => ({
  id: room.id,
  history: room.history
})

const addSupport = (ws) => {
  avaliableSupports.push(ws)
  const openRoomsDTO = openRooms.map(r => roomDTO(r))
  const message = { type: 'avaliable-rooms', payload: openRoomsDTO }
  ws.send(JSON.stringify(message))
}

const addClient = (ws) => {
  const newRoom = room(ws)
  openRooms.push(newRoom)
}

const sendMessage = (ws, msg, room) => {
  const message = { type: 'message', payload: msg }
  if(room.consultant === ws && room.support)
    room.support.send(JSON.stringify(message))
  else if (room.support === ws && room.consultant)
    room.consultant.send(JSON.stringify(message))
  else
    console.log('The room is not full')
}

const isMember = ws => r => r.consultant === ws || r.support === ws

const handleMessage = (ws, msg) => {
  const parsedMessage = JSON.parse(msg)
  switch(parsedMessage.type) {
    case 'join-room':
      if(avaliableSupports.find(s => s === ws)) {
	const id = parsedMessage.payload
        const room = openRooms.find(r => r.id === id)
	room.support = ws
	const message = { type:'support-agent-connected' }
	room.consultant.send(JSON.stringify(message))
      }
    case 'message':
      const room = openRooms.find(isMember(ws))
      sendMessage(ws, msg, room)
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
