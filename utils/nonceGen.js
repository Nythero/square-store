const crypto = require('crypto')

const nonceGen = () => crypto.randomBytes(16).toString('base64')

module.exports = nonceGen
