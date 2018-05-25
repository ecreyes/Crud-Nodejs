const controller = {};

controller.index = (req,res)=>{
	res.render('index',{titulo:'Inicio'})
};

module.exports = controller;