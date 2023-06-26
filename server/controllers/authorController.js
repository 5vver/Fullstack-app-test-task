const Author = require('../models/authorModel')
const ApiError = require('../error/ApiError')
const sequelize = require('../db')
const { QueryTypes } = require('sequelize')

class AuthorController {

  async getAll(req, res, next) {
    let {limit, page} = req.query
    page = page || 1
    limit = limit || 10
    let offset = page * limit - limit

    try {
      const authors = await sequelize.query(`
        SELECT * FROM "Authors" LIMIT :limit OFFSET :offset
      `, {
          replacements: { limit, offset },
          type: QueryTypes.SELECT
        })

      if (!authors || authors.length === 0) {
        return next(ApiError.notFound('Authors were not found'))
      }

      const total = await sequelize.query('SELECT COUNT(*) FROM "Authors"',{
        type: QueryTypes.SELECT
      })

      res.json({
        count: total[0].count,
        rows: authors,
      })
    }
    catch (err) {
      return next(ApiError.internal(err.message))
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
      const author = await Author.findByPk(req.params.id)
      if (!author) {
        return next(ApiError.notFound(`Author was not found with id - ${id}`))
      }
      res.json(author)
    }
    catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async createOne(req, res, next) {
    try {
      const newAuthor = await Author.create(req.body)
      res.json(newAuthor)
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
      await Author.destroy({
        where: {
          author_id: req.params.id
        }
      })
      res.json({message: "Author deleted successfully"})
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

    try {
      await Author.update(req.body, {
        where: {
          author_id: req.params.id
        }
      })
      res.json({message: "Author updated successfully"})
    }
    catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async checkAuthor(req, res, next) {
    const id = req.params.id
    if (!id) {
      return next(ApiError.badRequest('Parameter is not set!'))
    }
    const validId = Number(id)
    if (isNaN(validId) || validId < 1) {
      return next(ApiError.badRequest('Invalid id'))
    }

    try {
      const exists = await sequelize.query('SELECT exists(SELECT 1 FROM "Authors" WHERE author_id=:id)', {
        replacements: {id},
        type: QueryTypes.SELECT
      })
      res.json(exists)
    }
    catch (e) {
      return next(ApiError.internal(e.message))
    }
  }
}

module.exports = new AuthorController()