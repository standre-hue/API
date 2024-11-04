class Ride{

    static idCounter = 0;

    constructor(
        name,
        capacity,
        minHeight,
        duration,
        status
    ){
        Ride.idCounter += 1;
        this.id = Ride.idCounter;
        this.name = name;
        this.capacity = capacity;
        this.minHeight = minHeight;
        this.duration = duration;
        this.status = status;
        

    }
}

module.exports = Ride;