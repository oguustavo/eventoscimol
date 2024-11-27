const { DataTypes } = require('sequelize')
const bcryptjs = require('bcryptjs')
const db = require('../db/conn')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcryptjs.genSalt(10)
                user.password = await bcryptjs.hash(user.password, salt)
            }
        }
    }
})

module.exports = User