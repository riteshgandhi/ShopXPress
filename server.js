/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Express server for ShopXpress
 * @version:        1 
 */

const express       = require('express');                   // express web framework
const app           = express();                            // instantiate express application
const handlebars    = require('express-handlebars');        // express-handlebars
const session       = require('express-session');           // express-session
const flash         = require('connect-flash');
const bodyParser    = require("body-parser");               // body-parser
const routes        = require('./routes');                  // Routing module
const compression   = require('compression');

/**
 * Configures the middleware pipeline
 */
const configure = () => {
    app.set('view engine', 'handlebars');                       // set view engine

    app.engine('handlebars', handlebars({                       // set handlebar helper
        defaultLayout: 'master',
        helpers: require('./helpers') 
    }));
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(session({secret: "ShopXpress_secret", resave:false, saveUninitialized:true}));
    app.use('/public', express.static(__dirname + "/public"));
    app.use(flash());
    app.use(compression()); //Compress all routes
    
    // set request object in res.locals
    app.use((req, res,next) => {
        res.locals.req = req;
        next();
    })
    
    app.use('/', routes);                                       // configure routes                                           
    
    /**
     * Return 404 View
     */
    app.use((req, res) => {
        res.status(404);
        res.render('others/404');
    });    
};

/**
 * Entry point for the application
 */
const startServer = () => {
    configure();

    app.listen(3000, () => {
        console.log('http://localhost:3000');
    });
};

startServer();