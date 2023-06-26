const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Author = sequelize.define('Author', {
  author_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false, // prevent Sequelize from adding 'createdAt' fields
})

module.exports = Author