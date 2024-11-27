const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('express-flash')
const helpers = require('./helpers/handlebars')

const app = express()

const conn = require('./db/conn')



const Evento = require('./models/Evento')
const User = require('./models/User')
const EventosControllers = require('./controllers/EventosControllers')
const Participacao = require('./models/Participacao')
const Sugestao = require('./models/Sugestao')


const eventosRoutes = require('./routes/eventosRoutes')
const authRoutes = require('./routes/authRoutes')


const hbs = exphbs.create({
    helpers: {
        ...helpers,
        temPermissaoBusca: function(userid) {
             // Se for admin, retorna falso (sem permissão)
             if (userid === 'admin') return false;

             // Outros usuários têm permissão
             return !!userid; // Verifica se o userid existe
         
        },
        add: function(value, addition) {
            return value + addition;
        },
        multiply: function(a, b) {
            return a * b;
        },
        divide: function(a, b) {
            return a / b;
        },
        porcentagemOcupacao: function(evento) {
            return (evento.participantesAtuais / evento.participantes) * 100;
        }
    },
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});


app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())

app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 360000,
            httpOnly: true
        }
    })
)

app.use(flash())
app.use(express.static('public'))

app.use((req,res,next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})

app.get('/eventos-participando', (req, res) => {
    res.render('eventos-participando', { title: 'Eventos Participando' });
});

app.use('/eventos',eventosRoutes)
app.use('/',authRoutes)
app.get('/',EventosControllers.showEventos)

app.get('/profile', checkAuth, EventosControllers.showProfile);

User.hasMany(Participacao);
Participacao.belongsTo(User);

Evento.hasMany(Participacao);
Participacao.belongsTo(Evento);

User.hasMany(Sugestao);
Sugestao.belongsTo(User);

function checkAuth(req, res, next) {
    if (!req.session.userid) {
        req.flash('message', 'Por favor, faça login para acessar esta página');
        return res.redirect('/login');
    }
    next();
}

// Adicione um middleware de erro global
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Algo deu errado!')
})

const PORT = process.env.PORT || 3000;

// Modifique a inicialização
conn
    .sync()
    .then(() => {
        console.log('Banco de dados sincronizado')
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao sincronizar banco:', err)
    })
