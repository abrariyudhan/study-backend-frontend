const { where } = require('sequelize');
const { User, Book, Booking } = require('../models')

module.exports = class booksController {

  // GET /books Get all books
  static async getAllBooks(req, res, next) {
    try {
      const books = await Book.findAll()

      res.status(200).json(books)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  // GET /books/:id Get book detail by id
  static async getBookById(req, res, next) {
    try {
      const { id } = req.params
      const books = await Book.findOne({
        where: { id: id },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })

      if (!books) {
        throw { name: 'NotFound', message: 'Book not found' }
      }
      res.status(200).json(books)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  // POST /books Create new book (Admin only)
  static async createBook(req, res, next) {
    try {
      const {
        title,
        author,
        isbn,
        category,
        stock,
        description,
        imageUrl } = req.body

      const bookExists = await Book.findOne({ where: { isbn } })

      if (bookExists) {
        throw { name: 'BadRequest', message: 'Book with this ISBN already exists' }
      }

      const newBooks = await Book.create({
        title,
        author,
        isbn,
        category,
        stock,
        description,
        imageUrl
      })

      res.status(201).json({
        id: newBooks.id,
        title: newBooks.title,
        author: newBooks.author,
        isbn: newBooks.isbn,
        category: newBooks.category,
        stock: newBooks.stock,
        description: newBooks.description,
        imageUrl: newBooks.imageUrl
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  // PUT /books/:id Update book by id (Admin only)
  static async updateBook(req, res, next) {
    try {
      const { id } = req.params
      const book = await Book.findByPk(id)

      if (!book) {
        throw { name: `NotFound`, message: `Book not found` }
      }
      const {
        title,
        author,
        isbn,
        category,
        stock,
        description,
        imageUrl } = req.body

      await book.update({
        title,
        author,
        isbn,
        category,
        stock,
        description,
        imageUrl
      })

      res.status(200).json({
        id: book.id,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        category: book.category,
        stock: book.stock,
        description: book.description,
        imageUrl: book.imageUrl
      })

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  // DELETE /books/:id Delete book by id (Admin only)
  static async deleteBook(req, res, next) {
    try {
      const { id } = req.params
      const book = await Book.findByPk(id)

      if (!book) {
        throw { name: `NotFound`, message: `Book not found` }
      }

      await book.destroy()

      res.status(200).json({ message: 'Book deleted successfully' })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}