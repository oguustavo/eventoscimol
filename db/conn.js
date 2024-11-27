const {Sequelize} = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: console.log
    }
)

// Teste de conexão mais detalhado
sequelize.authenticate()
    .then(() => {
        console.log('Conexão estabelecida com sucesso.');
        return sequelize.query('SHOW TABLES');
    })
    .then(([results]) => {
        console.log('Tabelas no banco:', results);
    })
    .catch(err => {
        console.error('Erro detalhado ao conectar:', err);
    });

module.exports = sequelize