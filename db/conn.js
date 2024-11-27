const {Sequelize} = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectOptions: {
            ssl: false
        }
    }
)

// Teste de conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conexão estabelecida com sucesso.');
        // Lista todas as tabelas
        return sequelize.query('SHOW TABLES');
    })
    .then(([results]) => {
        console.log('Tabelas no banco:', results);
    })
    .catch(err => {
        console.error('Erro ao conectar com o banco:', err);
    });

module.exports = sequelize