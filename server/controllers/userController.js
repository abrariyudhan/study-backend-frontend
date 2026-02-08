const { where } = require('sequelize');
const { User, Booking, Book } = require('../models')

module.exports = class userController {

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
    static async updateUser(req, res, next) {
        try {

        } catch (error) {
            console.log(error, "<<<<<<ERROR");
            next(error)
        }
    }
    static async deleteUser(req, res, next) {
        try {

        } catch (error) {
            console.log(error, "<<<<<<ERROR");
            next(error)
        }
    }
}