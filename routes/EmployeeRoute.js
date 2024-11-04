const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

const employeeController = new EmployeeController();

router.post('/', employeeController.create);
router.get('/:id', employeeController.get);
router.get('/', employeeController.list);
router.delete('/:id', employeeController.delete);
router.put('/:id', employeeController.update);
router.patch('/:id', employeeController.update);


module.exports = router;
