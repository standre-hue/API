const Ticket = require("../models/Ticket");
const RideController = require("./RideController");
const VisitorController = require("./VisitorController");

class TicketController {
    static tickets = [];
    constructor() {
        this.create = this.create.bind(this);
        this.list = this.list.bind(this);
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    get(req, res) {
        const { id } = req.params;

        if (id === undefined) {
            res.status(400).send({
                'error': 'ID is required'
            });
            return;
        }

        const ticket = TicketController.tickets.find(ticket => ticket.id === parseInt(id));

        if (!ticket) {
            res.status(404).send({
                'error': 'Ticket not found'
            });
            return;
        }

        res.status(200).send(ticket);
    }

    list(req, res) {
        res.status(200).send(
            {
                'total':TicketController.tickets.length,
                'data':TicketController.tickets
            }
        );
    }


    delete(req, res) {
        const { id } = req.params;

        if (id === undefined) {
            res.status(400).send({
                'error': 'ID is required'
            });
            return;
        }

        const index = TicketController.tickets.findIndex(ticket => ticket.id === parseInt(id));

        if (index === -1) {
            res.status(404).send({
                'error': 'Ticket not found'
            });
            return;
        }

       TicketController.tickets.splice(index, 1);

        res.status(204).send();
    }

    create(req, res) {
        const { visitorId, type, price, purchaseDate, validUntil } = req.body;

        let error = "";

        if (visitorId === undefined) {
            error = error + "Visitor ID is required, ";
        }
        if (isNaN(visitorId)) {
            error = error + "VisitoId must be a number, ";
        }

        // check if VISITOR EXISTS
        const visitor = VisitorController.visitors.find(visitor => visitor.id == visitorId);
        if(!visitor){
            error = error + "Visitor does not exist, ";
        }

        if (type === undefined) {
            error = error + "Type is required, ";
        }
        if(type != 'season' && type != 'day' && type != 'vip'){
            error = error + "Type must only be season, day, vip,  ";
        }

        if (price === undefined) {
            error = error + "Price is required, ";
        }
        if (isNaN(price)) {
            error = error + "Price must be a number, ";
        }
        if (purchaseDate === undefined) {
            error = error + "Purchase Date is required, ";
        }
        if (isNaN(Date.parse(purchaseDate))) {
            error = error + "Purchase Date is invalid, ";
        }
        if (validUntil === undefined) {
            error = error + "Valid Until is required, ";
        }
        if (isNaN(Date.parse(validUntil))) {
            error = error + "Valid Until date is invalid, ";
        }

        if (error != "") {
            res.status(400).send({
                'error': error
            });
            return;
        }

        const ticket = new Ticket(type, price, purchaseDate, validUntil, visitorId);

        TicketController.tickets.push(ticket);

        res.status(201).send(ticket);
    }

    update(req, res) {
        const { id } = req.params;
        const { visitorId, type, price, purchaseDate, validUntil } = req.body;

        if (id === undefined) {
            res.status(400).send({
                'error': 'ID is required'
            });
            return;
        }

        const ticket = TicketController.tickets.find(ticket => ticket.id === parseInt(id));

        if (!ticket) {
            res.status(404).send({
                'error': 'Ticket not found'
            });
            return;
        }

        if (visitorId !== undefined) {
            if(isNaN(visitorId)){
                res.status(400).send({
                    'error':'visitorId must be a number'
                })
                return;
            }
            // check if VISITOR EXISTS
            const visitor = VisitorController.visitors.find(visitor => visitor.id == visitorId);
            if(!visitor){
                res.status(404).send({
                    'error':'visitor does not exist'
                })
                return;
            }

            ticket.visitorId = visitorId;
        }

        if (type !== undefined) {
            ticket.type = type;
        }

        if (price !== undefined) {
            if (isNaN(price)) {
                res.status(400).send({
                    'error': 'Price must be a number'
                });
                return;
            }
            ticket.price = price;
        }

        if (purchaseDate !== undefined) {
            ticket.purchaseDate = purchaseDate;
        }
        if (isNaN(Date.parse(purchaseDate))) {
            res.status(400).send({
                'error': 'Purchase date must be a valid date'
            });
            return;
        }

        if (validUntil !== undefined) {
            ticket.validUntil = validUntil;
        }
        if (isNaN(Date.parse(validUntil))) {
            res.status(400).send({
                'error': 'ValidUntil date must be a valid date'
            });
            return;
        }

        res.status(200).send(ticket);
    }
}

module.exports = TicketController;
