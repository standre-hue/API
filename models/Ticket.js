class Ticket{
    static idCounter = 0;
    constructor(type, price, purchaseDate, validUntil, visitorId){
        Ticket.idCounter++;
        this.id = Ticket.idCounter;
        this.visitorId = visitorId;
        this.type = type;
        this.price = price;
        this.purchaseDate = purchaseDate;
        this.validUntil = validUntil;
        this.visitorId = visitorId;
    }


}

module.exports = Ticket;