const { verifyToken } = require("../helpers/validator")
const { User } = require("../models")

const authn = async (req, res, next) => {
  try {
    const { token } = req.headers
    if (!token) throw new Error("You're Unauthorized")

    const payload = verifyToken(token)
    const foundUser = await User.findByPk(payload.id)
    if (!foundUser) throw new Error("You're Unauthorized")

    req.userData = { id: foundUser.id, email: foundUser.email }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authn
