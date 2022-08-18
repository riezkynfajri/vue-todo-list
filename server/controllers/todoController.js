const { User, Todo } = require("../models")

module.exports = class todoController {
  static async addTodo(req, res, next) {
    try {
      const { name } = req.body
      const { id: userId } = req.userData
      await Todo.create({ name, userId, date: Date.now(), status: "on going" })

      res.status(201).json({ message: "Added to Your Todo List!" })
    } catch (err) {
      next(err)
    }
  }

  static async todos(req, res, next) {
    try {
      const { id: userId } = req.userData
      const data = await Todo.findAll({
        where: { userId },
        attributes: ["id", "name", "status", "date"],
      })
      res.status(200).json({ data })
    } catch (err) {
      next(err)
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      const { id } = req.params
      const todo = await Todo.findByPk(id)
      await Todo.destroy({ where: { id } })
      res.status(200).json({ message: `Removed ${todo.name} from your list` })
    } catch (err) {
      next(err)
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params
      const { status } = req.body

      const update = await Todo.update({ status }, { where: { id }, returning: true })
      const todo = update[1][0].dataValues
      res.status(200).json({ message: `Updated ${todo.name} status to ${todo.status}` })
    } catch (err) {
      next(err)
    }
  }

  static async changeName(req, res, next) {
    try {
      const { id } = req.params
      const { name } = req.body

      const update = await Todo.update({ name }, { where: { id }, returning: true })
      const todo = update[1][0].dataValues
      res.status(200).json({ message: `Updated Todo Name to ${todo.name}` })
    } catch (err) {
      next(err)
    }
  }
}
