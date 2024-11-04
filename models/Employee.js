class Employee{
    static idCounter = 0;
    constructor(name, position, department){
        Employee.idCounter++;
        this.id = Employee.idCounter;
        this.name = name;
        this.position = position;
        this.department = department;

    }
}


module.exports = Employee;