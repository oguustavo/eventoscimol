const {Sequelize} = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:'mysql',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
        }
    }
})

module.exports = sequelize