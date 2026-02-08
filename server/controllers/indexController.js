require('dotenv').config();
const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { where } = require('sequelize');


module.exports = class indexController {

    static async register(req, res, next) {
        try {
            const { email, password, fullName, role = 'member' } = req.body;

            if (!email) {
                throw { name: 'BadRequest', message: `Email is required` };
            }

            if (!password) {
                throw { name: 'BadRequest', message: `Password is required` };
            }

            if (password.length < 5) {
                throw { name: 'BadRequest', message: 'Password must be at least 5 characters long' };
            }

            if (!fullName) {
                throw { name: 'BadRequest', message: `Full name is required` };
            }

            const emailExists = await User.findOne({ where: { email } });

            if (emailExists) {
                throw { name: 'BadRequest', message: 'Email already registered' };
            }

            const newUser = await User.create({ email, password, fullName, role });

            res.status(201).json({ id: newUser.id, email: newUser.email, fullName: newUser.fullName, role: newUser.role });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email) {
                throw { name: "BadRequest", message: "Email is required" }
            }

            if (!password) {
                throw { name: "BadRequest", message: "Password is required" }
            }

            const userFound = await User.findOne({ where: { email } })

            if (!userFound) {
                throw { name: "Unauthorized", message: "Invalid email/password" }
            }

            const isValidPassword = comparePassword(password, userFound.password)

            if (!isValidPassword) {
                throw { name: "Unauthorized", message: "Invalid email/password" }
            }

            const access_token = signToken({ id: userFound.id })

            res.status(200).json({
                access_token,
                email: userFound.email,
                fullName: userFound.fullName
            })
        } catch (error) {
            console.log(error, "<<<<<<<<ERROR");
            next(error);
        }
    }
}