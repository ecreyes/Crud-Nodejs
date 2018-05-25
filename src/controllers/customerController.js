const controller = {};

controller.list = (req,res)=>{
	// pide una conexion a mysql
	req.getConnection((err,conn)=>{
		//si la conexion fue correcta hago la consulta, se omite caso de error en este caso
		conn.query('SELECT * FROM customer',(err,rows)=>{
			if(err){
				next(err);
			}else{
				// me va a enviar a la vista customers.ejs
				res.render('customers',{
					data: rows
				});
			}
		});
	}); 
};

controller.save = (req,res)=>{
	req.getConnection((err,conn)=>{
		conn.query('INSERT INTO customer set ?',[req.body],(err,rows)=>{
			res.redirect('/')
		});
	});
};

controller.edit = (req,res)=>{
	req.getConnection((err,conn)=>{
		conn.query('SELECT * FROM customer WHERE id=?',[req.params.id],(err,rows)=>{
			res.render('customers_edit',{
				data: rows[0]
			});
		});
	});
};

controller.update = (req,res)=>{
	req.getConnection((err,conn)=>{
		conn.query('UPDATE customer set ? WHERE id=?',[req.body,req.params.id],(err,rows)=>{
			res.redirect('/')
		})
	})
};

controller.delete = (req,res)=>{
	req.getConnection((err,conn)=>{
		conn.query('DELETE FROM customer WHERE id=?',[req.params.id],(err,rows)=>{
			res.redirect('/')
		});
	})
};

module.exports = controller;