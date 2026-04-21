'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Booking, { foreignKey: 'BookId' });
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        },
        notNull: {
          msg: 'Title is required'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Author is required'
        },
        notNull: {
          msg: 'Author is required'
        }
      }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'ISBN already exists'
      },
      validate: {
        notEmpty: {
          msg: 'ISBN is required'
        },
        notNull: {
          msg: 'ISBN is required'
        },
        isValidISBN(value) {
          // hanya angka dan strip
          if (!/^[0-9-]+$/.test(value)) {
            throw new Error('ISBN can only contain numbers and "-"');
          }

          // wajib ada strip
          if (!value.includes('-')) {
            throw new Error('ISBN must include "-"');
          }

          // panjang dihitung dari digit saja
          const digitsOnly = value.replace(/-/g, '');
          if (![10, 13].includes(digitsOnly.length)) {
            throw new Error('ISBN must contain 10 or 13 digits');
          }
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Category is required'
        },
        notNull: {
          msg: 'Category is required'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: {
          msg: 'Stock is required'
        },
        notNull: {
          msg: 'Stock is required'
        },
        min: {
          args: [0],
          msg: 'Stock cannot be negative'
        }
      }
    },
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};