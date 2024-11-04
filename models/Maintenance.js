class Maintenance{
    static idCounter = 0;
    constructor(rideId, employeeId, date, description, status){
        Maintenance.idCounter++
        this.id = Maintenance.idCounter;
        this.rideId = rideId;
        this.employeeId = employeeId;
        this.date = date;
        this.description = description;
        this.status = status;
    }
}

module.exports = Maintenance;