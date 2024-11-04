const Ride = require("../models/Ride");

class RideController {

    static rides = [];

    constructor() {
        this.create = this.create.bind(this);
        this.list = this.list.bind(this);
        this.delete = this.delete.bind(this);
        this.get = this.get.bind(this);
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

        const ride = RideController.rides.find(ride => ride.id === parseInt(id));

        if (!ride) {
            res.status(404).send({
                'error': 'Ride not found'
            });
            return;
        }

        res.status(200).send(ride);
    }


    delete(req, res) {
        const { id } = req.params;

        if (id === undefined) {
            res.status(400).send({
                'error': 'ID is required'
            });
            return;
        }

        const index = RideController.rides.findIndex(ride => ride.id === parseInt(id));


        if (index !== -1) {
            RideController.rides.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Ride not found' });
        }

    }

    list(req, res) {
        res.status(200).send(
            {
                'total': RideController.rides.length,
                'data': RideController.rides
            });
    }


    create(req, res) {
        const { name, capacity, minHeight, duration, status } = req.body;

        let error = "";

        if (name === undefined) {
            error = error + "Name is required, ";
        }
        if (capacity === undefined) {
            error = error + "Capacity is required, ";
        }
        if (isNaN(capacity)) {
            error = error + "Capacity must be a number, ";
        }
        if (minHeight === undefined) {
            error = error + "minHeight is required, ";
        }
        if (isNaN(minHeight)) {
            error = error + "Minheight must be a number, ";
        }

        if (duration === undefined) {
            error = error + "Duration is required, ";
        }
        if (isNaN(duration)) {
            error = error + "Duration must be a number, ";
        }
        if (status === undefined) {
            error = error + "Status is required, ";
        }
        if (status != 'operational' && status != 'maintenance' && status != 'closed') {
            error = error + "Status can only be:operational, maintenance or closed,  ";
        }

        if (error != "") {
            res.status(400).send({
                'error': error
            })
            return;
        }

        const ride = new Ride(name, capacity, minHeight, duration, status);

        RideController.rides.push(ride);

        res.status(201).send(ride);
    }

    update(req, res) {
        const { id } = req.params;
        const { name, capacity, minHeight, duration, status } = req.body;

        if (id === undefined) {
            res.status(400).send({
                'error': 'ID is required'
            });
            return;
        }

        const ride = RideController.rides.find(ride => ride.id === parseInt(id));

        if (!ride) {
            res.status(404).send({
                'error': 'Ride not found'
            });
            return;
        }

        if (name !== undefined) {
            ride.name = name;
        }

        if (capacity !== undefined) {
            if (isNaN(capacity)) {
                res.status(400).send({
                    'error': 'capacity must be a number'
                })
                return;
            }
            ride.capacity = capacity;
        }

        if (minHeight !== undefined) {
            if (isNaN(minHeight)) {
                res.status(400).send({
                    'error': 'minHeight must be a number'
                })
                return;
            }
            ride.minHeight = minHeight;
        }

        if (duration !== undefined) {
            if (isNaN(duration)) {
                res.status(400).send({
                    'error': 'duration must be a number'
                })
                return;
            }
            ride.duration = duration;
        }

        if (status !== undefined) {
            ride.status = status;
        }
        if (status != 'operational' && status != 'maintenance' && status != 'closed') {
            error = "Status can only be:operational, maintenance or closed,  ";
            res.status(400).send({
                'error': error
            })
            return;
        }


        res.status(200).send(ride);


    }
}

module.exports = RideController