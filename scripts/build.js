const sequelize = require('../db/conn');
const User = require('../models/User');
const Evento = require('../models/Evento');
const Participacao = require('../models/Participacao');

async function build() {
    try {
        // Testa a conexão
        await sequelize.authenticate();
        console.log('Conexão com o banco estabelecida com sucesso.');

        // Sincroniza os modelos com o banco
        await sequelize.sync();
        console.log('Modelos sincronizados com o banco de dados.');

        process.exit(0);
    } catch (error) {
        console.error('Erro durante o build:', error);
        process.exit(1);
    }
}

build(); 