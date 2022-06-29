const room = {
  consultant: null,
  support: null
}

const addSupport = (ws) => {
  room.support = ws
}

const addClient = (ws) => {
  room.consultant = ws
}

const sendMessage = (ws, msg) => {
  if(room.consultant === ws && room.support)
    room.support.send(msg)
  else if (room.support === ws && room.consultant)
    room.consultant.send(msg)
  else
    console.log('The room is not full')
}

const chat = {
  addSupport,
  addClient,
  sendMessage
}

module.exports = chat
