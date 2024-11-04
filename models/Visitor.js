class Visitor{
    static idCounter = 0;
    // tickets = [];
    constructor(name, age, height){
        Visitor.idCounter++;
        this.id = Visitor.idCounter;
        this.name = name;
        this.age = age;
        this.height = height;

    }
}

module.exports = Visitor;