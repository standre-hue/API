const express = require('express');
const TicketController = require('../controllers/TicketController');

const TicketRoute = express.Router();

const ticketController = new TicketController();

TicketRoute.post('', ticketController.create);
TicketRoute.get('/:id', ticketController.get);
TicketRoute.get('/', ticketController.list);
TicketRoute.delete('/:id', ticketController.delete);
TicketRoute.put('/:id', ticketController.update);
TicketRoute.patch('/:id', ticketController.update);

module.exports = TicketRoute;
