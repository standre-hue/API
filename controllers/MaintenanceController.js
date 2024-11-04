const Maintenance = require('../models/Maintenance');
const RideController = require('./RideController');
const EmployeeController = require('./EmployeeController');

class MaintenanceController {
    static maintenances = [];
    constructor() {
        this.create = this.create.bind(this);
        this.list = this.list.bind(this);
        this.delete = this.delete.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
    }

    create(req, res) {
        const { rideId, employeeId, date, description, status } = req.body;



        let error = "";

        if (rideId == undefined) {
            error = error + "rideId is required, ";
        }
        if (isNaN(rideId)) {
            error = error + "rideId must be a number, ";
        }
        // check if RIDE EXISTS
        const ride = RideController.rides.find(ride => ride.id == rideId);
        if (!ride) {
            error = error + "Ride does not exist, ";
        }

        if (date == undefined) {
            error = error + "date is required, ";
        }
        if (isNaN(Date.parse(date))) {
            error = error + "date is invalid, ";
        }
        if (employeeId == undefined) {
            error = error + "employeeId is required, ";
        }
        if (isNaN(employeeId)) {
            error = error + "employeeId must be a number, ";
        }
        // check if EMPLOYEE EXISTS
        const employee = EmployeeController.employees.find(employee => employee.id == employeeId);
        if (!employee) {
            error = error + "Employee does not exist, ";
        }
        if (description == undefined) {
            error = error + "description is required, ";
        }
        if (status == undefined) {
            error = error + "status is required, ";
        }
        if (status != 'scheduled' && status != 'in-progress' && status != 'completed') {
            error = error + "status can only be scheduled, in-progress, completed , ";
        }

        if (error != "") {
            res.status(400).send({
                'error': error
            })
            return;
        }




        const maintenance = new Maintenance(rideId, employeeId, date, description, status);

        MaintenanceController.maintenances.push(maintenance);

        res.status(201).json(maintenance);
    }
    

    get(req, res) {
        const { id } = req.params;
        const maintenance = MaintenanceController.maintenances.find(m => m.id === parseInt(id));
        if (maintenance) {
            res.status(200).json(maintenance);
        } else {
            res.status(404).json({ message: 'Maintenance not found' });
        }
    }

    list(req, res) {
        res.status(200).json(MaintenanceController.maintenances);
    }


    update(req, res) {
        const { id } = req.params;
        const { rideId, employeeId, date, description, status } = req.body;

        if (id === undefined) {
            res.status(400).send({
                'error': 'ID is required'
            });
            return;
        }

        const maintenance = MaintenanceController.maintenances.find(maintenance => maintenance.id === parseInt(id));

        if (maintenance) {

            if (rideId !== undefined) {
                if (isNaN(rideId)) {
                    res.status(400).send({
                        'error': 'rideId must be a number'
                    });
                    return;
                }

                // check if RIDE EXISTS
                const ride = RideController.rides.find(ride => ride.id == parseInt(rideId));
                if (!ride) {
                    res.status(404).send({
                        'error': 'Ride does not exist'
                    });
                    return;
                }

                maintenance.rideId = rideId;
            }

            if (employeeId !== undefined) {
                if (isNaN(employeeId)) {
                    res.status(400).send({
                        'error': 'employeeId must be a number'
                    });
                    return;
                }

                // check if EMPLOYEE EXISTS
                const employee = EmployeeController.employees.find(employee => employee.id == parseInt(employeeId));
                if (!employee) {
                    res.status(404).send({
                        'error': 'Employee does not exist'
                    });
                    return;
                }
                maintenance.employeeId = employeeId;
            }


            if (date !== undefined) {

                if (isNaN(Date.parse(date))) {
                    res.status(400).send({
                        'error': 'date format is invalid'
                    });
                    return;
                }
                maintenance.date = date;
            }

            if (description !== undefined) {
                maintenance.description = description;
            }

            if (status !== undefined && (status == 'scheduled' || status == 'in-progress' || status == 'completed'))
                maintenance.status = status;

            res.status(200).json(maintenance);
        } else {
            res.status(404).json({ message: 'Maintenance not found' });
        }
    }

    delete(req, res) {
        const { id } = req.params;
        
        const index = MaintenanceController.maintenances.findIndex(m => m.id === parseInt(id));

        if (index !== -1) {
            MaintenanceController.maintenances.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Maintenance not found' });
        }
    }
}

module.exports = MaintenanceController;
