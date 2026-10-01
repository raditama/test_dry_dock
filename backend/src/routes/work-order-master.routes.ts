import { Router } from 'express';
import { WorkOrderMasterRepository } from '../repositories/work-order-master.repository';
import { WorkOrderMasterService } from '../services/work-order-master.service';
import { WorkOrderMasterController } from '../controllers/work-order-master.controller';

const router = Router();
const workOrderMasterRepository = new WorkOrderMasterRepository();
const workOrderMasterService = new WorkOrderMasterService(workOrderMasterRepository);
const workOrderMasterController = new WorkOrderMasterController(workOrderMasterService);

router.get('/', workOrderMasterController.getAllWorkOrderMasters);
router.get('/:id', workOrderMasterController.getWorkOrderMasterById);
router.post('/', workOrderMasterController.createWorkOrderMaster);
router.put('/:id', workOrderMasterController.updateWorkOrderMaster);
router.delete('/:id', workOrderMasterController.deleteWorkOrderMaster);

export default router;
