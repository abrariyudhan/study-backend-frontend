const { where } = require('sequelize');
const { User, Booking, Book } = require('../models')

module.exports = class userController {

  // GET /users Get all users (can filter by role)
  static async getAllUser(req, res, next) {
    try {
      const user = await User.findAll({
        include: [Booking]
      });
      res.status(200).json(user);
    } catch (error) {
      console.log(error, "<<<<<<ERROR");
      next(error)
    }
  }

  // GET /users/:id Get user detail by id with their bookings
  static async getUserById(req, res, next) {
    try {

      const { id } = req.params

      const userFound = await User.findByPk(id,
        {
          include: [Booking]
        }
      )

      if (!userFound) {
        throw { name: `NotFound`, message: `User not found` }
      }

      res.status(200).json(userFound)
    } catch (error) {
      console.log(error, "<<<<<<ERROR");
      next(error)
    }
  }

  // POST /users Create new user/member (Admin only)
  static async createUser(req, res, next) {
    try {
      const {
        email,
        password,
        fullName,
        role = 'member',
        phone,
        address } = req.body

      const newUser = await User.create({
        email,
        password,
        fullName,
        role,
        phone,
        address
      })

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        phone: newUser.phone,
        address: newUser.address
      })
    } catch (error) {
      console.log(error, "<<<<<<ERROR");
      next(error)
    }
  }

  // PUT /users/:id Update user by id (Admin only)
  static async updateUser(req, res, next) {
    try {

      const { id } = req.params

      const user = await User.findByPk(id)
      if (!user) {
        throw { name: `NotFound`, message: `User not found` }
      }

      const { fullName, phone, address } = req.body

      await user.update({ fullName, phone, address })

      res.status(200).json({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone,
        address: user.address
      })
    } catch (error) {
      console.log(error, "<<<<<<ERROR");
      next(error)
    }
  }

  // DELETE /users/:id Delete user by id (Admin only)
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params

      const user = await User.findByPk(id)

      if (!user) {
        throw { name: `NotFound`, message: `User not found` }
      }

      await user.destroy()

      res.status(200).json({ message: `User deleted successfully` })
    } catch (error) {
      console.log(error, "<<<<<<ERROR");
      next(error)
    }
  }
}