const {Sequelize} = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || 'railway',
    process.env.MYSQL_USER || 'root',
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    }
)

module.exports = sequelize