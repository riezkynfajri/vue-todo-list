"use strict"
const { Model } = require("sequelize")
const { hashPass } = require("../helpers/validator")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Todo, { foreignKey: "userId" })
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "This Email is Taken",
        },
        validate: {
          isEmail: { msg: "invalid email" },
          notNull: { msg: "Email is Required" },
          notEmpty: { msg: "Email is Required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is Required" },
          notEmpty: { msg: "Password is Required" },
          len: {
            args: 6,
            msg: "Minimum Password Length is 6 Characters",
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPass(user.password)
        },
      },
      modelName: "User",
    }
  )
  return User
}
