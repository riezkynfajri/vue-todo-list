const express = require("express")
const todoController = require("../controllers/todoController")
const authn = require("../middlewares/authn")
const belong = require("../middlewares/authorization")
const router = express.Router()

router.use(authn)
router.get("/", todoController.todos)
router.post("/", todoController.addTodo)
router.delete("/:id", belong, todoController.deleteTodo)
router.patch("/status/:id", belong, todoController.updateStatus)
router.patch("/name/:id", belong)

module.exports = router
