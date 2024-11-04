const Visitor = require("../models/Visitor");

class VisitorController{
    static visitors = [];
    constructor(){
        this.create = this.create.bind(this);
        this.list = this.list.bind(this);
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    get(req, res){
        const { id } = req.params;

        if (id === undefined) {
            res.status(400).send({
                'error': 'ID is required'
            });
            return;
        }

        const visitor = VisitorController.visitors.find(visitor => visitor.id === parseInt(id));

        if (!visitor) {
            res.status(404).send({
                'error': 'Visitor not found'
            });
            return;
        }

        res.status(200).send(visitor);
    }


    list(req, res){
        res.status(200).send(
            {
                'total':VisitorController.visitors.length,
                'data':VisitorController.visitors
            }
           
        )
    }


    delete(req, res){
        const { id } = req.params;

        if (id === undefined) {
            res.status(400).send({
                'error': 'ID is required'
            });
            return;
        }

        const index = VisitorController.visitors.findIndex(visitor => visitor.id === parseInt(id));

        if (index === -1) {
            res.status(404).send({
                'error': 'Visitor not found'
            });
            return;
        }

        VisitorController.visitors.splice(index, 1);
        
        res.status(204).send();
    }


    create(req, res){
        const { name, age, height } = req.body;

        let error = "";

        if(name === undefined){
            error = error + "Name is required, ";
        }
        if(age == undefined){
            error = error + "Age is required, ";
        }
        if(isNaN(age)){
            error = error + "Agemust be a number, ";
        }
        if(height === undefined){
            error = error + "Height is required, ";
        }
        if(isNaN(height)){
            error = error + "Height must be a number, ";
        }

        if(error != ""){
            res.status(400).send({
                'error':error
            })
            return;
        }

        const visitor = new Visitor(name, age, height);

        VisitorController.visitors.push(visitor);

        res.status(201).send(visitor);

    }


    
    update(req, res){
        const { id } = req.params;
        const { name, age, height } = req.body;

        if (id === undefined) {
            res.status(400).send({
                'error': 'ID is required'
            });
            return;
        }

        const visitor = VisitorController.visitors.find(visitor => visitor.id === parseInt(id));

        if (!visitor) {
            res.status(404).send({
                'error': 'Visitor not found'
            });
            return;
        }

        if (name !== undefined) {
            visitor.name = name;
        }

        if (age !== undefined) {
            if(isNaN(age)){
                res.status(400).send({
                    'error':'Age must be a number'
                })
                return;
            }
            visitor.age = age;
        }
        if (height !== undefined) {
            if(isNaN(height)){
                res.status(400).send({
                    'error':'height must be a number'
                })
                return;
            }
            visitor.height = height;
        }

        res.status(200).send(visitor);


    }
}

module.exports = VisitorController