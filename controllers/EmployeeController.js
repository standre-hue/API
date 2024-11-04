const Employee = require("../models/Employee");

class EmployeeController {

    static employees = [];

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

        const employee = EmployeeController.employees.find(employee => employee.id === parseInt(id));

        if (!employee) {
            res.status(404).send({
                'error': 'Employee not found'
            });
            return;
        }

        res.status(200).send(employee);
    }

    list(req, res) {
        res.status(200).send(
            {
                'total':EmployeeController.employees.length,
                'data':EmployeeController.employees
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

        const index = EmployeeController.employees.findIndex(employee => employee.id === parseInt(id));

        if (index !== -1) {
            EmployeeController.employees.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Maintenance not found' });
        }



    }

    update(req, res) {
        const { id } = req.params;
        const { name, position, department, salary } = req.body;

        if (id === undefined) {
            res.status(400).send({
                'error': 'ID is required'
            });
            return;
        }

        const employee = EmployeeController.employees.find(employee => employee.id === parseInt(id));

        if (!employee) {
            res.status(404).send({
                'error': 'Employee not found'
            });
            return;
        }

        if (name !== undefined) {
            employee.name = name;
        }
        if (position !== undefined) {
            employee.position = position;
        }
        if (department !== undefined) {
            employee.department = department;
        }
        if (salary !== undefined) {
            if (!isNaN(salary)) {
                employee.salary = salary;
            }
            else{
                res.status(400).send({
                    'error':'salary must be a number'
                })
                return;
            }
        }

        res.status(200).send(employee);
    }

    create(req, res) {
        const { name, position, department, salary } = req.body;

        let error = "";

        if (name === undefined) {
            error = error + "Name is required, ";
        }
        if (position === undefined) {
            error = error + "Position is required, ";
        }
        if (department === undefined) {
            error = error + "Department is required, ";
        }
        if (salary === undefined) {
            error = error + "Salary is required, ";
        }
        if (isNaN(salary)) {
            error = error + "Salary must be a number, ";
        }

        if (error != "") {
            res.status(400).send({
                'error': error
            });
            return;
        }

        const employee = new Employee(name, position, department, salary);

        EmployeeController.employees.push(employee);

        res.status(201).send(employee);
    }
}

module.exports = EmployeeController;
