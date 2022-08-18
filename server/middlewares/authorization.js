const { Todo } = require("../models")

const belong = async (req, res, next) => {
  try {
    const { id: userId } = req.userData
    const { id } = req.params
    const todo = await Todo.findByPk(+id)
    if (!todo) throw new Error("Todo Not Found")
    if (todo.userId !== +userId) throw new Error("This Todo is Not Yours to Delete")
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = belong
