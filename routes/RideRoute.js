const express = require('express');
const RideController = require('../controllers/RideController');


const RideRoute = express.Router();

const rideController = new RideController();


RideRoute.post('', rideController.create)
RideRoute.get('/:id', rideController.get);
RideRoute.get('/', rideController.list);
RideRoute.delete('/:id', rideController.delete);
RideRoute.put('/:id', rideController.update);
RideRoute.patch('/:id', rideController.update);




module.exports = RideRoute;