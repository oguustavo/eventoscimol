const sequelize = require('../db/conn');
const User = require('../models/User');
const Evento = require('../models/Evento');
const Participacao = require('../models/Participacao');

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Banco de dados sincronizado com sucesso!');
        process.exit(0);
    } catch (error) {
        console.error('Erro ao sincronizar banco:', error);
        process.exit(1);
    }
}

syncDatabase(); 