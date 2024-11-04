const express = require('express');
const VisitorController = require('../controllers/VisitorController');


const VisitorRoute = express.Router();

const visitorController = new VisitorController();


VisitorRoute.post('', visitorController.create)
VisitorRoute.get('/:id', visitorController.get);
VisitorRoute.get('/', visitorController.list);
VisitorRoute.delete('/:id', visitorController.delete);
VisitorRoute.put('/:id', visitorController.update);
VisitorRoute.patch('/:id', visitorController.update);




module.exports = VisitorRoute;