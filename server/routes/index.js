const express = require("express")
const UserController = require("../controllers/userController")
const router = express.Router()
const todos = require("./todoRoutes")

router.get("/", (req, res) => res.status(200).json("WELCOME"))
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.use("/todo", todos)

module.exports = router
