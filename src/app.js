const express = require('express');
const path = require('path'); //se encarga de unir directorios.
const morgan = require('morgan'); // se encarga de mostrar los estados como 404.
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const flash = require('connect-flash'); //muestra mensajes flash
const session = require('express-session'); //permite manejar sesiones
const passport = require('passport');
require('./passport/passport')(passport);
const app = express();

// importando rutas
const customerRoutes = require('./routes/customer');
const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/user');

// settings
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false})); //reemplaza a body-parser,false porq no envia imagenes solo campos de form.
app.use(flash()); //enviar mensajes flash
	//manejar las sesiones y passport
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
	//config de la bd
app.use(myConnection(mysql,{
	host: 'localhost',
	user: 'root',
	password: '12345',
	port: 3306,
	database: 'crudnodejs'
},'single'));

// routes
app.use('/cliente/',customerRoutes);
app.use('/',homeRoutes);
app.use('/user/',userRoutes);

// archivos estaticos
app.use(express.static(path.join(__dirname,'public')));


// Empezando el servidor
app.listen(app.get('port'), ()=>{
	console.log("Server en puerto 3000")
});