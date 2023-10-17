const express = require('express');
// const expressHandleBars = require('expressHandleBars');
const { create, engine } = require('express-handlebars')
const bodyParser = require('body-parser');
const handlers = require('./views/lib/handlers');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const credentials = require('./credentials.development.json');
const morgan = require('morgan');
const fs = require('fs');
const addRoutes = require('./routes');
const app = express()

const port = process.env.port || 3000;
process.env.NODE_ENV = 'production'

app.get('env');
console.log(app.get('env')) 
switch(app.get('env')) {
    
    case 'development': 
    app.use(require('morgan')('dev'))
    break
    case 'production':
        const stream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
        app.use(morgan('combined', { stream }))
        break 
}

const hbr = create({
    defaultLayout: 'main',
})



app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}))

app.use(cookieParser(credentials.cookieSecret));

app.use(bodyParser.urlencoded({ extended: true }))

app.engine('handlebars', hbr.engine)

app.set('view engine', 'handlebars')

app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))

addRoutes(app)

app.post('/api/newsletter-singup', handlers.api.newsLetterSingUp)


app.use((req, res) => {
    res.status(404);
    res.render('404')
});

app.use((err,req,res, next) => {
    console.log(err.message);
    res.status(500);
    res.render('500');
});

function startServer(port) {
    app.listen(port, console.log(`server started + localhost:${port}`))    
}

if (require.main === module) {
    startServer(port)
} else {
    module.exports = startServer;
}
