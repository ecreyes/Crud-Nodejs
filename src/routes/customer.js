const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController'); // se importa el controlador
const AuthMiddleware = require('../middleware/auth'); //midleware de autentificacion

router.get('/',AuthMiddleware.isLogged,customerController.list); //index
router.post('/add/',AuthMiddleware.isLogged,customerController.save); //create
router.get('/delete/:id/',AuthMiddleware.isLogged,customerController.delete); //delete
router.get('/update/:id/',AuthMiddleware.isLogged,customerController.edit); //show - Read
router.post('/update/:id/',AuthMiddleware.isLogged,customerController.update); //update
module.exports = router;