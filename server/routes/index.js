const express = require("express")
const UserController = require("../controllers/userController")
const router = express.Router()

router.get("/", (req, res) => res.status(200).json("WELCOME"))
router.post("/register", UserController.register)
router.post("/login", UserController.login)

module.exports = router
