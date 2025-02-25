const express = require('express')
const { engine } = require('express-handlebars')
const handlebars = require('handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const methodOverride = require('method-override')
const connection = require('./db/connection')
const path = require('path')
const os = require('os')

const app = express()

app.use(methodOverride('_method'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

handlebars.registerHelper('json', function(contex){
    return JSON.stringify(contex)
})
 
handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

//session middleware config
const SESSION_CONFIG = {
    name: 'session',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function () { },
        path: path.join(os.tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
}

app.use(session(SESSION_CONFIG))

//flash messages
app.use(flash())

//set session to response
app.use((req, res, next) => {
    // console.log('sesion', req.session)
    if(req.session.userid)
    {
        res.locals.session = req.session
    }

    next()
})

//ROUTES
const UserController = require('./controllers/UserController')

const userRoutes = require('./routers/userRoutes')
const productsRouters = require('./routers/productsRoutes')

app.get('/', UserController.login)
app.use('/auth', userRoutes)
app.use('/products', productsRouters)

connection
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log('Error on start project ', err)
    })