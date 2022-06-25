const axios = require('axios')

const baseUrl = '/api'

const getDestacados = async () => {
  const response = await axios.get(`${baseUrl}/destacados`)
  return response.data
}

const getPrendas = async () => {
  const response = await axios.get(`${baseUrl}/prendas`)
  return response.data
}

module.exports = {
  getDestacados,
  getPrendas
}
