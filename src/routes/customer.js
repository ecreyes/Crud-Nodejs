const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController'); // se importa el controlador

router.get('/',customerController.list); //index
router.post('/add',customerController.save); //create
router.get('/delete/:id',customerController.delete); //delete
router.get('/update/:id',customerController.edit); //show - Read
router.post('/update/:id',customerController.update); //update
module.exports = router;