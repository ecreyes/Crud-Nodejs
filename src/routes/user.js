const express = require('express');
const router = express.Router();
const passport = require('passport');


const userController = require('../controllers/userController'); // se importa el controlador
const AuthMiddleware = require('../middleware/auth'); //midleware de autentificacion


router.get('/signup/',userController.signup);
router.get('/panel/',AuthMiddleware.isLogged,userController.panel);
router.post('/',userController.save);
router.get('/signin/',userController.signin);
router.post('/signin/',passport.authenticate('local',{
	successRedirect: '/user/panel/',
	failureRedirect: '/user/signin/',
	failureFlash: true
}));
router.get('/logout/',userController.logout);
module.exports = router;