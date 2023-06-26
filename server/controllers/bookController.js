const Book = require("../models/bookModel")
const ApiError = require("../error/ApiError")
const sequelize = require('../db')
const { QueryTypes } = require('sequelize')

class BookController {

  async getAll(req, res, next) {
    let {authorId, limit, page} = req.query
    page = page || 1
    limit = limit || 100
    let offset = page * limit - limit

    try {
      let books
      if (authorId) {
        books = await sequelize.query(`SELECT * FROM "Books" WHERE author_id = :authorId LIMIT :limit OFFSET :offset`, {
          replacements: {authorId, limit, offset},
          type: QueryTypes.SELECT
        })
      } else {
        books = await sequelize.query(`
        SELECT * FROM "Books" LIMIT :limit OFFSET :offset
      `, {
          replacements: {limit, offset},
          type: QueryTypes.SELECT
        })
      }

      if (!books || books.length === 0) {
        return next(ApiError.notFound('Books were not found'))
      }

      const total = await sequelize.query('SELECT COUNT(*) FROM "Books"', {
        type: QueryTypes.SELECT
      })

      res.json({
        count: total[0].count,
        rows: books,
      })
    }
    catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async getBooksWithAuthors(req, res, next) {
    let {limit, page} = req.query
    page = page || 1
    limit = limit || 10
    let offset = page * limit - limit

    try {
      let books = await sequelize.query(`SELECT "Books".*, "Authors".name, "Authors".birth_date, "Authors".nationality 
        FROM "Books" JOIN "Authors" 
        ON "Books".author_id = "Authors".author_id 
        LIMIT :limit OFFSET :offset
      `, {
          replacements: {limit, offset},
          type: QueryTypes.SELECT
        })

      const total = await sequelize.query(`
        SELECT COUNT(*) FROM "Books" 
        JOIN "Authors" ON "Books".author_id = "Authors".author_id`,
        {
          type: QueryTypes.SELECT
        })

      if (!books || books.length === 0) {
        if (offset >= total[0].count) {
          const remaining = total[0].count % limit;
          offset = total[0].count - remaining;

          books = await sequelize.query(`SELECT "Books".*, "Authors".name, "Authors".birth_date, "Authors".nationality 
          FROM "Books" JOIN "Authors" 
          ON "Books".author_id = "Authors".author_id 
          LIMIT :limit OFFSET :offset
        `, {
            replacements: {limit: remaining, offset},
            type: QueryTypes.SELECT
          })
        }
        // If there are still no books, then throw an error
        if (!books || books.length === 0) {
          return next(ApiError.notFound('Books were not found'))
        }
      }

      res.json({
        count: total[0].count,
        rows: books,
      })
    }
    catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async getOne(req, res, next) {
    const id = req.params.id
    if (!id) {
      return next(ApiError.badRequest('Parameter is not set!'))
    }
    const validId = Number(id)
    if (isNaN(validId) || validId < 1) {
      return next(ApiError.badRequest('Invalid id'))
    }

    try {
      const book = await Book.findByPk(req.params.id)
      if (!book) {
        return next(ApiError.notFound(`Author was not found with id - ${id}`))
      }
      res.json(book)
    }
    catch (e) {
      return next(ApiError.internal(e.message))
    }

  }

  async createOne(req, res, next) {
    if (!req.body) {
      return next(ApiError.badRequest('No data provided'))
    }

    try {
      const newBook = await Book.create(req.body)
      res.json(newBook)
    }
    catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async deleteOne(req, res, next) {
    const id = req.params.id
    if (!id) {
      return next(ApiError.badRequest('Parameter is not set!'))
    }
    const validId = Number(id)
    if (isNaN(validId) || validId < 1) {
      return next(ApiError.badRequest('Invalid id'))
    }

    try {
      await Book.destroy({
        where: {
          book_id: req.params.id
        }
      })
      res.json({message: `Book - ${req.params.id} deleted successfully`})
    }
    catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async updateOne(req, res, next) {
    const id = req.params.id
    if (!id) {
      return next(ApiError.badRequest('Parameter is not set!'))
    }
    const validId = Number(id)
    if (isNaN(validId) || validId < 1) {
      return next(ApiError.badRequest('Invalid id'))
    }

    if (!req.body) {
      return next(ApiError.badRequest('No data provided'))
    }

    try {
      await Book.update(req.body, {
        where: {
          book_id: req.params.id
        }
      })
      res.json({message: "Book updated successfully"})
    }
    catch (e) {
      return next(ApiError.internal(e.message))
    }
  }
}

module.exports = new BookController()