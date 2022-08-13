const { comparePass, createToken } = require("../helpers/validator")
const { User } = require("../models")

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body

      await User.create({ email, password })
      res.status(201).json({ message: "Account Created" })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const empty = []
      !email ? empty.push("Email is Required") : null
      !password ? empty.push("Password is Required") : null
      if (empty.length > 0) throw new Error(empty)

      const user = await User.findOne({ where: { email } })
      if (!user) throw new Error("no user")

      const pass = comparePass(password, user.password)
      if (!pass) throw new Error("wrong pass")

      const payload = { id: user.id, email: user.email }
      const token = createToken(payload)

      res.status(200).json({
        message: "You're Logged In",
        token,
      })
    } catch (err) {
      next(err)
    }
  }
}
