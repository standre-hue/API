const express = require('express');
const router = express.Router();
const MaintenanceController = require('../controllers/MaintenanceController');

const maintenanceController = new MaintenanceController();

router.post('/', maintenanceController.create);
router.get('/:id', maintenanceController.get);
router.get('/', maintenanceController.list);
router.put('/:id', maintenanceController.update);
router.patch('/:id', maintenanceController.update);
router.delete('/:id', maintenanceController.delete);

module.exports = router;
