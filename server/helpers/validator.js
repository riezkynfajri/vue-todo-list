const jwt = require("jsonwebtoken")
const bc = require("bcrypt")

const hashPass = (password) => bc.hashSync(pass, 10)

const comparePass = (password, hash) => bc.compareSync(pass, hash)

const createToken = (data) => jwt.sign(data, process.env.SECRET)

const verifyToken = (token) => jwt.verify(token, process.env.SECRET)

module.exports = {
  hashPass,
  comparePass,
  createToken,
  verifyToken,
}
