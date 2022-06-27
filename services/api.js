const axios = require('axios')

const baseUrl = '/api'

const login = async (username, password) => {
  const loginData = { username, password }
  const response = await axios.post(`${baseUrl}/login`, loginData)
  return response.data
}

module.exports = {
  login
}
