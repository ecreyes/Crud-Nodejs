const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController'); // se importa el controlador

router.get('/',homeController.index); //index
module.exports = router;