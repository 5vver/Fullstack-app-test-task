const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Author = require('./authorModel')

const Book = sequelize.define('Book', {
  book_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publication_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pages: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: false, // prevent Sequelize from adding 'createdAt' fields
})

Book.belongsTo(Author, {
  foreignKey: 'author_id',
  as: 'author',
})

Author.hasMany(Book, {
  foreignKey: 'author_id',
  as: 'books',
})

module.exports = Book