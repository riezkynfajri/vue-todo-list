const errorHandler = (err, req, res, next) => {
  let code = 500
  let message = "Internal Server Error"
  console.log(err.message)
  if (err.name.includes("Unique")) {
    message = err.message
  } else if (err.name.includes("Validation")) {
    const errors = err.errors
      .map((error) => {
        return error.message
      })
      .join(", ")
    code = 400
    message = errors
  } else if (err.message.includes("Required")) {
    const errors = err.message.split(",").join(", ")
    code = 400
    message = errors
  } else if (err.message.includes("user")) {
    code = 400
    message = "Invalid Email"
  } else if (err.message.includes("wrong")) {
    code = 400
    message = "Invalid Password"
  }
  res.status(code).json({ message })
}

module.exports = errorHandler
