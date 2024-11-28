const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const connection = require('./db/connection')
const path = require('path')
const os = require('os')

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

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

//public path
app.use(express.static('public'))

//set session to response
app.use((req, res, next) => {
    
    if(req.session.userid)
    {
        req.locals.session = req.session
    }

    next()
})

connection
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log('Error on start project ', err)
    })