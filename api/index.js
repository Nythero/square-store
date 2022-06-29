const express = require('express')
const api = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config.js')
const usersData = require('./usersData.json')

api.use(express.json())

api.post('/login', async (req, res, next) => {
const squareData = require('./squareData.json')
  const { username, password } = req.body

  const user = usersData.find(u => u.username === username)
  const isPasswordCorrect = user?
    await bcrypt.compare(password, user.passwordHash) :
    false

  if(!isPasswordCorrect)
    return res.status(401).json({ error: 'invalid username or password' })

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)
  res.status(200).json({
    token: token,
    username: user.username,
    type: user.type
  })
})

module.exports = api
