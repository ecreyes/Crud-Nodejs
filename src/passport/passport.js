const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
	passport.serializeUser(function(user,done){
		done(null,user);
	});

	passport.deserializeUser(function(obj,done){
		done(null,obj);
	});

	passport.use(new LocalStrategy({
		passReqToCallback : true
	},function(req,correo,password,done){
		req.getConnection((err,conn)=>{
			conn.query('SELECT * from user WHERE correo=?',[correo],(err,rows)=>{
				if(err){
					throw err;
				}
				if(rows.length>0){
					var user = rows[0];
					if(bcrypt.compareSync(password,user.password)){
						var user = {
							id:user.id,
							nombre:user.nombre,
							correo:user.correo
						};
						return done(null,user);
					}else{
						return done(null,false,req.flash('authmensaje','Correo o Contraseña Incorrecta.'));
					}
				}else{
					return done(null,false,req.flash('authmensaje','Correo o Contraseña Incorrecta.'));
				}
			});
		});
	}));
};