const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const RideRoute = require('./routes/RideRoute')
const EmployeeRoute = require('./routes/EmployeeRoute')
const VisitorRoute = require('./routes/VisitorRoute')
const TicketRoute = require('./routes/TicketRoute')
const MaintenanceRoute = require('./routes/MaintenanceRoute')

app.use(bodyParser.json());


app.use('/api/rides', RideRoute);
app.use('/api/employees', EmployeeRoute);
app.use('/api/visitors', VisitorRoute);
app.use('/api/tickets', TicketRoute);
app.use('/api/maintenances', MaintenanceRoute);

app.listen(3000,() => {
    console.log("server listen on port 3000")
})




const RideController = require('./controllers/RideController')