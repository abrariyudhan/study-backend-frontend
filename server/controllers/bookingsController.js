const { where } = require('sequelize')
const { User, Book, Booking } = require('../models')
const { Where } = require('sequelize/lib/utils')
module.exports = class bookingsController {

  // GET /booking Get all booking
  static async getAllBookings(req, res, next) {
    try {
      const whereClause = {};

      // Members can only see their own bookings
      if (req.user.role === 'member') {
        whereClause.UserId = req.user.id;
      }

      const bookings = await Booking.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            attributes: ['id', 'fullName', 'email']
          },
          {
            model: Book,
            attributes: ['id', 'title', 'author']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      if (bookings.length === 0) {
        throw { name: 'NotFound', message: 'No bookings found' }
      }

      res.status(200).json(bookings)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  // POST /booking Create new book (Admin only)
  static async createBooking(req, res, next) {
    try {
      let { UserId, BookId } = req.body

      // Checking book
      const book = await Book.findByPk(BookId)
      if (!book) {
        throw {
          name: 'NotFound', message: 'Book not found'
        }
      }

      // Check book stock still available
      if (book.stock <= 0) {
        throw {
          name: 'BadRequest', message: 'Book out of stock!'
        }
      }

      // Check User
      const user = await User.findByPk(UserId)
      if (!user) {
        throw {
          name: 'NotFound', message: 'User not found'
        }
      }

      // Check User already booking this book
      const bookExist = await Booking.findOne({
        where: {
          UserId,
          BookId,
          status: 'borrowed'
        }
      })

      if (bookExist) {
        throw { name: 'BadRequest', message: 'User already has this book borrowed' }
      }

      //Create Booking
      const booking = await Booking.create({
        UserId,
        BookId,
        bookingDate: new Date(),
        status: 'borrowed'
      })

      // Decrease book stocks
      await book.update({ stock: book.stock - 1 })

      res.status(201).json({
        id: booking.id,
        UserId: booking.UserId,
        BookId: booking.BookId,
        bookingDate: booking.bookingDate,
        returnDate: booking.returnDate,
        status: booking.status
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  // PATCH /booking/:id Update book by id (Admin only)
  static async returnBooking(req, res, next) {
    try {
      const { id } = req.params
      console.log(id, "<<<<<<<<<<<<<");
      
      const booking = await Booking.findByPk(id, {
        include: [
          {
            model: Book
          }
        ]
      })

      // Check there is a booking with id or not
      if (!booking) {
        throw { name: 'NotFound', message: 'Booking not found' }
      }

      // Update booking status and return date
      
      await booking.update({
        returnDate: new Date(),
        status: 'returned'
      })

       // Increase book stock
      await booking.Book.update({ 
        stock: booking.Book.stock + 1 
      });

      res.status(200).json({
        id: booking.id,
        UserId: booking.UserId,
        BookId: booking.BookId,
        bookingDate: booking.bookingDate,
        returnDate: booking.returnDate,
        status: booking.status

      })

    } catch (error) {
      console.log(error, "<<<<<<<<<<<<<<<");
      next(error)
    }
  }


}