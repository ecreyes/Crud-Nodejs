const express = require('express');
const path = require('path'); //se encarga de unir directorios.
const morgan = require('morgan'); // se encarga de mostrar los estados como 404.
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

// importando rutas
const customerRoutes = require('./routes/customer');

// settings
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false})); //reemplaza a body-parser,false porq no envia imagenes solo campos de form.
app.use(myConnection(mysql,{
	host: 'localhost',
	user: 'root',
	password: '12345',
	port: 3306,
	database: 'crudnodejs'
},'single'));

// routes
app.use('/',customerRoutes);

// archivos estaticos
app.use(express.static(path.join(__dirname,'public')));


// Empezando el servidor
app.listen(app.get('port'), ()=>{
	console.log("Server en puerto 3000")
});