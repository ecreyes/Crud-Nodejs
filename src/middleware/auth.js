module.exports = {
	isLogged : function(req,res,next){
		if(req.isAuthenticated()){
			//sigue la peticion
			next();
		}else{
			res.redirect('/user/signin/');
		}
	}
}