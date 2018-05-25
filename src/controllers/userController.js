const bcrypt = require('bcryptjs');
const controller = {};

controller.signup = (req,res)=>{
	res.render('auth/signup',{titulo:'Registro'})
};

controller.signin = (req,res)=>{
	res.render('auth/signin',{
		titulo:'Sesion',
		mensaje:req.flash('info'),
		authmensaje:req.flash('authmensaje')
	})
};
controller.panel = (req,res)=>{
	res.render('auth/panel',{
		titulo:'Panel',
		isAuthenticated: req.isAuthenticated(),
		user:req.user
	})
};

controller.logout = (req,res)=>{
	req.logout();
	res.redirect('/user/signin');
};

controller.save = (req,res)=>{
	var salt = bcrypt.genSaltSync(10); //nivel de encriptacion
	var pass = bcrypt.hashSync(req.body.password,salt);
	var user = {
		correo: req.body.correo,
		nombre: req.body.nombre,
		password: pass
	};
	req.getConnection((err,conn)=>{
		conn.query('INSERT INTO user set ?',[user],(err,rows)=>{
			req.flash('info','Se ha registrado correctamente,ya puede inciar sesion.')
			res.redirect('/user/signin')
		});
	});
};

module.exports = controller;